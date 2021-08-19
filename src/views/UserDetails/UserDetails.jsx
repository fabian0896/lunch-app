import { startCase } from 'lodash';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';

import {
  UserHeader,
  UserModal,
  OrdersList,
  ConfirmModal,
} from '../../components';
import { database } from '../../services/database';

const UserDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const nextFunc = useRef();

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
    const { User, Order } = database();
    const resUser = await User.getById(id);
    const { data: resOrders, next } = await Order.getAll(4, resUser);
    nextFunc.current = next;
    setUser(resUser);
    setOrders(resOrders);
  };

  const handleNext = async () => {
    const { data } = await nextFunc.current();
    setOrders((o) => [...o, ...data]);
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
      <OrdersList onNext={handleNext} orders={orders} />
    </div>
  );
};

export default UserDetails;
