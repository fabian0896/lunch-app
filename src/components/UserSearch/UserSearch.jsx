import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { startCase, debounce } from 'lodash';
import { Search, Input } from 'semantic-ui-react';

import avatarSvg from '../../../assets/svg/profile_pic.svg';

const UserSearch = ({ results, onSearchChange, onSelect }) => {
  const handleChandeSearch = debounce(onSearchChange, 300, {
    maxWait: 1000,
  });

  const formatResults = (values) => {
    return values.map((user) => ({
      title: startCase(user.name),
      description: user.company?.name || 'Sin empresa',
      image: user.avatar || avatarSvg,
      id: user.id,
    }));
  };

  const handleSelect = (e, data) => {
    const user = results.find((r) => r.id === data.result.id);
    onSelect(user);
  };

  useEffect(() => {
    return () => {
      handleChandeSearch.cancel();
    };
  }, [handleChandeSearch]);

  return (
    <Search
      fluid
      placeholder="Buscar usuario por nombre"
      input={<Input fluid />}
      onSearchChange={handleChandeSearch}
      results={formatResults(results)}
      onResultSelect={handleSelect}
    />
  );
};

UserSearch.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any),
  onSearchChange: PropTypes.func,
  onSelect: PropTypes.func,
};
UserSearch.defaultProps = {
  results: [],
  onSearchChange: () => {},
  onSelect: () => {},
};

export default UserSearch;
