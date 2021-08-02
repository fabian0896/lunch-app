import React, { useEffect, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { ipcRenderer } from 'electron';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

const CompanyForm = () => {
  const [companies, setCompanies] = useState([]);

  async function updateList() {
    const results = await ipcRenderer.invoke('getAllCompanies');
    console.log(results);
    setCompanies(results);
  }

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values, actions) => {
      const data = await ipcRenderer.invoke('AddCompany', values);
      console.log(data);
      data.toJSON();
      actions.resetForm();
      updateList();
    },
  });

  useEffect(() => {
    updateList();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        value={formik.values.name}
        onChange={formik.handleChange}
        id="name"
        name="name"
        label="Nombre"
      />
      <Button type="submit" primary>
        Guardar
      </Button>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>{company.name}</li>
        ))}
      </ul>
      <Link to="/bye">Go to bye</Link>
    </Form>
  );
};

export default CompanyForm;
