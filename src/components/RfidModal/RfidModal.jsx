import React, { useEffect, useState } from 'react';
import { Modal, Image, Form, Dimmer, Loader, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import searchingSignalSvg from '../../../assets/svg/signal_searching.svg';

const validationSchema = Yup.object().shape({
  port: Yup.string().required(),
});

const RfidModal = ({
  open,
  onOpen,
  onClose,
  onConnect,
  connect,
  onDisconnect,
}) => {
  const [portOptions, setPortOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      port: '',
    },
    onSubmit: async (value, actions) => {
      const { port } = value;
      setError(false);
      try {
        setLoading(true);
        await ipcRenderer.invoke('connectRfid', port);
        setSuccess(true);
        setError(false);
        onConnect();
        setLoading(false);
      } catch (err) {
        setError(true);
        setSuccess(false);
        setLoading(false);
        actions.resetForm();
      }
    },
    validationSchema,
  });

  const getPorts = async () => {
    setLoading(true);
    const result = await ipcRenderer.invoke('getRfidPorts');
    const ports = result.map((p) => ({
      key: p.path,
      text: p.manufacturer || 'No reconocido',
      value: p.path,
      description: p.path,
    }));
    setPortOptions(ports);
    setLoading(false);
  };

  useEffect(() => {
    setError(false);
    setSuccess(false);
    if (!open) return;
    getPorts();
  }, [open]);

  const handleDisconnect = async () => {
    try {
      await onDisconnect();
      setError(false);
    } catch (err) {
      setError(err);
    }
  };

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
        <Form success={success} error={error} onSubmit={formik.handleSubmit}>
          <Form.Dropdown
            selection
            placeholder="Selecciona el puerto"
            value={formik.values.port}
            onChange={(event, { value }) => formik.setFieldValue('port', value)}
            id="port"
            name="port"
            label="puerto"
            options={portOptions}
          />
          {connect ? (
            <Form.Button
              onClick={handleDisconnect}
              type="button"
              negative
              fluid
            >
              Desconectar
            </Form.Button>
          ) : (
            <Form.Button
              disabled={!formik.isValid}
              type="submit"
              positive
              fluid
              loading={loading}
            >
              Conectar
            </Form.Button>
          )}
          <Message error>
            <Message.Header>Algo salio mal!</Message.Header>
            <p>
              No se pudo conectar al dispositivo, verifica que estes
              seleccionando el puero correcto
            </p>
          </Message>
          <Message success>
            <Message.Header>Conectado correctamente!</Message.Header>
            <p>
              El dispositivo se conecto correctamente, ya puedes empezar a
              usarlo con tranquilidad
            </p>
          </Message>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

RfidModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onConnect: PropTypes.func,
  connect: PropTypes.bool,
  onDisconnect: PropTypes.func,
};

RfidModal.defaultProps = {
  onConnect: () => {},
  connect: false,
  onDisconnect: () => {},
};

export default RfidModal;
