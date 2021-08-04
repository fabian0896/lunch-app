const { ipcMain } = require('electron');
const Rfid = require('rfid');

module.exports = function setupRfid() {
  ipcMain.handle('getRfidPorts', async () => {
    const list = await Rfid.list();
    return list;
  });
};
