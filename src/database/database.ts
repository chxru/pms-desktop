/* eslint-disable import/prefer-default-export */
import PouchDB from 'pouchdb-node';
import Datastore from 'nedb';

// schemes
import { PatientInterfaceEncrypted } from './schemes/patient_scheme';
import { UserInterface } from './schemes/user_scheme';
import { MetadataInterface } from './schemes/metadata_scheme';
import { MemCacheInterface } from './schemes/memcache_scheme';

/* plugins */
PouchDB.plugin(require('pouchdb-adapter-leveldb'));
PouchDB.plugin(require('pouchdb-find'));

// databases
export const USERS = new PouchDB<UserInterface>('db/users', {
  adapter: 'leveldb',
});

export const PATIENTS = new PouchDB<PatientInterfaceEncrypted>('db/patients', {
  adapter: 'leveldb',
});

export const METADATA = new PouchDB<MetadataInterface>('db/metadata', {
  adapter: 'leveldb',
});

export const MEMCACHE = new Datastore<MemCacheInterface>();
