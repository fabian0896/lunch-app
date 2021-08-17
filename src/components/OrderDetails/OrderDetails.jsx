import React from 'react';
import { Table, Header } from 'semantic-ui-react';

import './OrderDetails.global.css';

const OrderDetails = () => {
  return (
    <div className="OrderDetails">
      <Table basic="very">
        <Table.Header>
          <Table.HeaderCell colSpan="4">
            <Header content="Pedido #001" subheader="15/06/2021" />
          </Table.HeaderCell>
        </Table.Header>
        <Table.Header>
          <Table.HeaderCell>Plato</Table.HeaderCell>
          <Table.HeaderCell>valor unitario</Table.HeaderCell>
          <Table.HeaderCell>Cantidad</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Almuerzo Simple</Table.Cell>
            <Table.Cell>$6.000</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>$6.000</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Almuerzo Simple</Table.Cell>
            <Table.Cell>$6.000</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>$6.000</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3" />
            <Table.HeaderCell>
              <Header>$12.000</Header>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default OrderDetails;
