/* eslint-disable import/prefer-default-export */
import bcryptjs from 'bcryptjs';
import { USERS } from './database';
import { UserInterface } from './schemes/user_scheme';

const searchByUsername = async (
  username: string
): Promise<{
  user: PouchDB.Core.ExistingDocument<UserInterface> | null;
  error?: string;
}> => {
  try {
    // create index in database
    const resIndex = await USERS.createIndex({
      index: {
        fields: ['username'],
      },
    });

    // if index create is successfull
    if (resIndex.result === 'created' || resIndex.result === 'exists') {
      // search by username
      const res = await USERS.find({ selector: { username } });

      // if res contain a warning, return the warning
      if (res.warning) {
        return { user: null, error: res.warning };
      }

      if (res.docs.length > 1) {
        return {
          user: null,
          error: `WARNING: Multiple records with username:${username} found`,
        };
      }

      return { user: res.docs[0] };
    }

    return { user: null, error: 'ERROR: createIndex failed' };
  } catch (error) {
    return { user: null, error };
  }
};

export const DBCheckForAnyUsers = async (): Promise<{
  res: boolean;
  error?: string;
}> => {
  try {
    const info = await USERS.info();
    if (info.doc_count > 0) {
      return { res: true };
    }
    return { res: false, error: 'No user records' };
  } catch (error) {
    return { res: false, error };
  }
};

export const DBCheckUserPassword = async (
  username: string,
  password: string
): Promise<{ res: boolean; error?: string }> => {
  try {
    // get user details
    const { user, error } = await searchByUsername(username);

    if (error) {
      return { res: false, error };
    }

    // if an user exist
    if (user) {
      // compare hashes
      const hashMatch = await bcryptjs.compare(password, user.password);
      return { res: hashMatch };
    }

    return { res: false, error: `No user found as ${username}` };
  } catch (error) {
    return { res: false, error };
  }
};

export const DBCreateNewAccount = async (
  username: string,
  password: string
): Promise<{ res: boolean; error?: string }> => {
  try {
    // make sure username is unique
    const isUnique = await searchByUsername(username);
    if (isUnique.user) {
      return { res: false, error: 'Username is not unique' };
    }

    // bcrypt stuff
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(password, salt);
    const res = await USERS.post({ username: username.trim(), password: hash });

    if (res.ok) {
      return { res: true };
    }
    return { res: false, error: 'Error while saving user to database' };
  } catch (error) {
    return { res: false, error: 'Unknown error' };
  }
};
