import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Divider, Image, Transition } from 'semantic-ui-react';
import numeral from 'numeral';

import CartItem from '../CartItem';

import './Cart.global.css';

import emptySvg from '../../../assets/svg/empty.png';
import EditModal from './EditModal';

const Cart = ({ products, onChange, onPay }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);

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

  const handleProductSelected = (product) => {
    setSelected(product);
    setOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelected(false);
  };

  const handleEditProduct = (editProduct) => {
    const newProducts = [...products];
    const editIndex = newProducts.findIndex(
      (p) => p.cartId === editProduct.cartId
    );
    if (editIndex === -1) return;
    newProducts[editIndex].details.quantity = editProduct.quantity;
    newProducts[editIndex].details.price = editProduct.price;
    onChange(newProducts);
    handleCloseEditModal();
  };

  const handleDeleteProduct = (deletedProduct) => {
    const newProducts = [...products];
    const deletedIndex = newProducts.findIndex(
      (p) => p.cartId === deletedProduct.cartId
    );
    newProducts.splice(deletedIndex, 1);
    onChange(newProducts);
  };

  const handlePay = () => {
    onPay(products);
  };

  return (
    <div className="Cart">
      <EditModal
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
        onClose={handleCloseEditModal}
        product={selected}
        open={open}
      />
      <Header
        className="Cart-header"
        size="large"
        content="Pedido"
        subheader="Lista de productos"
        icon="shopping bag"
      />
      <div
        style={{ flex: products.length ? 1 : '' }}
        className="Cart-product-list"
      >
        <Transition.Group animation="fly left" duration={300}>
          {products.map((product) => (
            <CartItem
              onClick={handleProductSelected}
              key={product.cartId}
              product={product}
            />
          ))}
        </Transition.Group>
      </div>
      {!products.length && (
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
        <Button onClick={handlePay} disabled={!products.length} fluid primary>
          Pagar pedido
        </Button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
  onChange: PropTypes.func,
  onPay: PropTypes.func,
};

Cart.defaultProps = {
  onChange: () => {},
  onPay: () => {},
};

export default Cart;
