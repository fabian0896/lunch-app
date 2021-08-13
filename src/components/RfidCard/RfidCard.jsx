import React, { useState, useEffect } from 'react';
import { Button, Icon, Header } from 'semantic-ui-react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import './RfidCard.global.css';

const Card = ({ onChange, error }) => {
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
    onChange(null);
    ipcRenderer.removeAllListeners();
  };

  const hanldeCardReadSuccess = (event, cardId) => {
    setComplete(true);
    setSuccess(true);
    setReading(false);
    const testCardId = uuidv4();
    console.log(testCardId);
    onChange(testCardId);
    ipcRenderer.removeAllListeners();
  };

  const handleRead = () => {
    setReading(true);
    setComplete(false);
    setSuccess(false);
    ipcRenderer.send('readCard');
    ipcRenderer.once('read-card-error', hanldeCardReadError);
    ipcRenderer.once('read-card-success', hanldeCardReadSuccess);
  };

  const handleCancel = () => {
    setReading(false);
    setComplete(false);
    setSuccess(false);
    ipcRenderer.removeAllListeners();
  };

  if (complete) {
    if (success) {
      if (error) {
        return (
          <div className="RfidCard error">
            <Header size="small" icon textAlign="center">
              <Icon size="small" name="close" circular />
              <Header.Content>Que mal!!</Header.Content>
              <Header.Subheader>{error}</Header.Subheader>
            </Header>
          </div>
        );
      }
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
        <Icon
          onClick={handleRead}
          className="RfidCard-action-icon"
          name="redo"
        />
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
        <Icon
          onClick={handleCancel}
          className="RfidCard-action-icon"
          name="close"
        />
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

Card.propTypes = {
  onChange: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
Card.defaultProps = {
  onChange: () => {},
  error: false,
};

export default Card;
