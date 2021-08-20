import React, { useEffect, useState } from 'react';
import { Divider, Grid } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';

import {
  ProductCard,
  Cart,
  ReadCardModal,
  SuccessModal,
} from '../../components';
import { database } from '../../services/database';

import './Home.global.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [favProducts, setFavProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectUser, setSelectUser] = useState(null);
  const [payModal, setPayModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

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
    const favReslut = await Product.getFavorites(true);
    setProducts(reslut);
    setFavProducts(favReslut);
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

  const handleUserSelect = async (user) => {
    // aqui tengo que verificar si hay algun error
    // puede que el usuario no exista o que no este activo
    const { Order } = database();
    await Order.create(user, cart);
    setPayModal(false);
    setCart([]);
    setSelectUser(user);
    setSuccessModal(true);
    setTimeout(setSuccessModal, 1800, false);
    setTimeout(setSelectUser, 1800, null);
  };

  return (
    <div>
      <SuccessModal
        open={successModal}
        title="Pago realizado correcatamente"
        subtitle="El pago se agrego al usuario de una forma exitosa"
        user={selectUser}
      />
      <ReadCardModal
        onUserSelect={handleUserSelect}
        products={cart}
        onCancel={handleCancelPay}
        open={payModal}
      />
      <Grid>
        <Grid.Column className="Orders-products-container" width={10}>
          {!!favProducts.length && (
            <>
              <Divider horizontal>Favoritos</Divider>
              <Grid columns={2}>
                {favProducts.map((product) => (
                  <Grid.Column key={product.id}>
                    <ProductCard
                      onAddCart={handleAddToCart}
                      product={product}
                    />
                  </Grid.Column>
                ))}
              </Grid>
            </>
          )}
          <Divider style={{ marginTop: '35px' }} horizontal>
            Todos los productos
          </Divider>
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

export default Home;
