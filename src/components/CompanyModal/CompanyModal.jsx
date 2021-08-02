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
    <Modal onOpen={onOpen} onClose={onClose} open={open} size="small">
      <Modal.Header>Agrega una empresa</Modal.Header>
      <Modal.Content image>
        <Image size="medium" wrapped src={SvgImage} />
        <Modal.Description>
          <Header>Datos</Header>
          <p>Introduce el nombre de una nueva empresa</p>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Input
              value={formik.values.name}
              onChange={formik.handleChange}
              id="name"
              name="name"
              label="Nombre"
              placeholder="nombre"
              action={
                <Button
                  labelPosition="right"
                  type="submit"
                  positive
                  icon="checkmark"
                  content="Agregar"
                />
              }
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={handleClose}
          content="cancelar"
          icon="times"
          labelPosition="right"
        />
      </Modal.Actions>
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
