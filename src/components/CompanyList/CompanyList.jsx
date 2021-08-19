import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Table, Button, Input, Icon } from 'semantic-ui-react';
import { startCase } from 'lodash';
import moment from 'moment';

import addTaskSvg from '../../../assets/svg/empty.svg';
import userSvg from '../../../assets/svg/profile_pic.svg';

const CompanyList = ({ company, onDelet, onUpdate, onSeeDatails }) => {
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState(company.name);
  const [loading, setLoading] = useState(false);
  const handleDelete = () => {
    onDelet(company.id);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setEditName(value);
  };

  const handleEdit = (active) => () => {
    setEditName(company.name);
    setEdit(active);
  };

  const hanldeUpdate = async () => {
    setLoading(true);
    await onUpdate(company.id, {
      name: editName,
    });
    setLoading(false);
    setEdit(false);
  };

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            {edit ? (
              <Input
                fluid
                loading={loading}
                value={editName}
                onChange={handleChange}
              />
            ) : (
              <Header size="large">{company.name}</Header>
            )}
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="right">
            {edit ? (
              <>
                {editName && (
                  <Button
                    onClick={hanldeUpdate}
                    size="small"
                    icon="save"
                    secondary
                  />
                )}
                <Button onClick={handleEdit(false)} size="small" icon="times" />
              </>
            ) : (
              <>
                <Button
                  onClick={handleEdit(true)}
                  size="small"
                  icon="edit outline"
                  secondary
                />
                <Button
                  onClick={handleDelete}
                  size="small"
                  icon="trash alternate"
                  negative
                />
              </>
            )}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {!company.users.length && (
          <Table.Row>
            <Table.Cell style={{ padding: '20px' }} colSpan="2">
              <Image centered size="small" src={addTaskSvg} />
              <p style={{ textAlign: 'center', marginTop: '15px' }}>
                No hay usuarios registrados a esta empresa
              </p>
            </Table.Cell>
          </Table.Row>
        )}
        {company.users.map((user) => (
          // eslint-disable-next-line no-underscore-dangle
          <Table.Row key={user._id}>
            <Table.Cell>
              <Header as="h4" image>
                <Image src={userSvg} rounded size="mini" />
                <Header.Content>
                  {startCase(user.name)}
                  <Header.Subheader>
                    {moment(user.updatedAt).format('DD/MM/YYYY')}
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Button
                onClick={() => onSeeDatails(user)}
                circular
                icon="eye"
                size="mini"
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

CompanyList.propTypes = {
  company: PropTypes.objectOf(PropTypes.any).isRequired,
  onDelet: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onSeeDatails: PropTypes.func.isRequired,
};

export default CompanyList;
