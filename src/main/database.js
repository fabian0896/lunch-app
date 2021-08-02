import db from 'lunch-db';
import { app, ipcMain } from 'electron';
import path from 'path';

function setupDatabase() {
  ipcMain.on('getDbPath', (event) => {
    const databasePath = app.getPath('appData');
    event.returnValue = path.join(
      databasePath,
      app.getName(),
      'databse.sqlite'
    );
  });
}

export default setupDatabase;
