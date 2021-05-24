import {
  DBAddNewPatient,
  DBSearchByID,
  DBSearchByName,
} from '../database/patients';
import { PatientInterface } from '../database/schemes/patient_scheme';

import { OptimizeProfilePicture } from '../util/imgOpt';

const AddNewPatient = async ({
  data,
  imgbase64,
}: {
  data: PatientInterface;
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
      keywords: [
        ...data.firstname
          .trim()
          .split(' ')
          .map((e) => e.toLocaleLowerCase()),
        ...data.lastname
          .trim()
          .split(' ')
          .map((e) => e.toLocaleLowerCase()),
      ],
    };

    const { res, error } = await DBAddNewPatient(formatted, img);
    return { res, error };
  } catch (error) {
    return { res: false, error };
  }
};

const SearchPatientByName = async (
  name: string
): Promise<{
  res: PatientInterface[] | undefined;
  error: string | undefined;
}> => {
  const n = name.toLocaleLowerCase();
  const { res, error } = await DBSearchByName(n);
  return { res, error };
};

const GetPatientByID = async (id: string) => {
  if (!id) {
    return { res: false, error: 'empty id' };
  }

  const { res, error } = await DBSearchByID(id);
  return { res, error };
};

export { AddNewPatient, SearchPatientByName, GetPatientByID };
