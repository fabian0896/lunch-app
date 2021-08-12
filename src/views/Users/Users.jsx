import React, { useEffect, useState } from 'react';
import { Header, Button, Divider, Icon } from 'semantic-ui-react';

import { UserModal } from '../../components';
import { database } from '../../services/database';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [openUserModal, setOpenUserModal] = useState(false);

  const getAllUsers = async () => {
    const { User } = database();
    const respUsers = await User.getAll(true);
    setUsers(respUsers);
    console.log(respUsers);
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
    await User.create(values);
    handleCloseUserModal();
    await getAllUsers();
  };

  return (
    <div>
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
    </div>
  );
};

export default Users;
