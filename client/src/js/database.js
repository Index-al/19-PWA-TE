import { openDB } from 'idb';

const DATABASE_NAME = 'jate';
const STORE_NAME = 'jate';
const DATABASE_VERSION = 1;
const KEY_PATH = 'id';

// Open a connection to the IndexedDB.
export const initdb = async () =>
  openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {
      if (db.objectStoreNames.contains(STORE_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(STORE_NAME, { keyPath: KEY_PATH, autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add or update content in the IndexedDB.
export const putDb = async (content) => {
  console.log('PUT to the database', content);
  const jateDb = await openDB(DATABASE_NAME, DATABASE_VERSION);
  const tx = jateDb.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

// Get content from the IndexedDB.
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB(DATABASE_NAME, DATABASE_VERSION);
  const tx = jateDb.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const request = store.get(1);
  const result = await request;
  console.log('Data retrieved from the database', result);
  return result?.value;
};

// Run initdb to create the database
initdb();