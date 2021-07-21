import { DBCloseBedTicket, DBStartNewBedTicket } from '../database/bedticket';
import { BedTicketInterface } from '../database/schemes/bedticket_scheme';

const OpenNewBedTicket = async (
  patient: string,
  data: BedTicketInterface
): Promise<{
  res: boolean;
  error?: string | undefined;
}> => {
  try {
    await DBStartNewBedTicket(patient, data);
    return { res: true };
  } catch (error) {
    return { res: false, error };
  }
};

const CloseBedTicket = async (
  patient: string,
  bedticket: string
): Promise<{
  res: boolean;
  error?: string | undefined;
}> => {
  try {
    await DBCloseBedTicket(patient, bedticket);
    return { res: true };
  } catch (error) {
    return { res: false, error };
  }
};

export { OpenNewBedTicket, CloseBedTicket };
