const { ipcMain } = require('electron');
const { EventEmitter } = require('events');
const Rfid = require('rfid');

let rfid = null;
let unsuscribeFunc = null;

class RfidState extends EventEmitter {}
const rfidState = new RfidState();

module.exports = function setupRfid() {
  ipcMain.handle('getRfidPorts', async () => {
    const list = await Rfid.list();
    return list;
  });

  ipcMain.handle(
    'connectRfid',
    (event, port) =>
      new Promise((resolve, reject) => {
        if (rfid) {
          rfidState.emit('change-rfid', true);
          const message = 'Ya existe una concción activa';
          reject(message);
        }

        try {
          rfid = new Rfid({
            baudRate: 9600,
            portPath: port,
          });

          rfid.open((err) => {
            const message = 'No se pudo conectar al dispositivo';
            if (err) {
              rfidState.emit('change-rfid', false);
              reject(message);
            }

            rfid.on('close', () => {
              rfidState.emit('change-rfid', false);
              if (rfid) {
                rfid.removeAllListeners();
                rfid = null;
              }
            });

            rfid.onReady((error) => {
              if (error) {
                rfid.close();
                const ErrorMessage = 'No se pudo conectar al dispositivo';
                reject(ErrorMessage);
              }
              rfidState.emit('change-rfid', true);
              resolve();
            });
          });
        } catch (err) {
          const message = 'No se pudo conectar al dispositivo';
          rfidState.emit('change-rfid', false);
          reject(message);
        }
      })
  );

  ipcMain.on('get-rfid-state', (event) => {
    event.reply('rfid-state', !!rfid);
    rfidState.on('change-rfid', (state) => {
      event.reply('rfid-state', state);
    });
    /* if (!rfid) {
      event.reply('rfid-state', false);
    }
    rfid.onConnectState((err, state) => {
      event.reply('rfid-state', state === 'CONNECTED');
    }); */
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
      unsuscribeFunc = null;
      event.reply('read-card-success', id);
    }, timeout);
  });

  ipcMain.handle('cancel-read-rfid', async () => {
    if (unsuscribeFunc) {
      await unsuscribeFunc();
      unsuscribeFunc = null;
    }
  });

  ipcMain.handle('disconnect-rfid', async () => {
    if (!rfid) {
      rfidState.emit('change-rfid', false);
      return;
    }
    rfid.close((err) => {
      if (err)
        throw new Error('Se presentó un error al desconectar el dispositivo');
      if (rfid) {
        rfidState.emit('change-rfid', false);
        rfid.removeAllListeners();
        rfid = null;
      }
    });
  });
};
