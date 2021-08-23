const { ipcMain } = require('electron');

module.exports = function setupReports() {
  ipcMain.handle('generate-report', (event, data) => {
    console.log(data);
  });
};
