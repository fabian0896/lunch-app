import db from 'lunch-db';
import { app, ipcMain } from 'electron';

async function setupDatabase() {
  ipcMain.handle('message', async (event) => {
    return 'Hola desde el main process';
  });
}

export default setupDatabase;
