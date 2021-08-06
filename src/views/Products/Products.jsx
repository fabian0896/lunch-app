/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Header, Button, Divider, Icon, Grid } from 'semantic-ui-react';
import { database } from '../../services/database';
import { ProductModal, ProductCard, ConfirmModal } from '../../components';

const Products = () => {
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const { Product } = database();
    const reslut = await Product.getAll(true);
    console.log(reslut);
    setProducts(reslut);
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
      <Divider />
      <Grid columns={3}>
        {products.map((product) => (
          <Grid.Column key={product.id}>
            <ProductCard
              onEdit={() => hanleEditProduct(product)}
              onDelete={() => handleOpenConfirmModal(product)}
              product={product}
            />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
