import db from 'lunch-database';
import { ipcRenderer } from 'electron';

let models = null;

export async function initDb() {
  if (models) return;
  const dbPath = ipcRenderer.sendSync('getDbPath');
  console.log(dbPath);
  const responseModels = await db({ path: dbPath, filename: 'lunchdb' });
  models = responseModels;
}

export function database() {
  return models;
}
