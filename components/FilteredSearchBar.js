import { Text, Flex, Container } from 'theme-ui';
import Dropdown from '@components/Dropdown';
import SearchBar from '@components/SearchBar';
import { useState } from 'react';

const FeaturedCount = ({ count, ...props }) => {
  return (
    <Text
      variant="plainText"
      sx={{
        fontSize: 3,
        my: 'auto',
        ...props.sx,
      }}
    >
      {count} featured
    </Text>
  );
};

const FilteredSearchBar = ({ filters, filteredCount, filterOnChange, onSearchChange }) => {
  return (
    <Flex sx={{ flexDirection: 'column', p: 4 }}>
      <Flex sx={{ flexDirection: 'row' }}>
        <Dropdown
          sx={{ '&:focus': { color: 'black' }, bg: 'gray', color: 'black', width: '100%' }}
          options={filters}
          activeGroup="all"
          onChange={filterOnChange}
        />
        <SearchBar onChange={onSearchChange} />
      </Flex>
      <FeaturedCount count={filteredCount} />
    </Flex>
  );
};

export default FilteredSearchBar;
