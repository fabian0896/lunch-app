import React from 'react';
import { Modal, Image, Form, Divider, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import RfidCard from '../RfidCard';

import rfidCardSvg from '../../../assets/svg/plain_credit_card.svg';

const ReadCardModal = ({ open, onCancel, products }) => {
  const getTotalPrice = () => {
    const total = products.reduce(
      (sum, p) => sum + p.details.price * p.details.quantity,
      0
    );
    return numeral(total).format('$0,0');
  };

  return (
    <Modal
      dimmer="blurring"
      onClose={onCancel}
      closeIcon
      open={open}
      size="mini"
    >
      <Modal.Content>
        <Image centered size="medium" src={rfidCardSvg} />
        <Header
          textAlign="center"
          size="large"
          content={getTotalPrice()}
          subheader="Precio total"
        />
        <RfidCard />
        <Divider />
        <Form>
          <Form.Input label="Nombre" name="name" id="name" fluid />
          <Form.Button positive fluid>
            Agregar pedido al cliente
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

ReadCardModal.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
};
ReadCardModal.defaultProps = {
  open: false,
  onCancel: () => {},
};

export default ReadCardModal;
