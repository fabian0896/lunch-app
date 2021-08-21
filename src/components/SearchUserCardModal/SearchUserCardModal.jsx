import React from 'react';
import { Modal, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { RfidCard } from '..';

const SearchUserCardModal = ({ open, onClose, onOpen, onRead, error }) => {
  return (
    <Modal
      dimmer="blurring"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      size="mini"
      closeIcon
    >
      <Modal.Header>
        <Header>Busqueda por tarjeta</Header>
      </Modal.Header>
      <Modal.Content>
        <RfidCard error={error} startRead onChange={onRead} />
      </Modal.Content>
    </Modal>
  );
};

SearchUserCardModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onRead: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

SearchUserCardModal.defaultProps = {
  open: false,
  onClose: () => {},
  onOpen: () => {},
  onRead: () => {},
  error: false,
};

export default SearchUserCardModal;
