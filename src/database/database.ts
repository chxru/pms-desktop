/* eslint-disable import/prefer-default-export */
import PouchDB from 'pouchdb-node';

/* plugins */
PouchDB.plugin(require('pouchdb-adapter-leveldb'));
PouchDB.plugin(require('pouchdb-find'));

// interfaces
export interface UserInterface {
  username: string;
  password: string;
}

// databases
export const USERS = new PouchDB<UserInterface>('db/users', {
  adapter: 'leveldb',
});
