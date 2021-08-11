import React, { useState, useEffect } from 'react';
import { Button, Icon, Header } from 'semantic-ui-react';
import { ipcRenderer } from 'electron';

import './RfidCard.global.css';

const Card = () => {
  const [reading, setReading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    return () => {
      ipcRenderer.removeAllListeners();
    };
  }, []);

  const hanldeCardReadError = () => {
    setComplete(true);
    setSuccess(false);
    setReading(false);
    ipcRenderer.removeAllListeners();
  };

  const hanldeCardReadSuccess = (event, cartId) => {
    setComplete(true);
    setSuccess(true);
    setReading(false);
    console.log(cartId);
    ipcRenderer.removeAllListeners();
  };

  const handleRead = () => {
    setReading(true);
    ipcRenderer.sendSync('readCard');
    ipcRenderer.once('read-card-error', hanldeCardReadError);
    ipcRenderer.once('read-card-success', hanldeCardReadSuccess);
  };

  if (complete) {
    if (success) {
      return (
        <div className="RfidCard success">
          <Header size="small" icon textAlign="center">
            <Icon size="small" name="check" circular />
            <Header.Content>Ohhh Yeah!!</Header.Content>
            <Header.Subheader>
              Se escaneo la tarjeta correctamente
            </Header.Subheader>
          </Header>
        </div>
      );
    }
    return (
      <div className="RfidCard error">
        <Header size="small" icon textAlign="center">
          <Icon size="small" name="close" circular />
          <Header.Content>Que mal!!</Header.Content>
          <Header.Subheader>
            No se pudo scanear la tarjeta, intenta nuevamente
          </Header.Subheader>
        </Header>
      </div>
    );
  }
  if (reading) {
    return (
      <div className="RfidCard reading">
        <div className="Rfid-circle">
          <Icon size="large" color="grey" inverted name="wifi" />
        </div>
      </div>
    );
  }

  return (
    <div className="RfidCard">
      <Button onClick={handleRead}>Escanear</Button>
    </div>
  );
};

export default Card;
