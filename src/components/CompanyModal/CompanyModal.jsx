import React from 'react';
import { Modal, Image, Header, Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import SvgImage from '../../../assets/svg/add_tasks.svg';

const CompanyModal = ({ open, onClose, onOpen, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values, actions) => {
      await onSubmit(values, actions);
      actions.resetForm();
    },
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
      onClose={onClose}
      open={open}
      size="mini"
    >
      <Modal.Header>Agrega una empresa</Modal.Header>
      <Modal.Content>
        <Image
          style={{ marginBottom: '15px' }}
          size="small"
          centered
          wrapped
          src={SvgImage}
        />
        <Form onSubmit={formik.handleSubmit}>
          <Form.Input
            value={formik.values.name}
            onChange={formik.handleChange}
            id="name"
            name="name"
            label="Nombre"
            placeholder="nombre"
          />
          <Button
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
