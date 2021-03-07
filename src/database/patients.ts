/* eslint-disable import/prefer-default-export */
import crypto from 'crypto';
import { PATIENTS } from './database';
import { PatientInterface } from './schemes/patient_scheme';

const GenerateNewID = async (): Promise<string> => {
  const id = crypto.randomBytes(4).toString('hex');
  try {
    await PATIENTS.get(id);

    /*
    if above code did not find a patient for give id, it throws
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

export const DBAddNewPatient = async (
  data: PatientInterface
): Promise<{ res: string | boolean; error?: string }> => {
  try {
    // create random unique id
    const id = await GenerateNewID();
    if (id.startsWith('!')) {
      return { res: false, error: id };
    }

    // insert data to database
    const res = await PATIENTS.put({ _id: id, ...data });

    if (res.ok) {
      return { res: id };
    }
    return { res: false, error: 'response ok is false' };
  } catch (error) {
    return { res: false, error };
  }
};

export const DBSearchByName = async (
  name: string
): Promise<{
  res?: PouchDB.Core.ExistingDocument<PatientInterface>[];
  error?: string;
}> => {
  try {
    const indexRes = await PATIENTS.createIndex({
      index: {
        fields: ['firstname'],
      },
    });

    if (indexRes.result === 'created' || indexRes.result === 'exists') {
      const res = await PATIENTS.find({
        selector: { firstname: { $elemMatch: name } },
        fields: ['_id', 'firstname', 'lastname'],
        sort: ['firstname'],
      });

      return { res: res.docs };
    }
    return { error: 'DBSearchByName createIndex failed' };
  } catch (error) {
    return { error };
  }
};

export const DBSearchByID = async (id: string) => {
  try {
    const doc = await PATIENTS.get(id, { attachments: true });
    if (doc) {
      return { res: doc };
    }
    return { res: false, error: `User ${id} not found` };
  } catch (error) {
    return { res: false, error };
  }
};
