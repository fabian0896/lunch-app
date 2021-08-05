import React from 'react';
import NumberFormat from 'react-number-format';
import { Modal, Image, Button, Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import breakfastSvg from '../../../assets/svg/breakfast.svg';

import './ProductModal.global.css';

const PriceInput = ({ ...props }) => {
  return (
    <NumberFormat
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      thousandSeparator
      prefix="$"
      customInput={Form.Input}
    />
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string('Nombre no valido').required('El nombre es necesario'),
  price: Yup.number('Precio no valido').required('El precio es necesario'),
  image: Yup.string(),
});

const ProductModal = ({ open, onOpen, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      image: '',
    },
    onSubmit: async (values, actions) => {
      values.price = parseInt(values.price, 10);
      await onSubmit(values, actions);
    },
    validationSchema,
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue('image', file.path);
  };

  return (
    <Modal
      open={open}
      onOpen={onOpen}
      closeIcon
      dimmer="blurring"
      size="mini"
      onClose={handleClose}
    >
      <Modal.Header>Crear Plato</Modal.Header>
      <Modal.Content>
        {formik.values.image ? (
          <div className="ProductModal-product-container">
            <img
              className="ProductModal-product-image"
              alt={formik.values.name}
              src={formik.values.image}
            />
          </div>
        ) : (
          <Image
            style={{ marginBottom: '30px' }}
            src={breakfastSvg}
            size="medium"
            centered
            wrapped
          />
        )}
        <Form onSubmit={formik.handleSubmit}>
          <Form.Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            id="name"
            name="name"
            label="Nombre del plato"
            error={!!(formik.touched.name && formik.errors.name)}
          />
          <PriceInput
            onBlur={formik.handleBlur}
            onValueChange={({ value }) => formik.setFieldValue('price', value)}
            value={formik.values.price}
            id="price"
            name="price"
            label="Precio"
            error={!!(formik.touched.price && formik.errors.price)}
          />

          <Form.Field>
            {formik.values.image ? (
              <Button
                size="small"
                icon="close"
                labelPosition="right"
                content="Quitar Imagen"
                fluid
                onClick={() => formik.setFieldValue('image', '')}
              />
            ) : (
              <Button
                size="large"
                icon="file image"
                labelPosition="right"
                htmlFor="image"
                as="label"
                content="Seleccionar Imagen"
                fluid
              />
            )}
            <input
              hidden
              accept="image/*"
              id="image"
              name="image"
              label="Imagen"
              onChange={handleChangeFile}
              type="file"
            />
          </Form.Field>

          <Form.Button disabled={!formik.isValid} type="submit" positive fluid>
            Crear
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

ProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ProductModal;
