import React, { useEffect, useState } from 'react';
import { Header, Divider } from 'semantic-ui-react';

import { OrderDetails } from '../../components';

import './Orders.global.css';

const Orders = () => {
  return (
    <div>
      <Header
        size="huge"
        icon="cart"
        content="Ventas"
        subheader="Lista de todas las ventas realizads"
      />
      <Divider />
      <OrderDetails />
      <OrderDetails />
      <OrderDetails />
      <OrderDetails />
    </div>
  );
};

export default Orders;
