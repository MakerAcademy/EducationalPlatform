import { Text, Flex } from 'theme-ui';
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
    <Flex>
      <Dropdown
        sx={{ width: [7, 8] }}
        options={filters}
        activeGroup="all"
        onChange={filterOnChange}
      />
      <SearchBar onChange={onSearchChange} />
      <FeaturedCount count={filteredCount} sx={{ py: 2, px: 4 }} />
    </Flex>
  );
};

export default FilteredSearchBar;
