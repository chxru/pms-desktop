import { MEMCACHE } from './database';
import GenerateEncryptionKey from './crypto/pbk';

// Generate encryption key using user's password + pbkdf2
// saved in cache to increase performance
const MEMCacheEncryptData = async (password: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // generate key
    const key = await GenerateEncryptionKey(password);

    // save key and salt in MEMCACHE
    // TODO: This is probably insecure. If someone read memory then the encryption is key
    // exposed. Maybe you want to re-encrypt it with current time and save in memory.
    MEMCACHE.insert({ key: 'encrypt_key', value: key });
  } catch (error) {
    throw error;
  }
};

const MEMCacheGetEncryptKey: () => Promise<string> = () => {
  return new Promise((resolve, reject) => {
    MEMCACHE.findOne({ key: 'encrypt_key' }, (err, doc) => {
      if (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`!error ${err}`);
      }
      resolve(doc.value);
    });
  });
};

export { MEMCacheEncryptData, MEMCacheGetEncryptKey };
