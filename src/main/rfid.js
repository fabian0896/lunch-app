const { ipcMain } = require('electron');
const Rfid = require('rfid');

module.exports = function setupRfid() {
  ipcMain.handle('getRfidPorts', async () => {
    const list = await Rfid.list();
    return list;
  });

  ipcMain.handle('connectRfid', async (event, port) => {
    // Aqui hay que conectar el rfid new Rfid({ port, baudRate: 9600 })
    console.log(port);
    if (Math.random() >= 0.5) {
      throw new Error('error de prueba');
    }
  });

  ipcMain.on('readCard', (event) => {
    setTimeout(() => {
      if (Math.random() >= 0.5) {
        event.reply('read-card-error', new Error('test error'));
      } else {
        event.reply('read-card-success', '123456789');
      }
    }, 5000);
    event.returnValue = 'Funcion de cancelación';
  });
};
