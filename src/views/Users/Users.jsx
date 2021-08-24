import React, { useEffect, useState } from 'react';
import { Header, Button, Divider, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import { UserModal, UserList, SearchUserCardModal } from '../../components';
import { database } from '../../services/database';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [searchModal, setSearchModal] = useState(false);
  const [cardSearchError, setCardSearchError] = useState(false);

  const history = useHistory();

  const getAllUsers = async () => {
    const { User } = database();
    const respUsers = await User.getAll(true);
    setUsers(respUsers);
  };

  const getCompaniesList = async () => {
    const { Company } = database();
    const list = await Company.getList(true);
    const formatList = list.map((c) => ({
      key: c.id,
      value: c.id,
      text: c.name,
    }));
    setCompanyList(formatList);
  };

  const handleCloseUserModal = () => {
    setOpenUserModal(false);
  };

  const handleOpenUserModal = () => {
    setOpenUserModal(true);
  };

  useEffect(() => {
    getAllUsers();
    getCompaniesList();
  }, []);

  const handleCreateUser = async (values) => {
    const { User } = database();
    const result = await User.create(values);
    const { _id: id } = result;
    const avatar = ipcRenderer.sendSync('generate-avatar', id);
    await User.update(id, { avatar });
    handleCloseUserModal();
    await getAllUsers();
  };

  const handleSearchChange = async (e, data) => {
    const { User } = database();
    const results = await User.searchByName(data.value);
    setSearchResults(results);
  };

  const goToUser = (id) => {
    history.push(`/users/${id}`);
  };

  const handleCloseSearchModal = () => {
    setSearchModal(false);
    setCardSearchError(false);
  };

  const handleOpenSearchModal = () => {
    setSearchModal(true);
    setCardSearchError(false);
  };

  const handleCardSearchCompleted = async (cardId) => {
    setCardSearchError(false);

    if (!cardId) {
      setCardSearchError('La tarjeta no se leyó correctamente');
      return;
    }
    const { User } = database();
    const user = await User.getByCardId(cardId);

    if (!user) {
      setCardSearchError('La tarjeta no esta vinculada a ningun usuario');
      return;
    }

    const { _id: userId } = user;
    history.push(`/users/${userId}`);
  };

  return (
    <div>
      <SearchUserCardModal
        error={cardSearchError}
        open={searchModal}
        onClose={handleCloseSearchModal}
        onRead={handleCardSearchCompleted}
      />
      <UserModal
        onSubmit={handleCreateUser}
        open={openUserModal}
        onClose={handleCloseUserModal}
        onOpen={handleOpenUserModal}
        companyOptions={companyList}
      />
      <Header
        icon="address book"
        size="huge"
        content="Usuarios"
        subheader="Usuarios registrados en el sistema"
      />
      <Button onClick={handleOpenUserModal} animated="vertical" primary>
        <Button.Content visible>Agregar Usuario</Button.Content>
        <Button.Content hidden>
          <Icon name="add" />
        </Button.Content>
      </Button>
      <Divider />
      <UserList
        onCardSearch={handleOpenSearchModal}
        onSelect={({ id }) => goToUser(id)}
        searchResults={searchResults}
        onSearchChange={handleSearchChange}
        users={users}
      />
    </div>
  );
};

export default Users;
