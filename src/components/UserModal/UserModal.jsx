import React from 'react';
import { Modal, Form, Image, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import RfidCard from '../RfidCard';
import addUserSvg from '../../../assets/svg/profile_pic.svg';

import { database } from '../../services/database';

const UserModal = ({ companyOptions, open, onClose, onOpen, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      company: '',
      cardId: '',
    },
    onSubmit: async (values, actios) => {
      await onSubmit(values);
      actios.resetForm();
    },
    validate: async (values) => {
      const { User } = database();
      const errors = {};
      const user = await User.getByCardId(values.cardId);
      if (user) {
        errors.cardId = 'La tarjeta ya esta registrada en el sistema';
      }
      return errors;
    },
  });
  return (
    <Modal
      closeIcon
      dimmer="blurring"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      size="mini"
    >
      <Modal.Content>
        <Image centered size="small" wrapped src={addUserSvg} />
        <Form error={!!formik.errors.cardId} onSubmit={formik.handleSubmit}>
          <Form.Input
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            id="name"
            label="Nombre"
          />
          {false && (
            <Form.Input
              type="number"
              name="identification"
              id="identification"
              label="Cedula"
            />
          )}
          <Form.Dropdown
            value={formik.values.company}
            onChange={(event, { value }) =>
              formik.setFieldValue('company', value)
            }
            selection
            search
            options={companyOptions}
            id="company"
            label="Empresa"
            name="company"
          />
          <RfidCard
            error={formik.errors.cardId}
            onChange={(value) => formik.setFieldValue('cardId', value)}
          />
          <Form.Button disabled={!formik.isValid} type="submit" fluid positive>
            Agregar usuario
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

UserModal.propTypes = {
  companyOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

UserModal.defaultProps = {
  onSubmit: () => {},
};

export default UserModal;
