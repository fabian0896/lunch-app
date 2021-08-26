import React, { useState, useEffect } from 'react';
import { Button, Icon, Header } from 'semantic-ui-react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';

import './RfidCard.global.css';

const Card = ({ onChange, error, startRead }) => {
  const [reading, setReading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [complete, setComplete] = useState(false);
  const [customErr, setCustomErr] = useState('');

  useEffect(() => {
    return async () => {
      await ipcRenderer.invoke('cancel-read-rfid');
      ipcRenderer.removeAllListeners('read-card-error');
      ipcRenderer.removeAllListeners('read-card-success');
    };
  }, []);

  const hanldeCardReadError = (event, err) => {
    setComplete(true);
    setSuccess(false);
    setReading(false);
    onChange(null);
    setCustomErr(err.message);
    ipcRenderer.removeAllListeners('read-card-error');
    ipcRenderer.removeAllListeners('read-card-success');
  };

  const hanldeCardReadSuccess = (event, cardId) => {
    setComplete(true);
    setSuccess(true);
    setReading(false);
    onChange(cardId);
    ipcRenderer.removeAllListeners('read-card-error');
    ipcRenderer.removeAllListeners('read-card-success');
  };

  const handleRead = () => {
    setReading(true);
    setComplete(false);
    setSuccess(false);
    ipcRenderer.send('readCard');
    ipcRenderer.once('read-card-error', hanldeCardReadError);
    ipcRenderer.once('read-card-success', hanldeCardReadSuccess);
  };

  const handleCancel = async () => {
    await ipcRenderer.invoke('cancel-read-rfid');
    setReading(false);
    setComplete(false);
    setSuccess(false);
    ipcRenderer.removeAllListeners('read-card-error');
    ipcRenderer.removeAllListeners('read-card-success');
  };

  useEffect(() => {
    if (startRead) {
      handleRead();
      return;
    }
    handleCancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startRead]);

  if (complete) {
    if (success) {
      if (error) {
        return (
          <div className="RfidCard error">
            <Icon
              onClick={handleRead}
              className="RfidCard-action-icon"
              name="redo"
            />
            <Header size="small" icon textAlign="center">
              <Icon size="small" name="close" circular />
              <Header.Content>Algo salio mal :(</Header.Content>
              <Header.Subheader>{error}</Header.Subheader>
            </Header>
          </div>
        );
      }
      return (
        <div className="RfidCard success">
          <Icon
            onClick={handleRead}
            className="RfidCard-action-icon"
            name="redo"
          />
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
          <Header.Subheader>{customErr}</Header.Subheader>
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
      <Button type="button" onClick={handleRead}>
        Escanear
      </Button>
    </div>
  );
};

Card.propTypes = {
  onChange: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  startRead: PropTypes.bool,
};
Card.defaultProps = {
  onChange: () => {},
  error: false,
  startRead: false,
};

export default Card;
