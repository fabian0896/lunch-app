import React from 'react';
import { Form, Select } from 'semantic-ui-react';

const UserForm = () => {
  const optionValue = [
    {
      key: 1,
      value: 1,
      text: 'Almuercitos S.A.S',
    },
    {
      key: 2,
      value: 2,
      text: 'Hoy Se Bebe S.A',
    },
  ];
  return (
    <Form>
      <Form.Input label="Nombre" id="name" name="name" type="text" />
      <Form.Input
        label="Cedula"
        id="identification"
        name="name"
        type="number"
      />
      <Form.Field
        control={Select}
        label="Empresa"
        options={optionValue}
        placeholder="Empreza"
      />
    </Form>
  );
};

export default UserForm;
