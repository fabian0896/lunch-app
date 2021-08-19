import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { startCase } from 'lodash';
import numeral from 'numeral';

import './OrderDetails.global.css';

const OrderDetails = ({ order }) => {
  const getTotal = (products = []) => {
    const value = products.reduce((sum, product) => {
      const total = product.details.price * product.details.quantity;
      return total + sum;
    }, 0);
    return numeral(value).format('$0,0');
  };
  return (
    <div className="OrderDetails">
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Header
                content={`Pedido #${String(order.consecutive).padStart(
                  3,
                  '0'
                )}`}
                subheader={moment(order.createdAt).format(
                  'DD/MM/YY [a las] h:mm A'
                )}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Plato</Table.HeaderCell>
            <Table.HeaderCell>valor unitario</Table.HeaderCell>
            <Table.HeaderCell>Cantidad</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {order.products.map((product) => (
            <Table.Row key={product.uniqueId}>
              <Table.Cell>{startCase(product.name)}</Table.Cell>
              <Table.Cell>
                {numeral(product.details.price).format('$0,0')}
              </Table.Cell>
              <Table.Cell>{product.details.quantity}</Table.Cell>
              <Table.Cell>
                {numeral(
                  product.details.quantity * product.details.price
                ).format('$0,0')}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3" />
            <Table.HeaderCell>
              <Header>{getTotal(order.products)}</Header>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default OrderDetails;
