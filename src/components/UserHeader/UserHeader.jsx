import React from 'react';
import { Header, Button, Image, Divider, Icon } from 'semantic-ui-react';
import { startCase } from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';

import userSvg from '../../../assets/svg/profile_pic.svg';

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
      <Image centered size="tiny" src={userSvg} />
      <Header textAlign="center" as="h2">
        <Header.Content>
          {startCase(user.name)}
          <Header.Subheader>
            {user.company?.name || 'Sin empresa'}
          </Header.Subheader>
          <Header.Subheader>
            Ultima actualización: {moment(user.updateAt).format('DD/MM/YYYY')}
          </Header.Subheader>
        </Header.Content>
      </Header>
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
