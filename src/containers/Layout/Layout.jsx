import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';
import Item from './Item';

import { RfidModal } from '../../components';

import './Layout.global.css';

const Layout = ({ children }) => {
  const [openRfidModal, setOpenRfidModal] = useState(false);
  const handleOpenRfidModal = () => {
    setOpenRfidModal(true);
  };
  const handleCloseRfidModal = () => {
    setOpenRfidModal(false);
  };
  return (
    <Grid className="Layout-grid">
      <Grid.Column className="Layout-menu-container" width={4}>
        <RfidModal
          open={openRfidModal}
          onOpen={handleOpenRfidModal}
          onClose={handleCloseRfidModal}
        />
        <div className="Layout-navigation">
          <ul>
            <Item exact title="Inicio" to="/" icon="home" />
            <Item title="Ventas" to="orders" icon="shopping cart" />
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
                subheader="Estado: conectado"
                icon="connectdevelop"
                color="grey"
                inverted
              />
              <div className="Layout-rfid-status-dot connected" />
            </div>
          </div>
        </div>
      </Grid.Column>
      <Grid.Column className="Layout-content" width={12}>
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
