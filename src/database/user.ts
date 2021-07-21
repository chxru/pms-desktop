import bcryptjs from 'bcryptjs';
import { USERS } from './database';
import { UserInterface } from './schemes/user_scheme';

/**
 * Search for a user in database with the username
 *
 * @param {string} username
 * @return {*}  {Promise<PouchDB.Core.ExistingDocument<UserInterface>>}
 */
const searchByUsername = async (
  username: string
): Promise<PouchDB.Core.ExistingDocument<UserInterface>> => {
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
      throw new Error(res.warning);
    }

    // throw if no user found
    if (res.docs.length === 0) {
      throw new Error(`No user found as ${username}`);
    }

    // throw if multiple users found
    if (res.docs.length > 1) {
      throw new Error(
        `WARNING: Multiple records with username:${username} found`
      );
    }

    // return the document
    return res.docs[0];
  }

  // when undex creating is unsuccessfull
  throw new Error(`ERROR: createIndex failed with status ${resIndex.result}`);
};

/**
 * Check USERS database have any records
 *
 * @return {boolean} true if database have records
 */
const DBCheckForAnyUsers = async (): Promise<boolean> => {
  const info = await USERS.info();
  if (info.doc_count > 0) {
    return true;
  }
  return false;
};

/**
 * Compare username and password with hash
 *
 * @param {string} username
 * @param {string} password
 * @return {*}  {Promise<{ res: boolean; error?: string }>}
 */
const DBCheckUserPassword = async (
  username: string,
  password: string
): Promise<{ res: boolean; error?: string }> => {
  try {
    // get user details
    const user = await searchByUsername(username);

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

/**
 * Create new user in database
 *
 * @param {string} username
 * @param {string} password
 * @return {*}  {Promise<void>}
 */
const DBCreateNewAccount = async (
  username: string,
  password: string
): Promise<void> => {
  try {
    // make sure username is unique, not useful in signle user instance
    const user = await searchByUsername(username);
    if (user) {
      throw new Error('Username is not unique');
    }

    // bcrypt stuff
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(password, salt);

    // save user data in database
    const res = await USERS.post({
      username: username.trim(),
      password: hash,
    });

    if (res.ok) {
      return;
    }

    throw new Error('Error while saving user to database');
  } catch (error) {
    throw new Error('Unknown error while creating new account');
  }
};

export { DBCheckForAnyUsers, DBCheckUserPassword, DBCreateNewAccount };
