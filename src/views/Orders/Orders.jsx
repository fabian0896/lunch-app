import React, { useEffect, useState, useRef } from 'react';
import { Header, Divider } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { startCase } from 'lodash';
import { ipcRenderer } from 'electron';

import format from 'date-fns/format';
import es from 'date-fns/locale/es';
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

  const handleSubmitReport = async (values) => {
    if (!navigator.onLine) {
      throw new Error(
        'Para poder generar el reporte es necesario una conexión a interner'
      );
    }
    const { dateRange, path } = values;
    const dateRangeFormat = dateRange.map((d) => {
      return format(d, "dd 'de' MMMM 'del' yyyy", {
        locale: es,
      });
    });
    const { Company } = database();
    const data = await Company.getReportData(dateRange);
    try {
      await ipcRenderer.invoke(
        'generate-report-online',
        dateRangeFormat,
        path,
        data
      );
    } catch (err) {
      throw new Error(
        'Algo salio mal con el servidor :( Por favor revisa si hay conexión a internet y vuelve a intentarlo'
      );
    }
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
      <CustomDatePicker onSubmit={handleSubmitReport} />
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
