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
    const { data: resOrders, next } = await Order.getAll(4);
    nextFunc.current = next;
    console.log(resOrders);
    setOrders(resOrders);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleNext = async () => {
    console.log('ejecuntando el next');
    const { data } = await nextFunc.current();
    setOrders((o) => [...o, ...data]);
  };

  return (
    <div>
      <Header
        size="huge"
        icon="cart"
        content="Ventas"
        subheader="Lista de todas las ventas realizads"
      />
      <Divider />
      <OrdersList orders={orders} onNext={handleNext} />
    </div>
  );
};

export default Orders;
