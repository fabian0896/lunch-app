import React from 'react';
import { Header, Icon, Image, Divider, Popup, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { startCase } from 'lodash';
import numeral from 'numeral';

import './OrderDetails.global.css';
import clsx from 'clsx';
import avatarSvg from '../../../assets/svg/profile_pic.png';

const Item = ({ product }) => {
  return (
    <>
      <div className="OrderDetails-product-item">
        <div className="OrderDetails-image-container">
          <span className="OrderDetails-quantity-label">
            {product.details.quantity}
          </span>
          <img src={product.image} alt={product.name} />
        </div>
        <Header
          size="tiny"
          className="OrderDetails-product-header"
          content={product.name}
          subheader={`${numeral(product.details.price).format(
            '$0,0'
          )} por unidad`}
        />
        <div className="OrderDetails-product-item-spacer" />
        <Header
          style={{ color: '#555555' }}
          size="small"
          className="OrderDetails-product-header"
          content={numeral(
            product.details.price * product.details.quantity
          ).format('$0,0')}
        />
      </div>
      <Divider />
    </>
  );
};

Item.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
};

const OrderDetails = ({ order, onUserClick, onDelete, className }) => {
  const getTotal = (products = []) => {
    const value = products.reduce((sum, product) => {
      const total = product.details.price * product.details.quantity;
      return total + sum;
    }, 0);
    return numeral(value).format('$0,0');
  };
  return (
    <div className={className}>
      <div className={clsx('OrderDetails')}>
        <div className="OrderDetails-main-info-container">
          <div className="OrderDetails-header-container">
            <Header
              size="huge"
              subheader={moment(order.createdAt).format(
                'DD/MM/YYYY [a las] h:mm A'
              )}
              content={`Pedido #${String(order.consecutive).padStart(3, '0')}`}
            />
            <Popup
              hoverable
              hideOnScroll
              trigger={
                <Icon style={{ cursor: 'pointer' }} name="ellipsis vertical" />
              }
            >
              <Button
                onClick={() => onDelete(order)}
                negative
                content="Eliminar"
                icon="trash"
              />
            </Popup>
          </div>
          <div className="OrderDetails-user-info">
            <Header style={{ width: '100%', margin: 0 }} size="small" image>
              <Image
                rounded
                style={{ margin: 0 }}
                src={order.user.avatar || avatarSvg}
              />
              <Header.Content
                onClick={() => onUserClick(order.user)}
                className="OrderDetails-user-info-header"
              >
                {startCase(order.user.name)}
                <Header.Subheader>
                  {order.user.company?.name || 'Sin empresa'}
                </Header.Subheader>
              </Header.Content>
            </Header>
          </div>
        </div>
        <div className="OrderDetails-products-info-colum">
          <div className="OrderDetails-products-container">
            {order.products.map((product) => (
              <Item key={product.uniqueId} product={product} />
            ))}
          </div>
          <div className="OrderDetails-footer-info">
            <Header
              style={{ margin: 0 }}
              size="medium"
              textAlign="left"
              subheader="Total de productos"
              content={order.products.reduce(
                (sum, product) => sum + product.details.quantity,
                0
              )}
            />
            <Header
              color="green"
              style={{ margin: 0 }}
              size="medium"
              textAlign="right"
              subheader="Precio total"
              content={getTotal(order.products)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.objectOf(PropTypes.any).isRequired,
  onUserClick: PropTypes.func,
  onDelete: PropTypes.func,
  className: PropTypes.string,
};

OrderDetails.defaultProps = {
  onUserClick: () => {},
  onDelete: () => {},
  className: '',
};

export default OrderDetails;
