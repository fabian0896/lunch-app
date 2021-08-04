import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import './RfidCard.global.css';

const Card = () => {
  const [reading, setReading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRead = () => {
    setReading(true);
    setTimeout(setReading, 5000, false);
  };

  return (
    <div className="RfidCard">
      <>
        {reading ? (
          <div className="Rfid-circle">
            <Icon size="large" color="grey" inverted name="wifi" />
          </div>
        ) : (
          <Button onClick={handleRead}>Escanear</Button>
        )}
      </>
    </div>
  );
};

export default Card;
