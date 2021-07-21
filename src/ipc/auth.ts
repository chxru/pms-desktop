import { MEMCacheEncryptData } from '../database/memcache';
import { SavePBKDFSalt } from '../database/metadata';
import {
  DBCheckForAnyUsers,
  DBCheckUserPassword,
  DBCreateNewAccount,
} from '../database/user';

const CheckForAnyUsers = async (): Promise<{
  res?: boolean;
  error?: string;
}> => {
  try {
    const doesAnyUsersExist = await DBCheckForAnyUsers();
    return { res: doesAnyUsersExist };
  } catch (error) {
    return { error };
  }
};

const CheckUsernamePassword = async (
  username: string,
  password: string
): Promise<{ res: boolean; error?: string }> => {
  // validate inputs
  if (!username || !password) {
    return { res: false, error: 'Invalid inputs' };
  }

  const { res, error } = await DBCheckUserPassword(username, password);

  // if new user is successfully logged in
  if (res) {
    // generate encrypt key and save in memcache
    await MEMCacheEncryptData(password);
  }
  return { res, error };
};

const CreateNewUser = async (
  username: string,
  password: string
): Promise<{ res: boolean; error?: string }> => {
  try {
    // check inputs are valid
    if (!username || !password) {
      return { res: false, error: 'Invalid inputs' };
    }

    // create new account
    await DBCreateNewAccount(username, password);

    // if new user is successfully created
    // create and save salt in metadata database
    await SavePBKDFSalt();

    // generate encrypt key and save in memcache
    await MEMCacheEncryptData(password);

    return { res: true };
  } catch (error) {
    return { res: false, error };
  }
};

export { CheckForAnyUsers, CheckUsernamePassword, CreateNewUser };
