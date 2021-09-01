const { ipcMain, app } = require('electron');
// const { compress } = require('compress-images/promise');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { createAvatar } = require('@dicebear/avatars');
const style = require('@dicebear/avatars-male-sprites');
const mkdrip = require('mkdirp');

module.exports = function setupImages() {
  ipcMain.handle('backup-image', async (event, imagePath) => {
    const appPath = app.getPath('appData');
    const ext = path.extname(imagePath);

    const fileName = `${uuidv4()}${ext}`;

    const imageFolder = path.join(appPath, app.getName(), 'images');

    const fullPath = path.join(imageFolder, fileName);

    await mkdrip(imageFolder);
    fs.copyFileSync(imagePath, fullPath, fs.constants.COPYFILE_FICLONE);
    return fullPath;
  });

  ipcMain.handle('delete-image', (event, imagePath) => {
    return new Promise((resolve, reject) => {
      fs.unlink(imagePath, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  });

  ipcMain.on('generate-avatar', (event, id) => {
    const svg = createAvatar(style, {
      seed: id,
      backgroundColor: '#FFFFFF',
      margin: 5,
      mood: ['happy'],
    });
    const appPath = app.getPath('appData');
    const imageFolder = path.join(appPath, app.getName(), 'images');
    const fileName = `${id}.svg`;
    mkdrip.sync(imageFolder);
    const savePath = path.join(imageFolder, fileName);
    fs.writeFileSync(savePath, svg, { encoding: 'utf-8' });
    event.returnValue = savePath;
  });
};
