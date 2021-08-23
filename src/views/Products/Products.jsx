/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import {
  Header,
  Button,
  Divider,
  Icon,
  Grid,
  Transition,
} from 'semantic-ui-react';
import { ipcRenderer } from 'electron';
import { database } from '../../services/database';
import { ProductModal, ProductCard, ConfirmModal } from '../../components';

const Products = () => {
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [favProducts, setFavProducts] = useState([]);

  const getAllProducts = async () => {
    const { Product } = database();
    const reslut = await Product.getAll(true);
    const favoriteResults = await Product.getFavorites(true);
    setProducts(reslut);
    setFavProducts(favoriteResults);
  };

  const handleOpenProductModal = () => {
    setOpenProductModal(true);
  };

  const handleCloseProductModal = () => {
    setOpenProductModal(false);
    setSelectedProduct(false);
  };

  const handleSubmit = async (values) => {
    const { Product } = database();
    if (selectedProduct) {
      await Product.update(selectedProduct.id, values);
    } else {
      values.image = await ipcRenderer.invoke('backup-image', values.image);
      await Product.create(values);
    }
    handleCloseProductModal();
    getAllProducts();
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleOpenConfirmModal = (product) => {
    setSelectedProduct(product);
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setSelectedProduct(false);
  };

  const handleDelete = async () => {
    if (!setSelectedProduct) return;
    const { Product } = database();
    await Product.destroy(selectedProduct.id);
    getAllProducts();
    handleCloseConfirmModal();
  };

  const hanleEditProduct = (product) => {
    setSelectedProduct(product);
    handleOpenProductModal();
  };

  const handleFavorite = async (product) => {
    const { Product } = database();
    await Product.toggleFavorite(product.id);
    await getAllProducts();
  };

  return (
    <div>
      <ConfirmModal
        title="Eliminar Plato"
        message={`Esta seguro que desea eliminar el plato: ${selectedProduct?.name}`}
        onClose={handleCloseConfirmModal}
        onOpen={handleOpenConfirmModal}
        open={openConfirmModal}
        onConfirm={handleDelete}
      />
      <ProductModal
        editValues={selectedProduct}
        onSubmit={handleSubmit}
        onClose={handleCloseProductModal}
        onOpen={handleOpenProductModal}
        open={openProductModal}
      />
      <Header
        icon="utensils"
        size="huge"
        content="Comidas"
        subheader="Menu del restaurante!"
      />
      <Button onClick={handleOpenProductModal} animated="vertical" primary>
        <Button.Content visible>Crear Nuevo Plato</Button.Content>
        <Button.Content hidden>
          <Icon name="add" />
        </Button.Content>
      </Button>
      {!!favProducts.length && (
        <>
          <Divider horizontal>Favoritos</Divider>
          <Grid columns={3}>
            <Transition.Group animation="zoom" duration={200}>
              {favProducts.map((product) => (
                <Grid.Column key={product.id}>
                  <ProductCard
                    onFav={handleFavorite}
                    onEdit={() => hanleEditProduct(product)}
                    onDelete={() => handleOpenConfirmModal(product)}
                    product={product}
                  />
                </Grid.Column>
              ))}
            </Transition.Group>
          </Grid>
        </>
      )}
      <Divider style={{ marginTop: '35px' }} horizontal>
        Todos
      </Divider>
      <Grid columns={3}>
        <Transition.Group animation="zoom" duration={200}>
          {products.map((product) => (
            <Grid.Column key={product.id}>
              <ProductCard
                onFav={handleFavorite}
                onEdit={() => hanleEditProduct(product)}
                onDelete={() => handleOpenConfirmModal(product)}
                product={product}
              />
            </Grid.Column>
          ))}
        </Transition.Group>
      </Grid>
    </div>
  );
};

export default Products;
