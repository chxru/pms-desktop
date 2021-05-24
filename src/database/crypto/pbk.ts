/*
create a database encryption key based on user's password
*/

import { pbkdf2 } from 'crypto';
import { GetPBKDFSalt } from '../metadata';

const pbkdf2async = (password: string, salt: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    // sha 256 needs 32 length key, 16 using here because
    // length is doubled when output converted to hex.
    // TODO: check more about this
    pbkdf2(password, salt, 100000, 16, 'sha256', (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('hex'));
    });
  });
};

const GenerateEncryptionKey = async (password: string): Promise<string> => {
  try {
    const salt = await GetPBKDFSalt();
    if (salt.startsWith('!error')) throw Error(salt);

    const key = await pbkdf2async(password, salt);
    return key;
  } catch (error) {
    return `!error ${error}`;
  }
};

export default GenerateEncryptionKey;
