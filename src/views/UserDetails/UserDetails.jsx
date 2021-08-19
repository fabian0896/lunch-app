import { startCase } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';

import {
  UserHeader,
  UserModal,
  OrderDetails,
  ConfirmModal,
} from '../../components';
import { database } from '../../services/database';

const UserDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
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

  const getUserData = async () => {
    const { User } = database();
    const result = await User.getById(id);
    setUser(result);
  };

  useEffect(() => {
    getUserData();
    getCompaniesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleEditUser = async (value) => {
    const { User } = database();
    await User.update(user.id, value);
    await getUserData();
    handleCloseModal();
  };

  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    const { User } = database();
    await User.destroy(user);
    history.goBack();
    setDeleteModal(false);
  };

  if (!user) {
    return <div>cargando...</div>;
  }

  return (
    <div>
      <ConfirmModal
        title="Borrar usuario"
        message={`Esta segur@ que desea eliminar el usuario ${startCase(
          user.name
        )}. Los datos no se podran recuperar`}
        open={deleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
      <UserModal
        onSubmit={handleEditUser}
        editData={user}
        open={openModal}
        companyOptions={companyList}
        onClose={handleCloseModal}
        onOpen={handleOpenModal}
      />
      <UserHeader
        onDelete={handleOpenDeleteModal}
        onEdit={handleOpenModal}
        onGoBack={handleGoBack}
        user={user}
      />
      <Divider style={{ margin: '30px 0' }} horizontal>
        Compras
      </Divider>
      <OrderDetails />
      <OrderDetails />
      <OrderDetails />
      <OrderDetails />
      <OrderDetails />
    </div>
  );
};

export default UserDetails;
