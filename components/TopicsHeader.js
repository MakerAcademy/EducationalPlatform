import { Box, Flex, Heading } from 'theme-ui';
import FilteredSearchBar from '@components/FilteredSearchBar';

const TopicsHeader = ({
  mobile,
  filters,
  filteredCount,
  title,
  filterOnChange,
  onSearchChange,
}) => {
  return (
    <Box p={4}>
      <Flex
        sx={{
          alignItems: 'center',
        }}
      >
        <Heading>{title}</Heading>
        <FilteredSearchBar
          filters={filters}
          filteredCount={filteredCount}
          filterOnChange={filterOnChange}
          onSearchChange={onSearchChange}
          mobile={mobile}
        />
      </Flex>
    </Box>
  );
};

export default TopicsHeader;
