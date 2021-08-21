import React, { useEffect, useState, useRef } from 'react';
import { Header, Divider } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { startCase } from 'lodash';

import { OrdersList, ConfirmModal, CustomDatePicker } from '../../components';
import { database } from '../../services/database';

import './Orders.global.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedOrder, setSelectedORder] = useState(null);
  const nextFunc = useRef();

  const history = useHistory();

  const getAllOrders = async () => {
    const { Order } = database();
    const { data: resOrders, next } = await Order.getAll(5);
    nextFunc.current = next;
    setOrders(resOrders);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleUserClick = ({ _id }) => {
    history.push(`/users/${_id}`);
  };

  const handleDelete = async () => {
    const { Order } = database();
    await Order.destroy(selectedOrder);
    await getAllOrders();
    setConfirmModal(false);
    setSelectedORder(null);
  };

  const handleCloseConfirmModal = () => {
    setSelectedORder(null);
    setConfirmModal(false);
  };

  const handleOpenConfirmModal = (order) => {
    setSelectedORder(order);
    setConfirmModal(true);
  };

  return (
    <div>
      <ConfirmModal
        open={confirmModal}
        title={`Eliminar pedido #${String(selectedOrder?.consecutive).padStart(
          3,
          '0'
        )}`}
        message={`Esta seguro que desea eliminar el pedido #${String(
          selectedOrder?.consecutive
        ).padStart(3, '0')} a nombre de ${startCase(
          selectedOrder?.user.name
        )}. No se podra recuperar.`}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDelete}
      />
      <Header
        size="huge"
        icon="cart"
        content="Ventas"
        subheader="Lista de todas las ventas realizads"
      />
      <CustomDatePicker />
      <Divider />
      <OrdersList
        onUserClick={handleUserClick}
        onDelete={handleOpenConfirmModal}
        initOrders={orders}
        onNext={nextFunc.current}
      />
    </div>
  );
};

export default Orders;
