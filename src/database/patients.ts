/* eslint-disable import/prefer-default-export */
import crypto from 'crypto';
import { PATIENTS } from './database';
import { PatientInterface } from './schemes/patient_scheme';

const SearchPatientByID = async (id: string) => {
  try {
    const doc = await PATIENTS.get(id);
    return doc;
  } catch (error) {
    return false;
  }
};

const GenerateNewID = async (): Promise<string> => {
  // eslint-disable-next-line no-console
  console.log('generating id');
  const id = crypto.randomBytes(4).toString('hex');
  const isDuplicate = await SearchPatientByID(id);
  if (!isDuplicate) {
    return id;
  }

  // rerun the function if the id is a duplicate
  return GenerateNewID();
};

export const DBAddNewPatient = async (
  data: PatientInterface
): Promise<{ res: string | boolean; error?: string }> => {
  try {
    // create random unique id
    const id = await GenerateNewID();

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
