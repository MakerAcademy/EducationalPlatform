import { Input } from 'theme-ui';

const SearchBar = ({ onChange }) => {
  return <Input onChange={(e) => onChange(e.target.value)} defaultValue="" />;
};
export default SearchBar;
