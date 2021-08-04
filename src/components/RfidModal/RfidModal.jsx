import React, { useEffect, useState } from 'react';
import { Modal, Image, Form, Dimmer, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import searchingSignalSvg from '../../../assets/svg/signal_searching.svg';

const RfidModal = ({ open, onOpen, onClose }) => {
  const [portOptions, setPortOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPorts = async () => {
    console.time('get-ports');
    setLoading(true);
    const result = await ipcRenderer.invoke('getRfidPorts');
    const ports = result.map((p) => ({
      key: p.path,
      text: p.manufacturer || 'No Reconocido',
      value: p.path,
      description: p.path,
    }));
    setPortOptions(ports);
    setLoading(false);
    console.timeEnd('get-ports');
  };

  useEffect(() => {
    if (!open) return;
    getPorts();
  }, [open]);

  return (
    <Modal
      closeIcon
      onOpen={onOpen}
      onClose={onClose}
      size="mini"
      dimmer="blurring"
      open={open}
    >
      <Dimmer active={loading}>
        <Loader active={loading} content="Cargando..." />
      </Dimmer>
      <Modal.Header>Configuración RFID</Modal.Header>
      <Modal.Content>
        <Image
          style={{ marginBottom: '15px' }}
          centered
          size="small"
          src={searchingSignalSvg}
        />
        <p>Selecciona el puerto en el que esta conectado el lector RFID</p>
        <Form>
          <Form.Select id="port" label="puerto" options={portOptions} />
          <Form.Button positive fluid>
            Conectar
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

RfidModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default RfidModal;
