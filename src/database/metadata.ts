import bcryptjs from 'bcryptjs';
import { METADATA } from './database';

// save salt for pbkdf2
const SavePBKDFSalt = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    // salt used for database pbkdf
    const pbkdf2salt = await bcryptjs.genSalt();

    await METADATA.put({ _id: 'pbkdf2salt', value: pbkdf2salt });
  } catch (error) {
    throw error;
  }
};

const GetPBKDFSalt = async (): Promise<string> => {
  try {
    const salt = await METADATA.get('pbkdf2salt');
    return salt.value;
  } catch (error) {
    return `!error ${error}`;
  }
};

export { SavePBKDFSalt, GetPBKDFSalt };
