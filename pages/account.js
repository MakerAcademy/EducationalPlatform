import Header from '../components/Header';
import { Footer } from '../components/Footer';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import SingleLayout from '../layouts/SingleLayout';
import Head from 'next/head';
import { useState } from 'react';
import { Box } from 'theme-ui';
import { Grid } from 'theme-ui';
import Sidebar from '../components/SidebarDocumentation';
import AccountSettingsForm from '../components/AccountInfo';

const Page = () => {
  const [mobile, setMobile] = useState(false);
  const router = useRouter();
  return (
    <SingleLayout mobile={mobile} router={router}>
      <Head>
        <title>My Account</title>
      </Head>
      <Grid columns={[3, '1fr 2fr 1fr']} gap="0">
        <Box />
        <Box
          sx={{
            borderRadius: 0,
            py: 0,
            px: 4,
            pb: 4,
            border: mobile ? undefined : 'solid',
            borderColor: 'muted',
            borderWidth: '0 0 0 0',
          }}
        >
          <AccountSettingsForm />
        </Box>
        <Box />
      </Grid>
    </SingleLayout>
  );
};

export default Page;
