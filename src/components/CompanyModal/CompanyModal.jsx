import React from 'react';
import { Modal, Image, Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import addTaskSvg from '../../../assets/svg/add_tasks.png';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es necesario'),
});

const CompanyModal = ({ open, onClose, onOpen, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values, actions) => {
      await onSubmit(values, actions);
      actions.resetForm();
    },
    validationSchema,
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal
      closeIcon
      dimmer="blurring"
      onOpen={onOpen}
      onClose={handleClose}
      open={open}
      size="mini"
    >
      <Modal.Header>Agrega una empresa</Modal.Header>
      <Modal.Content>
        <Image
          style={{ marginBottom: '15px' }}
          size="medium"
          centered
          wrapped
          src={addTaskSvg}
        />
        <Form onSubmit={formik.handleSubmit}>
          <Form.Input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="name"
            name="name"
            label="Nombre"
            placeholder="nombre"
            error={!!(formik.touched.name && formik.errors.name)}
          />
          <Button
            disabled={!formik.isValid}
            fluid
            labelPosition="right"
            type="submit"
            positive
            icon="checkmark"
            content="Agregar"
          />
        </Form>
      </Modal.Content>
    </Modal>
  );
};

CompanyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CompanyModal;
