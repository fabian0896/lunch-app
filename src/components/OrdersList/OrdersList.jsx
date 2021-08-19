import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { OrderDetails } from '..';

import emptySvg from '../../../assets/svg/empty.svg';

const OrdersList = ({ orders, onNext }) => {
  return (
    <div>
      <InfiniteScroll
        endMessage={<p>No hay más pedidos</p>}
        dataLength={orders.length}
        next={onNext}
        hasMore={!!onNext}
        loader={<h4>Cargando...</h4>}
        height={400}
      >
        {orders.map((order) => (
          <OrderDetails key={order.id} order={order} />
        ))}
      </InfiniteScroll>
      {!orders.length && <Image src={emptySvg} size="large" centered />}
    </div>
  );
};

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.any).isRequired,
  onNext: PropTypes.func,
};

OrdersList.defaultProps = {
  onNext: () => {},
};

export default OrdersList;
