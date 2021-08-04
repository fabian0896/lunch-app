import React, { useEffect, useState } from 'react';
import { Header, Button, Divider, Icon } from 'semantic-ui-react';

import { UserModal } from '../../components';
import { database } from '../../services/database';

const Users = () => {
  const [companyList, setCompanyList] = useState([]);

  const getCompaniesList = async () => {
    const { Company } = database();
    const list = await Company.getList(true);
    const formatList = list.map((c) => ({
      key: c.id,
      value: c.id,
      text: c.name,
    }));
    console.log(formatList);
    setCompanyList(formatList);
  };

  useEffect(() => {
    getCompaniesList();
  }, []);

  return (
    <div>
      <UserModal companyOptions={companyList} />
      <Header
        icon="address book"
        size="huge"
        content="Usuarios"
        subheader="Usuarios registrados en el sistema"
      />
      <Button onClick={() => {}} animated="vertical" primary>
        <Button.Content visible>Agregar Usuario</Button.Content>
        <Button.Content hidden>
          <Icon name="add" />
        </Button.Content>
      </Button>
      <Divider />
    </div>
  );
};

export default Users;
