import React from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Divider, Image } from 'semantic-ui-react';
import numeral from 'numeral';

import CartItem from '../CartItem';

import './Cart.global.css';

import emptySvg from '../../../assets/svg/empty_red.svg';

const Cart = ({ products }) => {
  const getTotalPrice = () => {
    const totalPrice = products.reduce(
      (sum, p) => p.details.price * p.details.quantity + sum,
      0
    );
    return numeral(totalPrice).format('$0,0');
  };

  const getTotalProducts = () => {
    return products.reduce((sum, p) => p.details.quantity + sum, 0);
  };

  return (
    <div className="Card">
      <Header
        className="Cart-header"
        size="large"
        content="Pedido"
        subheader="Lista de productos"
        icon="shopping bag"
      />
      {products.length ? (
        <div className="Cart-product-list">
          {products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="Cart-product-empty">
          <Image src={emptySvg} />
          <Header
            textAlign="center"
            content="Sin productos"
            subheader="Selecciona algunos productos para agregar al pedido"
          />
        </div>
      )}
      <div className="Cart-actions">
        <div className="resume">
          <p>Total productos</p>
          <h3>{getTotalProducts()}</h3>
        </div>
        <div className="resume">
          <p>Precio total</p>
          <h3>{getTotalPrice()}</h3>
        </div>
        <Divider />
        <Button disabled={!products.length} fluid negative>
          Pagar pedido
        </Button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Cart;
