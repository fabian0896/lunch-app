const { ipcMain } = require('electron');
const Rfid = require('rfid');

let rfid = null;
let unsuscribeFunc = null;

module.exports = function setupRfid() {
  ipcMain.handle('getRfidPorts', async () => {
    const list = await Rfid.list();
    return list;
  });

  ipcMain.handle(
    'connectRfid',
    (event, port) =>
      new Promise((resolve, reject) => {
        try {
          rfid = new Rfid({
            baudRate: 9600,
            portPath: port,
          });

          rfid.open((err) => {
            const message = 'No se pudo conectar al dispositivo';
            if (err) reject(message);
            rfid.onReady(resolve);
          });
        } catch (err) {
          const message = 'No se pudo conectar al dispositivo';
          reject(message);
        }
      })
  );

  ipcMain.on('get-rfid-state', (event) => {
    if (!rfid) {
      event.reply('rfid-state', false);
    }
    rfid.onConnectState((err, state) => {
      event.reply('rfid-state', state === 'CONNECTED');
    });
  });

  ipcMain.on('readCard', (event, timeout = 15000) => {
    if (!rfid) {
      event.reply(
        'read-card-error',
        new Error('No se detecta ningun dispositivo contectado')
      );
      return;
    }
    unsuscribeFunc = rfid.readCardOnce((err, data) => {
      if (err) {
        event.reply(
          'read-card-error',
          new Error('No se pudo leer ninguna tarjeta')
        );
        return;
      }
      const { id } = data.payload;
      event.reply('read-card-success', id);
    }, timeout);
  });

  ipcMain.on('cancel-read-rfid', (event) => {
    if (unsuscribeFunc) {
      unsuscribeFunc();
      unsuscribeFunc = null;
    }
    event.returnValue = 'OK';
  });
};
