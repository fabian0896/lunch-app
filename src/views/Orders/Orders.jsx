import React, { useEffect, useState, useRef } from 'react';
import { Header, Divider } from 'semantic-ui-react';

import { OrdersList } from '../../components';
import { database } from '../../services/database';

import './Orders.global.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const nextFunc = useRef();
  const getAllOrders = async () => {
    const { Order } = database();
    const { data: resOrders, next } = await Order.getAll(5);
    nextFunc.current = next;
    setOrders(resOrders);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div>
      <Header
        size="huge"
        icon="cart"
        content="Ventas"
        subheader="Lista de todas las ventas realizads"
      />
      <Divider />
      <OrdersList initOrders={orders} onNext={nextFunc.current} />
    </div>
  );
};

export default Orders;
