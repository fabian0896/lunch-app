const { ipcMain } = require('electron');
const Rfid = require('rfid');

module.exports = function setupRfid() {
  ipcMain.handle('getRfidPorts', async (event) => {
    const list = await Rfid.list();
    return list;
  });
};
