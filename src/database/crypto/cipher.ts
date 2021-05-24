import { createCipheriv, createDecipheriv } from 'crypto';
import { MEMCacheGetEncryptKey } from '../memcache';
import { PatientInterface } from '../schemes/patient_scheme';

const algorithm = 'aes-256-cbc'; // consider using gcm when implementing servers

const CipherDecrypt = async (doc: string): Promise<PatientInterface> => {
  const key = await MEMCacheGetEncryptKey();

  const ciphertextBytes = Buffer.from(doc, 'base64');
  const iv = ciphertextBytes.slice(0, 16);
  const data = ciphertextBytes.slice(16);
  const decipher = createDecipheriv(algorithm, key, iv);
  const plaintextBytes = Buffer.concat([
    decipher.update(data),
    decipher.final(),
  ]);
  return JSON.parse(plaintextBytes.toString());
};

const CipherEncrypt = async (doc: string) => {
  const key = await MEMCacheGetEncryptKey();

  const iv = Buffer.alloc(16, 0);
  const cipher = createCipheriv(algorithm, key, iv);
  const ciphertext = Buffer.concat([iv, cipher.update(doc), cipher.final()]);
  return ciphertext.toString('base64');
};

export { CipherDecrypt, CipherEncrypt };
