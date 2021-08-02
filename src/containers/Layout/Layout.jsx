import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Item from './Item';

import './Layout.global.css';

const Layout = ({ children }) => {
  return (
    <Grid className="Layout-grid">
      <Grid.Column className="Layout-menu-container" width={4}>
        <div className="Layout-navigation">
          <ul>
            <Item title="Inicio" to="/" icon="home" />
            <Item title="Ventas" to="orders" icon="shopping cart" />
            <Item title="Comidas" to="/products" icon="utensils" />
            <Item title="Usuarios" to="/users" icon="address book" />
            <Item title="Empresas" to="/companies" icon="building" />
          </ul>
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
