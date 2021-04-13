/* eslint-disable import/prefer-default-export */
import {
  DBCheckForAnyUsers,
  DBCheckUserPassword,
  DBCreateNewAccount,
} from '../database/user';

export const CheckForAnyUsers = async (): Promise<{
  res: boolean;
  error?: string;
}> => {
  const { res, error } = await DBCheckForAnyUsers();
  return { res, error };
};

export const CheckUsernamePassword = async (
  username: string,
  password: string
): Promise<{ res: boolean; error?: string }> => {
  // validate inputs
  if (!username || !password) {
    return { res: false, error: 'Invalid inputs' };
  }

  const { res, error } = await DBCheckUserPassword(username, password);
  return { res, error };
};

export const CreateNewUser = async (
  username: string,
  password: string
): Promise<{ res: boolean; error?: string }> => {
  try {
    // check inputs are valid
    if (!username || !password) {
      return { res: false, error: 'Invalid inputs' };
    }

    const { res, error } = await DBCreateNewAccount(username, password);
    return { res, error };
  } catch (error) {
    return { res: false, error };
  }
};
