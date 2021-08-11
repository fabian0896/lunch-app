import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Form, Icon } from 'semantic-ui-react';
import NumberFormat from 'react-number-format';
import { useFormik } from 'formik';

import hamburguerSvg from '../../../assets/svg/hamburger.svg';

const EditModal = ({ product, onClose, onEdit, onDelete }) => {
  const editModalRef = useRef();

  const formik = useFormik({
    initialValues: {
      price: 0,
      quantity: 0,
    },
    onSubmit: (values, actions) => {
      onEdit({
        cartId: product.cartId,
        price: parseInt(values.price, 10),
        quantity: parseInt(values.quantity, 10),
      });
      actions.resetForm();
    },
  });

  useEffect(() => {
    if (!product) {
      editModalRef.current.classList.remove('open');
      formik.resetForm();
      return;
    }
    formik.setValues({
      price: product.details.price,
      quantity: product.details.quantity,
    });
    editModalRef.current.classList.add('open');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleClose = () => {
    onClose();
  };

  const handleAddQuantity = () => {
    const { quantity } = formik.values;
    formik.setFieldValue('quantity', quantity + 1);
  };
  const handleRemoveQuantity = () => {
    const { quantity } = formik.values;
    formik.setFieldValue('quantity', quantity - 1);
  };

  const handleDelete = () => {
    onDelete(product);
    formik.resetForm();
    onClose();
  };

  return (
    <div ref={editModalRef} className="EditModal-modal">
      <div className="EditModal-modal-content">
        <Icon
          onClick={handleClose}
          name="close"
          className="EditModal-modal-close-icon"
        />
        <Image src={hamburguerSvg} />
        <Header textAlign="center" content={product?.name} />
        <Form onSubmit={formik.handleSubmit}>
          <NumberFormat
            value={formik.values.price}
            onValueChange={({ value }) => formik.setFieldValue('price', value)}
            id="price"
            label="Precio unitario"
            name="price"
            prefix="$"
            thousandSeparator
            customInput={Form.Input}
          />
          <Form.Group widths="equal">
            <Form.Button
              onClick={
                formik.values.quantity <= 1
                  ? handleDelete
                  : handleRemoveQuantity
              }
              type="button"
              fluid
              negative={formik.values.quantity <= 1}
              icon={formik.values.quantity > 1 ? 'minus' : 'trash'}
            />
            <Form.Field>
              <input
                id="quantity"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                style={{ textAlign: 'center' }}
              />
            </Form.Field>
            <Form.Button
              onClick={handleAddQuantity}
              type="button"
              fluid
              icon="add"
            />
          </Form.Group>
          <Form.Button type="submit" primary fluid>
            Editar producto
          </Form.Button>
        </Form>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  product: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  onClose: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

EditModal.defaultProps = {
  onClose: () => {},
  onEdit: () => {},
  onDelete: () => {},
};

export default EditModal;
