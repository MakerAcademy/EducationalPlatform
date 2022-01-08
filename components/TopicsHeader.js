import { Box, Flex, Container, Heading } from 'theme-ui';
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
    <Flex sx={{ borderTop: 'solid', borderWidth: 1, flexDirection: 'row', pl: 5, pt: 4, pb: 4 }}>
      <Heading mr={4} variant="topicsTitle">
        {title}
      </Heading>
      <FilteredSearchBar
        filters={filters}
        filteredCount={filteredCount}
        filterOnChange={filterOnChange}
        onSearchChange={onSearchChange}
        mobile={mobile}
      />
    </Flex>
  );
};

export default TopicsHeader;
