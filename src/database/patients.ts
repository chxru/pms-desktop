import { randomBytes } from 'crypto';
import { CipherDecrypt, CipherEncrypt } from './crypto/cipher';
import { PATIENTS } from './database';
import {
  PatientInterface,
  PatientInterfaceEncrypted,
} from './schemes/patient_scheme';

/**
 * Generate unique ID
 *
 * @return {*}  {Promise<string>}
 */
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
    throw error;
  }
};

/**
 * Add new patient info to database
 *
 * @param {PatientInterface} doc
 * @param {string} [img]
 * @return {*}  {Promise<void>}
 */
const DBAddNewPatient = async (
  doc: PatientInterface,
  img?: string
): Promise<void> => {
  // create random unique id
  const id = await GenerateNewID();

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
    return;
  }

  // if res is not okay
  throw new Error('Add new patient failed');
};

/**
 * Decrypt multiple documents asynchronously
 *
 * @param {PouchDB.Core.ExistingDocument<PatientInterfaceEncrypted>[]} docs
 * @return {*}
 */
const decrpytdocs = async (
  docs: PouchDB.Core.ExistingDocument<PatientInterfaceEncrypted>[]
) => {
  const temp: Promise<PatientInterface>[] = [];

  docs.forEach(async (doc) => {
    const data = CipherDecrypt(doc.data);
    temp.push(data);
  });

  return Promise.all(temp);
};

/**
 * Search in patient database by name
 *
 * @param {string} name
 * @return {*}  {Promise<PatientInterface[]>}
 */
const DBSearchByName = async (name: string): Promise<PatientInterface[]> => {
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
    const decrypted = await decrpytdocs(res.docs);
    return decrypted;
  }

  // if indexing failed
  throw new Error('DBSearchByName createIndex failed');
};

/**
 * Search in patient database by id
 *
 * @param {string} id
 * @return {*}  {Promise<PatientInterface>}
 */
const DBSearchByID = async (id: string): Promise<PatientInterface> => {
  const doc = await PATIENTS.get(id, { attachments: true });
  const decrypted = await CipherDecrypt(doc.data);
  if (doc) {
    return decrypted;
  }

  throw new Error(`User ${id} not found`);
};

export { DBAddNewPatient, DBSearchByName, DBSearchByID };
