const { dialog, ipcMain } = require('electron');

module.exports = function setupUtilities(mainWindow) {
  ipcMain.handle('get-save-path', async () => {
    const { filePath } = await dialog.showSaveDialog(mainWindow, {
      title: 'Guardar reporte',
      buttonLabel: 'Guardar reporte',
      message: 'Selecciona una carpeta para guardar el reporte',
      defaultPath: 'reporte-ventas.xlsx',
    });
    return filePath;
  });
};
