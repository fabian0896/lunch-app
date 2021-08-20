import React from 'react';
import { Modal, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './SuccessModal.global.css';

const SuccessModal = ({ title, subtitle, open }) => {
  return (
    <Modal dimmer="blurring" size="mini" open={open}>
      <Modal.Content className="SuccessModal-content">
        <Header inverted icon>
          <Icon name="check" />
          <Header.Content>
            {title}
            <Header.Subheader>{subtitle}</Header.Subheader>
          </Header.Content>
        </Header>
      </Modal.Content>
    </Modal>
  );
};

SuccessModal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

SuccessModal.defaultProps = {
  open: false,
};

export default SuccessModal;
