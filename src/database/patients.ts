import { randomBytes } from 'crypto';
import { CipherDecrypt, CipherEncrypt } from './crypto/cipher';
import { PATIENTS } from './database';
import {
  PatientInterface,
  PatientInterfaceEncrypted,
} from './schemes/patient_scheme';

const GenerateNewID = async (): Promise<string> => {
  const id = randomBytes(4).toString('hex');
  try {
    await PATIENTS.get(id);

    /*
    if above code did not find a patient for given id, it throws
    an error

    which means unique id is returning inside catch {}
    recurssion happening inside try{}
    */

    return GenerateNewID();
  } catch (error) {
    if (error.status === 404 && error.reason === 'missing') {
      return id;
    }
    return `!error ${error}`;
  }
};

const DBAddNewPatient = async (
  doc: PatientInterface,
  img?: string
): Promise<{ res: string | boolean; error?: string }> => {
  try {
    // create random unique id
    const id = await GenerateNewID();
    if (id.startsWith('!error')) {
      return { res: false, error: id };
    }
    // eslint-disable-next-line no-underscore-dangle
    doc._id = id;

    // Encrypt data
    const data = await CipherEncrypt(JSON.stringify(doc));

    // insert data to database
    const res = await PATIENTS.put({
      _id: id,
      _attachments: {
        patient: { content_type: 'image/jpeg', data: img || '' },
      },
      keywords: doc.keywords,
      data,
    });

    if (res.ok) {
      return { res: id };
    }
    return { res: false, error: 'response ok is false' };
  } catch (error) {
    return { res: false, error };
  }
};

const decrpytdoc = async (
  docs: PouchDB.Core.ExistingDocument<PatientInterfaceEncrypted>[]
) => {
  const temp = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const doc of docs) {
    temp.push(CipherDecrypt(doc.data));
  }

  return Promise.all(temp);
};

const DBSearchByName = async (
  name: string
): Promise<{
  res?: PatientInterface[];
  error?: string;
}> => {
  try {
    const indexRes = await PATIENTS.createIndex({
      index: {
        fields: ['keywords'],
      },
    });

    if (indexRes.result === 'created' || indexRes.result === 'exists') {
      const res = await PATIENTS.find({
        selector: { keywords: { $elemMatch: name } },
        fields: ['_id', 'data'],
      });

      // decrypt data
      const decrypted = await decrpytdoc(res.docs);

      return { res: decrypted };
    }
    return { error: 'DBSearchByName createIndex failed' };
  } catch (error) {
    return { error };
  }
};

const DBSearchByID = async (id: string) => {
  try {
    const doc = await PATIENTS.get(id, { attachments: true });
    const decrypted = await CipherDecrypt(doc.data);
    if (doc) {
      return { res: decrypted };
    }
    return { res: false, error: `User ${id} not found` };
  } catch (error) {
    return { res: false, error };
  }
};

export { DBAddNewPatient, DBSearchByName, DBSearchByID };
