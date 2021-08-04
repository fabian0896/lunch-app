import React, { useState } from 'react';
import { Button, Icon, Header } from 'semantic-ui-react';
import './RfidCard.global.css';

const Card = () => {
  const [reading, setReading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleRead = () => {
    setReading(true);
    setTimeout(() => {
      setComplete(true);
      setReading(false);
      const randomSuccess = Math.random() >= 0.5;
      setSuccess(randomSuccess);
    }, 10000);
  };

  if (complete) {
    if (success) {
      return (
        <div className="RfidCard success">
          <Header size="small" icon textAlign="center">
            <Icon size="small" name="check circle" />
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
