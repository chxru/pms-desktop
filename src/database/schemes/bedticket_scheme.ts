export interface BedTicketInterface {
  _id?: string;
  _rev?: string;
  admission_number: string;
  isClosed: boolean;
  consultant_name: string;
  timestamps: {
    admit: number;
    closed: number;
  };
}
