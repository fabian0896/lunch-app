import React from 'react';
import PropTypes from 'prop-types';
import { Table, Header, Image, Popup, Iconc, Icon } from 'semantic-ui-react';

import avatarSvg from '../../../assets/svg/profile_pic.svg';

const UserList = ({ users }) => {
  return (
    <Table selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colspan="2">Nombre</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>
              <Header as="h4" image>
                <Image rounded src={avatarSvg} />
                <Header.Content>
                  {user.name}
                  <Header.Subheader>
                    {user.company?.name || 'Sin empresa'}
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Popup
                content="El usuario no tiene empresa asignada"
                trigger={<Icon name="warning sign" color="yellow" />}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default UserList;
