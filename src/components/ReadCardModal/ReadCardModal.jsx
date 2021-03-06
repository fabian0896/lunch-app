import React, { useState, useEffect } from 'react';
import { Modal, Image, Button, Divider, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { startCase } from 'lodash';

import { UserSearch } from '..';
import RfidCard from '../RfidCard';

import { database } from '../../services/database';

import rfidCardSvg from '../../../assets/svg/plain_credit_card.png';
import profileSvg from '../../../assets/svg/profile_pic.png';

const ReadCardModal = ({ open, onCancel, products, onUserSelect }) => {
  const [results, setResults] = useState();
  const [user, setUser] = useState(false);
  const [error, setError] = useState('');

  const handleSearchChange = async (e, data) => {
    const { User } = database();
    const res = await User.searchByName(data.value);
    setResults(res);
  };

  const handleSelectUser = (selectedUser) => {
    setUser(selectedUser);
  };

  const handleReadCard = async (cardId) => {
    const { User } = database();
    const resUser = await User.getByCardId(cardId);
    if (!resUser) {
      setError('La tarjeta no esta vinculada a ningun usuario');
      setUser(false);
      return;
    }
    setError('');
    setUser(resUser);
    onUserSelect(resUser);
  };

  const getTotalPrice = () => {
    const total = products.reduce(
      (sum, p) => sum + p.details.price * p.details.quantity,
      0
    );
    return numeral(total).format('$0,0');
  };

  useEffect(() => {
    setUser(false);
  }, [open]);

  return (
    <Modal
      dimmer="blurring"
      onClose={onCancel}
      closeIcon
      open={open}
      size="mini"
    >
      <Modal.Content>
        {user ? (
          <Header dividing textAlign="center" size="large" icon>
            <Image rounded src={user.avatar || profileSvg} />
            <Header.Content>
              {startCase(user.name)}
              <Header.Subheader>
                {user.company?.name || 'Sin Empresa'}
              </Header.Subheader>
            </Header.Content>
          </Header>
        ) : (
          <Image centered size="medium" src={rfidCardSvg} />
        )}
        <Header
          textAlign="center"
          size="large"
          content={getTotalPrice()}
          subheader="Precio total"
        />
        <RfidCard startRead={open} error={error} onChange={handleReadCard} />
        <Divider horizontal content="sin tarjeta" />
        <UserSearch
          onSelect={handleSelectUser}
          results={results}
          onSearchChange={handleSearchChange}
        />
        <Button
          onClick={() => onUserSelect(user)}
          disabled={!user}
          style={{ marginTop: '15px' }}
          content="Pagar pedido"
          fluid
          positive
        />
      </Modal.Content>
    </Modal>
  );
};

ReadCardModal.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onUserSelect: PropTypes.func,
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
};
ReadCardModal.defaultProps = {
  open: false,
  onCancel: () => {},
  onUserSelect: () => {},
};

export default ReadCardModal;
