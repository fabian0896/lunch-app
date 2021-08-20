import React from 'react';
import { Modal, Header, Icon, Divider, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import './SuccessModal.global.css';

import avatarSvg from '../../../assets/svg/profile_pic.svg';

const SuccessModal = ({ title, subtitle, open, user }) => {
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
        {user && (
          <>
            <Divider horizontal inverted content="Cliente" />
            <Image src={avatarSvg} size="tiny" centered />
            <Header
              textAlign="center"
              inverted
              content={startCase(user.name)}
              subheader={user.company?.name || 'Sin empresa'}
            />
          </>
        )}
      </Modal.Content>
    </Modal>
  );
};

SuccessModal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

SuccessModal.defaultProps = {
  open: false,
  user: false,
};

export default SuccessModal;
