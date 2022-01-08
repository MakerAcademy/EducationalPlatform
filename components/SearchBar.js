import { Input, Flex } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

const SearchBar = ({ onChange }) => {
  return (
    <Flex sx={{ bg: 'white', width: 300 }}>
      <Input
        sx={{
          '&:focus': { color: 'black' },
          p: 2,
          color: 'black',
          border: 'none',
          borderRadius: 0,
        }}
        onChange={(e) => onChange(e.target.value)}
        defaultValue=""
      />
      <Icon
        sx={{
          alignSelf: 'center',
          ml: -28,
          pointerEvents: 'none',
        }}
        name="search"
        size={3}
        color="black"
      />
    </Flex>
  );
};
export default SearchBar;
