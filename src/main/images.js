const { app, ipcMain } = require('electron');
const { constants, copyFile } = require('fs');
const { promisify } = require('util');
const path = require('path');

module.exports = function setupImages() {
  ipcMain.handle('backupImage', async (event, originalPath) => {
    const fileName = path.basename(originalPath);
    const detination = path.join(
      app.getPath('appData'),
      app.getName(),
      'images',
      fileName
    );
    await promisify(copyFile)(originalPath, detination);
    return detination;
  });
};
