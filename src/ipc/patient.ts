/* eslint-disable import/prefer-default-export */
import {
  DBAddNewPatient,
  DBSearchByID,
  DBSearchByName,
} from '../database/patients';
import { PatientInterface } from '../database/schemes/patient_scheme';

import { OptimizeProfilePicture } from '../util/imgOpt';

export const AddNewPatient = async ({
  data,
  imgbase64,
}: {
  data: Omit<PatientInterface, 'firstname' | 'lastname'> & {
    firstname: string;
    lastname: string;
  };
  imgbase64?: string;
}): Promise<{ res: string | boolean; error?: string }> => {
  try {
    // data validation
    // TODO: Add more validation
    if (!data.firstname) return { res: false, error: 'empty-firstname' };
    if (!data.lastname) return { res: false, error: 'empty-lastname' };

    // image optimizing
    const img = imgbase64 ? await OptimizeProfilePicture(imgbase64) : undefined;

    // split first & last name into arrays
    const formatted: PatientInterface = {
      ...data,
      firstname: data.firstname.trim().split(' '),
      lastname: data.lastname.trim().split(' '),
    };

    const { res, error } = await DBAddNewPatient(formatted, img);
    return { res, error };
  } catch (error) {
    return { res: false, error };
  }
};

export const SearchPatientByName = async (
  name: string
): Promise<{
  res: PouchDB.Core.ExistingDocument<PatientInterface>[] | undefined;
  error: string | undefined;
}> => {
  const { res, error } = await DBSearchByName(name);
  return { res, error };
};

export const GetPatientByID = async (id: string) => {
  if (!id) {
    return { res: false, error: 'empty id' };
  }

  const { res, error } = await DBSearchByID(id);
  return { res, error };
};
