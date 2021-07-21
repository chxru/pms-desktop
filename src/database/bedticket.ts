import { BEDTICKETS } from './database';
import { DBSearchByID, DBUpdateRecord } from './patients';
import { BedTicketInterface } from './schemes/bedticket_scheme';

const DBStartNewBedTicket = async (
  patient_id: string,
  data: BedTicketInterface
) => {
  // insert data to bedtickets database
  const { id: ticketid } = await BEDTICKETS.post(data);

  // get patient records
  const patient = await DBSearchByID(patient_id);

  // update records with current bed ticket
  patient.current_bedticket = ticketid;

  // update the database
  await DBUpdateRecord(patient_id, patient);
};

const DBCloseBedTicket = async (patient_id: string, bedticket_id: string) => {
  // get bed ticket doc
  const bedticket = await BEDTICKETS.get(bedticket_id);

  // update bedticket and save
  bedticket.isClosed = true;
  bedticket.timestamps.closed = Date.now();
  await BEDTICKETS.put({ ...bedticket });

  // get patient records
  const patient = await DBSearchByID(patient_id);

  // update patient record and save
  patient.current_bedticket = false;
  patient.previous_bedtickets.push(bedticket_id);
  await DBUpdateRecord(patient_id, patient);
};

export { DBStartNewBedTicket, DBCloseBedTicket };
