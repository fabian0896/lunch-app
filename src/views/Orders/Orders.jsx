import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';

import { ProductCard, Cart, ReadCardModal } from '../../components';
import { database } from '../../services/database';

const Orders = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [payModal, setPayModal] = useState(false);

  const addToCart = (product) => {
    let newCart = [...cart];
    const productIndex = cart.findIndex(
      (p) => p.id === product.id && p.details.price === product.details.price
    );
    if (productIndex !== -1) {
      newCart[productIndex].details.quantity += product.details.quantity;
    } else {
      newCart = [
        ...newCart,
        {
          ...product,
          cartId: uuidv4(),
        },
      ];
    }
    setCart(newCart);
  };

  const getAllProducts = async () => {
    const { Product } = database();
    const reslut = await Product.getAll(true);
    setProducts(reslut);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleChangeCart = (newProducts) => {
    setCart(newProducts);
  };

  const hanldlePay = () => {
    setPayModal(true);
  };

  const handleCancelPay = () => {
    setPayModal(false);
  };

  return (
    <div>
      <ReadCardModal
        products={cart}
        onCancel={handleCancelPay}
        open={payModal}
      />
      <Grid>
        <Grid.Column width={10}>
          <Grid columns={2}>
            {products.map((product) => (
              <Grid.Column key={product.id}>
                <ProductCard onAddCart={handleAddToCart} product={product} />
              </Grid.Column>
            ))}
          </Grid>
        </Grid.Column>
        <Grid.Column width={6}>
          <Cart
            onPay={hanldlePay}
            onChange={handleChangeCart}
            products={cart}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Orders;
