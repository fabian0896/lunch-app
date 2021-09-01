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
    await mkdrip(imageFolder);

    const fullPath = path.join(imageFolder, fileName);

    /* const result = await compress({
      source: imagePath.replace(/\\/g, '/'),
      destination: fullPath,
      enginesSetup: {
        jpg: { engine: 'mozjpeg', command: ['-quality', '60'] },
        png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] },
      },
      onProgress(err) {
        if (err) throw new Error('No fue posible comprimir la imagen');
      },
    });

    const { statistics, errors } = result;

    if (!!errors.length || statistics[0].err) {
      throw new Error('No fue posible comprimir la imagen');
    }

    return statistics[0].path_out_new; */
    fs.copyFileSync(imagePath, fullPath, fs.constants.COPYFILE_FICLONE);
    return imagePath;
  });

  ipcMain.on('generate-avatar', (event, id) => {
    const svg = createAvatar(style, {
      seed: id,
      backgroundColor: '#FFFFFF',
      margin: 5,
      mood: ['happy'],
    });
    const appPath = app.getPath('appData');
    const savePath = path.join(appPath, app.getName(), 'images/', `${id}.svg`);
    fs.writeFileSync(savePath, svg, { encoding: 'utf-8' });
    event.returnValue = savePath;
  });
};
