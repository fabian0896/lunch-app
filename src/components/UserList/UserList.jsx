import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Header,
  Image,
  Popup,
  Icon,
  Button,
  Grid,
} from 'semantic-ui-react';
import { startCase, debounce } from 'lodash';

import UserSearch from '../UserSearch';

import avatarSvg from '../../../assets/svg/profile_pic.svg';

const UserList = ({
  users,
  onSearchChange,
  searchResults,
  onSelect,
  onCardSearch,
}) => {
  const handleOnResultSelect = (data) => {
    onSelect(data);
  };

  return (
    <Table selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="2">
            <Grid>
              <Grid.Column width="11">
                <UserSearch
                  results={searchResults}
                  onSearchChange={onSearchChange}
                  onSelect={handleOnResultSelect}
                />
              </Grid.Column>
              <Grid.Column textAlign="right" width="5">
                <Button
                  onClick={onCardSearch}
                  secondary
                  content="Buscar con tarjeta"
                  icon="search"
                />
              </Grid.Column>
            </Grid>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <Table.Row
            style={{ cursor: 'pointer' }}
            onClick={() => onSelect(user)}
            key={user.id}
          >
            <Table.Cell>
              <Header as="h4" image>
                <Image rounded src={user.avatar || avatarSvg} />
                <Header.Content>
                  {startCase(user.name)}
                  <Header.Subheader>
                    {user.company?.name || 'Sin empresa'}
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell textAlign="right">
              {!user.company && (
                <Popup
                  content="El usuario no tiene empresa asignada"
                  trigger={<Icon name="warning sign" color="yellow" />}
                />
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
  onSearchChange: PropTypes.func,
  onSelect: PropTypes.func,
  searchResults: PropTypes.arrayOf(PropTypes.any),
  onCardSearch: PropTypes.func,
};

UserList.defaultProps = {
  onSearchChange: () => {},
  onSelect: () => {},
  searchResults: [],
  onCardSearch: () => {},
};

export default UserList;
