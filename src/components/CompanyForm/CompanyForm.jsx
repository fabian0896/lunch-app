import React, { useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { ipcRenderer } from 'electron';

const CompanyForm = () => {
  useEffect(() => {
    async function asyncFun() {
      const result = await ipcRenderer.invoke('message');
      // eslint-disable-next-line no-console
      console.log(result);
    }
    asyncFun();
  }, []);
  return (
    <Form>
      <Form.Input id="name" name="name" label="Nombre" />
      <Button type="submit" primary>
        Guardar
      </Button>
    </Form>
  );
};

export default CompanyForm;
