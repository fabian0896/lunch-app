import React from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Item = ({ icon, title, to }) => {
  return (
    <NavLink exact to={to} activeClassName="active">
      <li>
        <b />
        <b />
        <Header
          className="Item-item"
          size="small"
          as="h2"
          icon={icon}
          content={title}
        />
      </li>
    </NavLink>
  );
};

Item.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default Item;
