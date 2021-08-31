import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, Transition } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { OrderDetails } from '..';

import emptySvg from '../../../assets/svg/empty.png';

const OrdersList = ({ initOrders, onNext, onUserClick, onDelete }) => {
  const [hasMore, setHasMore] = useState(true);
  const [orders, setOrders] = useState(initOrders);

  const handleNext = async () => {
    const { data } = await onNext();
    console.log('ejecuntando el next', data);
    setOrders((o) => [...o, ...data]);
    if (!data.length) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setOrders(initOrders);
  }, [initOrders]);

  return (
    <div>
      {!!orders.length && (
        <InfiniteScroll
          endMessage={<p style={{ textAlign: 'center' }}>No hay más pedidos</p>}
          dataLength={orders.length}
          next={handleNext}
          hasMore={hasMore}
          scrollableTarget="layout-content"
          loader={<h4>Cargando...</h4>}
        >
          <Transition.Group animation="zoom" duration={200}>
            {orders.map((order) => (
              <OrderDetails
                onDelete={onDelete}
                onUserClick={onUserClick}
                key={order.id}
                order={order}
              />
            ))}
          </Transition.Group>
        </InfiniteScroll>
      )}
      {!orders.length && <Image src={emptySvg} size="large" centered />}
    </div>
  );
};

OrdersList.propTypes = {
  initOrders: PropTypes.arrayOf(PropTypes.any).isRequired,
  onNext: PropTypes.func,
  onUserClick: PropTypes.func,
  onDelete: PropTypes.func,
};

OrdersList.defaultProps = {
  onNext: () => {},
  onUserClick: () => {},
  onDelete: () => {},
};

export default OrdersList;
