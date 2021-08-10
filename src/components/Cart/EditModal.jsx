import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Form, Icon } from 'semantic-ui-react';
import NumberFormat from 'react-number-format';

import hamburguerSvg from '../../../assets/svg/hamburger.svg';

const EditModal = ({ open, product, onClose }) => {
  const editModalRef = useRef();

  useEffect(() => {
    if (open) {
      editModalRef.current.classList.add('open');
    } else {
      editModalRef.current.classList.remove('open');
    }
  }, [open]);

  const handleClose = () => {
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
        <Header textAlign="center" content="Almuerzo simple" />
        <Form>
          <NumberFormat
            id="price"
            label="Precio"
            name="price"
            prefix="$"
            thousandSeparator
            customInput={Form.Input}
          />
          <Form.Group widths="equal">
            <Form.Button fluid icon="minus" />
            <Form.Field>
              <input style={{ textAlign: 'center' }} />
            </Form.Field>
            <Form.Button fluid icon="add" />
          </Form.Group>
          <Form.Button negative fluid>
            Editar producto
          </Form.Button>
        </Form>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool,
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func,
};

EditModal.defaultProps = {
  open: false,
  onClose: () => {},
};

export default EditModal;
