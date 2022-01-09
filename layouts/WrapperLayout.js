/** @jsx jsx */
import { jsx, Box } from 'theme-ui';
import Header from '@components/Header';
import Footer from '@components/Footer';

const WrapperLayout = ({ subnav, mobile, router, children }) => {
  return (
    <Box>
      <Header subnav={subnav} mobile={mobile} router={router} />
      {children}
      <Footer />
    </Box>
  );
};

export default WrapperLayout;
