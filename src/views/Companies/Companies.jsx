import React, { useEffect, useState } from 'react';
import { Button, Header, Icon } from 'semantic-ui-react';
import { database } from '../../services/database';
import { CompanyModal } from '../../components';

const Companies = () => {
  const [openModal, setOpenModal] = useState(false);

  const getCompanies = async () => {
    const { Company } = database();
    const results = await Company.getList(true);
    console.log(results);
  };

  const addCompany = async (values) => {
    const { Company } = database();
    await Company.create(values);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleSubmit = async (values) => {
    await addCompany(values);
    await getCompanies();
    handleCloseModal();
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div>
      <CompanyModal
        onClose={handleCloseModal}
        onOpen={handleOpenModal}
        onSubmit={handleSubmit}
        open={openModal}
      />
      <Header
        icon="building"
        size="huge"
        content="Empresas"
        subheader="Empresas que estan asociadas en el sistema"
      />
      <Button onClick={handleOpenModal} animated="vertical" primary>
        <Button.Content visible>Agregar Empresa</Button.Content>
        <Button.Content hidden>
          <Icon name="add" />
        </Button.Content>
      </Button>
    </div>
  );
};

export default Companies;
