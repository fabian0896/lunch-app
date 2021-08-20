import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';
import { ipcRenderer } from 'electron';
import clsx from 'clsx';

import Item from './Item';

import { RfidModal } from '../../components';

import './Layout.global.css';

const Layout = ({ children }) => {
  const [openRfidModal, setOpenRfidModal] = useState(false);
  const [rfidConnect, setRfidConnect] = useState(false);
  const handleOpenRfidModal = () => {
    setOpenRfidModal(true);
  };
  const handleCloseRfidModal = () => {
    setOpenRfidModal(false);
  };

  const handleConnect = () => {
    setRfidConnect(true);
    ipcRenderer.on('rfid-state', (event, state) => {
      setRfidConnect(state);
    });
    ipcRenderer.send('get-rfid-state');
  };

  return (
    <Grid className="Layout-grid">
      <Grid.Column className="Layout-menu-container" width={4}>
        <RfidModal
          onConnect={handleConnect}
          open={openRfidModal}
          onOpen={handleOpenRfidModal}
          onClose={handleCloseRfidModal}
        />
        <div className="Layout-navigation">
          <ul>
            <Item exact title="Inicio" to="/" icon="home" />
            <Item title="Ventas" to="/orders" icon="shopping cart" />
            <Item title="Comidas" to="/products" icon="utensils" />
            <Item title="Usuarios" to="/users" icon="address book" />
            <Item title="Empresas" to="/companies" icon="building" />
          </ul>
          <div className="Layout-submenu">
            <div className="Layout-rfid-status">
              <Header
                onClick={handleOpenRfidModal}
                className="Layout-rfid-status-header"
                content="Conección RFID"
                subheader={`Estado: ${
                  rfidConnect ? 'conectado' : 'desconectado'
                }`}
                icon="connectdevelop"
                color="grey"
                inverted
              />
              <div
                className={clsx('Layout-rfid-status-dot', {
                  connected: rfidConnect,
                  disconnected: !rfidConnect,
                })}
              />
            </div>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column id="layout-content" className="Layout-content" width={12}>
        {children}
      </Grid.Column>
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Layout;
