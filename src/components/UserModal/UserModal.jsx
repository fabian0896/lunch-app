import React from 'react';
import { Modal, Form, Button, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import RfidCard from '../RfidCard';
import addUserSvg from '../../../assets/svg/add_user.svg';

const UserModal = ({ companyOptions }) => {
  return (
    <Modal
      closeIcon
      dimmer="blurring"
      trigger={<Button>Modal</Button>}
      size="mini"
    >
      <Modal.Header>Agregar Usuario</Modal.Header>
      <Modal.Content>
        <Image centered size="small" wrapped src={addUserSvg} />
        <Form>
          <Form.Input name="name" id="name" label="Nombre" />
          <Form.Input
            type="number"
            name="identification"
            id="identification"
            label="Cedula"
          />
          <Form.Dropdown
            // eslint-disable-next-line prettier/prettier
            style={{color: '#000000'}}
            selection
            search
            options={companyOptions}
            id="company"
            label="Empresa"
            name="company"
          />
          <RfidCard />
          <Form.Button type="submit" fluid positive>
            Agregar
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

UserModal.propTypes = {
  companyOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserModal;
