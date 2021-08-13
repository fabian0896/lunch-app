import React, { useEffect } from 'react';
import { Modal, Form, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { startCase } from 'lodash';
import * as Yup from 'yup';
import RfidCard from '../RfidCard';
import addUserSvg from '../../../assets/svg/profile_pic.svg';

import { database } from '../../services/database';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  company: Yup.number().required(),
  cardId: Yup.string().required(),
});

const UserModal = ({
  companyOptions,
  open,
  onClose,
  onOpen,
  onSubmit,
  editData,
}) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      company: '',
      cardId: '',
    },
    validationSchema,
    onSubmit: async (values, actios) => {
      await onSubmit(values);
      actios.resetForm();
    },
    validate: async (values) => {
      const errors = {};
      if (editData) return errors;
      const { User } = database();
      const user = await User.getByCardId(values.cardId);
      if (user) {
        errors.cardId = 'La tarjeta ya esta registrada en el sistema';
      }
      return errors;
    },
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
      return;
    }
    if (editData) {
      formik.setValues({
        name: startCase(editData.name),
        company: editData.companyId,
        cardId: editData.cardId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editData]);

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
          <p style={{ textAlign: 'center' }}>
            <strong>Tarjeta</strong> : {formik.values.cardId || 'Sin lectura'}
          </p>
          <Form.Button disabled={!formik.isValid} type="submit" fluid positive>
            {!editData ? 'Agregar usuario' : 'Editar Usuario'}
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
  editData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

UserModal.defaultProps = {
  onSubmit: () => {},
  editData: false,
};

export default UserModal;
