import React from 'react';
import { Modal, Header, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ConfirmModal = ({ title, message, onClose, onConfirm, open }) => {
  return (
    <Modal open={open} basic size="small">
      <Header icon>
        <Icon name="warning sign" />
        {title}
      </Header>
      <Modal.Content>
        <p style={{ textAlign: 'center' }}>{message}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose} basic inverted negative>
          <Icon name="remove" />
          No
        </Button>
        <Button onClick={onConfirm} basic inverted positive>
          <Icon name="checkmark" />
          Obvio bobis
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ConfirmModal;
