import React from 'react';
import PropTypes from 'prop-types';
import { Header, Divider, Image } from 'semantic-ui-react';
import numeral from 'numeral';
import clsx from 'clsx';

import './CartItem.global.css';

const CartItem = ({ product, onClick, className }) => {
  const handleClick = () => {
    onClick(product);
  };
  return (
    <div className={clsx('CartItem', className)}>
      <button
        onClick={handleClick}
        type="button"
        className="CartItem-container"
      >
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
      </button>
      <Divider />
    </div>
  );
};

CartItem.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

CartItem.defaultProps = {
  onClick: () => {},
  className: '',
};

export default CartItem;
