const { ipcMain, app } = require('electron');
const { compress } = require('compress-images/promise');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

module.exports = function setupImages() {
  ipcMain.handle('backup-image', async (event, imagePath) => {
    const appPath = app.getPath('appData');
    const fullPath = path.join(
      appPath,
      app.getName(),
      'images/',
      `${uuidv4()}-`
    );

    const result = await compress({
      source: imagePath,
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

    return statistics[0].path_out_new;
  });
};
