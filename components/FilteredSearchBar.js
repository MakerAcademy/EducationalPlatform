import { Text, Container } from 'theme-ui';
import Dropdown from '@components/Dropdown';
import SearchBar from '@components/SearchBar';

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

const FilteredSearchBar = ({ filters, filteredCount, filterOnChange }) => {
  return (
    <Container>
      <Dropdown
        sx={{ width: [7, 8] }}
        options={filters}
        activeGroup="all"
        onChange={filterOnChange}
      />
      <SearchBar />
      <FeaturedCount count={filteredCount} sx={{ py: 2, px: 4 }} />
    </Container>
  );
};

export default FilteredSearchBar;
