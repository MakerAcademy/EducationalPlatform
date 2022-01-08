/** @jsx jsx */
import { jsx, Box } from 'theme-ui';
import Header from '@components/Header';
import Footer from '@components/Footer';

const GuidesLayout = ({ infobar, mobile, router, children }) => {
  return (
    <Box>
      <Header mobile={mobile} router={router} />
      {!mobile && <aside sx={{ float: 'right', width: '20%' }}>{infobar}</aside>}
      {children}
      <Footer />
    </Box>
  );
};

export default GuidesLayout;
