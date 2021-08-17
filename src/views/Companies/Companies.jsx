import React, { useEffect, useState } from 'react';
import { Button, Header, Icon, Divider } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { database } from '../../services/database';
import { CompanyModal, CompanyList, ConfirmModal } from '../../components';

const Companies = () => {
  const [openModal, setOpenModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});

  const history = useHistory();

  const getCompanies = async () => {
    const { Company } = database();
    const results = await Company.getListWithUsers(true);
    console.log(results);
    setCompanies(results);
  };

  const handleDelete = async (companyId) => {
    const { Company } = database();
    await Company.destroy(companyId);
    await getCompanies();
  };

  const handleUpdate = async (companyId, values) => {
    const { Company } = database();
    await Company.update(companyId, values);
    await getCompanies();
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

  const handleOpenConfirm = (companyId) => {
    const company = companies.find((c) => c.id === companyId);
    setSelectedCompany(company);
    setOpenConfirmModal(true);
  };

  const handleConfirmModal = async () => {
    if (!selectedCompany.id) return;
    await handleDelete(selectedCompany.id);
    setSelectedCompany({});
    setOpenConfirmModal(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirmModal(false);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const handleSeeDatails = ({ id }) => {
    history.push(`/users/${id}`);
  };

  return (
    <div>
      <ConfirmModal
        title="Eliminar Empresa"
        message={`Esta seguro que desea eliminar la empresa ${selectedCompany.name}?`}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmModal}
        open={openConfirmModal}
      />
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
      <Divider />
      {companies.map((company) => (
        <CompanyList
          onSeeDatails={handleSeeDatails}
          onUpdate={handleUpdate}
          onDelet={handleOpenConfirm}
          key={company.id}
          company={company}
        />
      ))}
    </div>
  );
};

export default Companies;
