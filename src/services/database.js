import db from 'lunch-db';
import { ipcRenderer } from 'electron';

let models = null;

export async function initDb() {
  if (models) return;
  const dbPath = ipcRenderer.sendSync('getDbPath');
  console.log(dbPath);
  const responseModels = await db({
    dialect: 'sqlite',
    storage: dbPath,
  });
  models = responseModels;
}

export function database() {
  return models;
}
