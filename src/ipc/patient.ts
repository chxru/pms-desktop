/* eslint-disable import/prefer-default-export */
import { DBAddNewPatient } from '../database/patients';
import { PatientInterface } from '../database/schemes/patient_scheme';

export const AddNewPatient = async (
  data: PatientInterface
): Promise<{ res: string | boolean; error?: string }> => {
  try {
    // data validation
    // TODO: Add more validation
    if (!data.firstname) return { res: false, error: 'empty-firstname' };
    if (!data.lastname) return { res: false, error: 'empty-lastname' };

    const { res, error } = await DBAddNewPatient(data);
    return { res, error };
  } catch (error) {
    return { res: false, error };
  }
};
