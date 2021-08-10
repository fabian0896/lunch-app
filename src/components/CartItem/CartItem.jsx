import React from 'react';
import PropTypes from 'prop-types';
import { Header, Divider, Image } from 'semantic-ui-react';
import numeral from 'numeral';

import './CartItem.global.css';

const CartItem = ({ product }) => {
  return (
    <div className="CartItem">
      <div className="CartItem-container">
        <Header
          className="CartItem-header-container"
          content={product.name}
          subheader={numeral(
            product.details.price * product.details.quantity
          ).format('$0,0')}
        />
        <div className="CartItem-image-conatiner">
          <Image className="CartItem-image" src={product.image} />
          <span className="CartItem-quantity">{product.details.quantity}</span>
        </div>
      </div>
      <Divider />
    </div>
  );
};

CartItem.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CartItem;
