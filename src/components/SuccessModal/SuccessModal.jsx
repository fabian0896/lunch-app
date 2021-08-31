import React from 'react';
import {
  Modal,
  Header,
  Icon,
  Divider,
  Image,
  Button,
  Statistic,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import './SuccessModal.global.css';

import avatarSvg from '../../../assets/svg/profile_pic.png';

const SuccessModal = ({ title, subtitle, open, user, onClose }) => {
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
            <Image
              rounded
              src={user.avatar || avatarSvg}
              size="tiny"
              centered
            />
            <Header
              textAlign="center"
              inverted
              content={startCase(user.name)}
              subheader={user.company?.name || 'Sin empresa'}
            />
            <Divider inverted />
            {false && (
              <>
                <p style={{ color: 'white', textAlign: 'center' }}>
                  Estadisticas para esta quincena
                </p>
                <Statistic.Group widths="2" inverted size="mini">
                  <Statistic>
                    <Statistic.Value>$45,000</Statistic.Value>
                    <Statistic.Label>Saldo total</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>10</Statistic.Value>
                    <Statistic.Label>Pedidos</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </>
            )}
          </>
        )}
        <Button onClick={onClose} fluid>
          Perfecto!
        </Button>
      </Modal.Content>
    </Modal>
  );
};

SuccessModal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onClose: PropTypes.func,
};

SuccessModal.defaultProps = {
  open: false,
  user: false,
  onClose: () => {},
};

export default SuccessModal;
