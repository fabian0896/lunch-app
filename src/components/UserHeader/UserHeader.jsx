import React from 'react';
import {
  Header,
  Button,
  Image,
  Divider,
  Icon,
  Statistic,
} from 'semantic-ui-react';
import { startCase } from 'lodash';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { format } from 'date-fns';

import userSvg from '../../../assets/svg/profile_pic.png';

import './UserHeader.global.css';

const UserHeader = ({ user, onGoBack, onEdit, onDelete }) => {
  return (
    <div className="UserHeader">
      <Icon
        onClick={onGoBack}
        className="UserHeader-back-arrow"
        size="big"
        name="arrow left"
      />
      <Image rounded centered size="tiny" src={user.avatar || userSvg} />
      <Header textAlign="center" as="h2">
        <Header.Content>
          {startCase(user.name)}
          <Header.Subheader>
            {user.company?.name || 'Sin empresa'}
          </Header.Subheader>
        </Header.Content>
      </Header>
      <p style={{ textAlign: 'center' }}>
        Estadisticas basadas desde el{' '}
        <strong>{format(user.dateRange[0], 'd/MM/y')}</strong> hasta el{' '}
        <strong>{format(user.dateRange[1], 'd/MM/y')}</strong>
      </p>
      <Statistic.Group
        color="grey"
        style={{ marginTop: '25px' }}
        size="small"
        widths="2"
      >
        <Statistic
          label="Valor total"
          value={numeral(user.totalPrice).format('$0,0')}
        />
        <Statistic label="Pedidos" value={user.totalOrders} />
      </Statistic.Group>
      <Divider />
      <div className="UserHeader-actions">
        <Button onClick={onEdit} content="editar" secondary icon="edit" />
        <Button onClick={onDelete} negative content="Eliminar" icon="trash" />
      </div>
    </div>
  );
};

UserHeader.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  onGoBack: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
UserHeader.defaultProps = {
  onGoBack: () => {},
  onEdit: () => {},
  onDelete: () => {},
};
export default UserHeader;
