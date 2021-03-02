/* eslint-disable import/prefer-default-export */
import PouchDB from 'pouchdb-node';

// schemes
import { PatientInterface } from './schemes/patient_scheme';
import { UserInterface } from './schemes/user_scheme';

/* plugins */
PouchDB.plugin(require('pouchdb-adapter-leveldb'));
PouchDB.plugin(require('pouchdb-find'));

// databases
export const USERS = new PouchDB<UserInterface>('db/users', {
  adapter: 'leveldb',
});

export const PATIENTS = new PouchDB<PatientInterface>('db/patients', {
  adapter: 'leveldb',
});
