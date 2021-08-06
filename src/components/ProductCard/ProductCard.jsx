import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'semantic-ui-react';
import clsx from 'clsx';
import numeral from 'numeral';

import './ProductCard.global.css';

import hamburgerSvg from '../../../assets/svg/hamburger.svg';

const ProductCard = ({ product, onDelete, onEdit }) => {
  return (
    <Card className="ProductCard">
      <div className="ProductCard-image-container">
        <img
          className={clsx('ProductCard-image', {
            'no-image': !product.image,
          })}
          src={product.image || hamburgerSvg}
          alt={product.name}
        />
      </div>
      <Card.Content>
        <Card.Header>{product.name}</Card.Header>
        <Card.Meta>{numeral(product.price).format('$0,0')}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group fluid>
          <Button onClick={onEdit} secondary content="Editar" />
          <Button onClick={onDelete} negative content="Eliminar" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductCard;
