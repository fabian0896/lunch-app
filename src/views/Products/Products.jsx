import React, { useState } from 'react';
import { Header, Button, Divider, Icon } from 'semantic-ui-react';

import { ProductModal } from '../../components';

const Products = () => {
  const [openProductModal, setOpenProductModal] = useState(false);

  const handleOpenProductModal = () => {
    setOpenProductModal(true);
  };

  const handleCloseProductModal = () => {
    setOpenProductModal(false);
  };

  const handleSubmit = async (values) => {
    setOpenProductModal(false);
  };

  return (
    <div>
      <ProductModal
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
    </div>
  );
};

export default Products;
