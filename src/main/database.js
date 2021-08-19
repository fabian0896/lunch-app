import { app, ipcMain } from 'electron';
import path from 'path';

function setupDatabase() {
  ipcMain.on('getDbPath', (event) => {
    const databasePath = app.getPath('appData');
    const fullPath = path.join(databasePath, app.getName());
    console.log(fullPath);
    event.returnValue = fullPath;
  });
}

export default setupDatabase;
