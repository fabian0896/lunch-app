import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { Modal, Image, Button, Form, Message } from 'semantic-ui-react';
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

const ProductModal = ({ open, onOpen, onClose, onSubmit, editValues }) => {
  const [imageError, setImageError] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      image: '',
    },
    onSubmit: async (values, actions) => {
      values.price = parseInt(values.price, 10);
      try {
        await onSubmit(values, actions);
        actions.resetForm();
      } catch (err) {
        setImageError(
          'Se presento un error comprimiendo la imagen, intenta nuevamente o selecciona otra imagen'
        );
      }
    },
    validationSchema,
  });

  const handleClose = () => {
    formik.resetForm();
    setImageError(false);
    onClose();
  };

  const handleChangeFile = (e) => {
    setImageError(false);
    const file = e.target.files[0];
    formik.setFieldValue('image', file.path);
  };

  useEffect(() => {
    if (!open) {
      formik.resetForm();
      setImageError(false);
      return;
    }
    if (!editValues) {
      formik.resetForm();
      setImageError(false);
      return;
    }
    formik.setValues(editValues);
    setImageError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editValues, open]);

  const handleRemoveImage = () => {
    setImageError(false);
    formik.setFieldValue('image', '');
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
      <Modal.Header>{editValues ? 'Editar' : 'Crear'} Plato</Modal.Header>
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
        <Form error={imageError} onSubmit={formik.handleSubmit}>
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
                type="button"
                size="small"
                icon="close"
                labelPosition="right"
                content="Quitar Imagen"
                fluid
                onClick={handleRemoveImage}
              />
            ) : (
              <Button
                type="button"
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
              accept=".png, .jpg, .jpeg"
              id="image"
              name="image"
              label="Imagen"
              onChange={handleChangeFile}
              type="file"
            />
          </Form.Field>
          <Message error header="Algo salio mal :(" content={imageError} />
          <Form.Button
            loading={formik.isSubmitting}
            disabled={!formik.isValid || !!imageError}
            type="submit"
            positive
            fluid
          >
            {editValues ? 'Editar' : 'Crear'}
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
  editValues: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
};

export default ProductModal;
