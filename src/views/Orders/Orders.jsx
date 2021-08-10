import React, { useEffect, useState } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { ProductCard, CartItem, Cart } from '../../components';
import { database } from '../../services/database';

const Orders = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    console.log(product);
    let newCart = [...cart];
    const productIndex = cart.findIndex((p) => p.id === product.id);
    if (productIndex !== -1) {
      newCart[productIndex].details.quantity += product.details.quantity;
    } else {
      newCart = [...newCart, product];
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

  return (
    <div>
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
          <Cart products={cart} />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Orders;
