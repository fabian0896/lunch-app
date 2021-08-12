import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Dimmer, Form, Icon } from 'semantic-ui-react';
import clsx from 'clsx';
import numeral from 'numeral';
import { useFormik } from 'formik';
import NumberFormat from 'react-number-format';

import './ProductCard.global.css';

import hamburgerSvg from '../../../assets/svg/hamburger.svg';

const ProductCard = ({ product, onDelete, onEdit, onAddCart, onFav }) => {
  const [active, setActive] = useState(false);
  const formik = useFormik({
    initialValues: {
      price: product.price,
      quantity: 1,
    },
    onSubmit: (values, actions) => {
      onAddCart({
        ...product,
        details: {
          quantity: parseInt(values.quantity, 10),
          price: parseInt(values.price, 10),
        },
      });
      actions.resetForm();
    },
  });

  const handleCloseDimmer = () => {
    formik.resetForm();
    setActive(false);
  };

  const handleAddQuantity = () => {
    const quantity = formik.values.quantity + 1;
    formik.setFieldValue('quantity', quantity);
  };
  const handleReduceQuantity = () => {
    const quantity = formik.values.quantity - 1;
    formik.setFieldValue('quantity', quantity);
  };

  const handleFav = () => {
    onFav(product);
  };

  return (
    <Card style={{ overflow: 'hidden' }} className="ProductCard">
      {onFav && (
        <Icon
          onClick={handleFav}
          color="red"
          size="large"
          name={product.favorite ? 'heart' : 'heart outline'}
          className="ProductCard-start-fav"
        />
      )}
      <Dimmer.Dimmable
        onMouseLeave={handleCloseDimmer}
        onMouseEnter={() => setActive(true)}
        blurring
        dimmed={active && !!onAddCart}
      >
        <div className="ProductCard-image-container">
          <img
            className={clsx('ProductCard-image', {
              'no-image': !product.image,
            })}
            src={product.image || hamburgerSvg}
            alt={product.name}
          />
        </div>
        <Dimmer active={active && !!onAddCart}>
          {onAddCart && (
            <div>
              <Form onSubmit={formik.handleSubmit} size="small">
                <NumberFormat
                  thousandSeparator
                  prefix="$"
                  name="price"
                  value={formik.values.price}
                  onValueChange={({ value }) =>
                    formik.setFieldValue('price', value)
                  }
                  customInput={Form.Input}
                />
                <Form.Group widths="equal">
                  <Form.Button
                    disabled={formik.values.quantity <= 1}
                    onClick={handleReduceQuantity}
                    type="button"
                    fluid
                    icon="minus"
                  />
                  <Form.Field>
                    <input
                      name="quantity"
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                      type="text"
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
                  Agregar
                </Form.Button>
              </Form>
            </div>
          )}
        </Dimmer>
      </Dimmer.Dimmable>
      <Card.Content>
        <Card.Header>{product.name}</Card.Header>
        <Card.Meta>{numeral(product.price).format('$0,0')}</Card.Meta>
      </Card.Content>
      {(onDelete || onEdit) && (
        <Card.Content extra>
          <Button.Group fluid>
            {onEdit && <Button onClick={onEdit} secondary content="Editar" />}
            {onDelete && (
              <Button onClick={onDelete} negative content="Eliminar" />
            )}
          </Button.Group>
        </Card.Content>
      )}
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  onEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onAddCart: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onFav: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

ProductCard.defaultProps = {
  onEdit: false,
  onDelete: false,
  onAddCart: false,
  onFav: false,
};

export default ProductCard;
