/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx, Box, Container, Link as ThemeLink, NavLink, Flex, IconButton, Text } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import Banners from '@components/Banners';
import { banner as bannerData } from '../data/banner.json';
import { useUser } from '@auth0/nextjs-auth0';

const LINKS = [
  { url: '/news', name: 'News' },
  { url: '/topics', name: 'Topics' },
  { url: '/programs', name: 'Programs' },
];

const MobileMenu = ({ close, query, bannerData }) => {
  const [{ linkText, url, text }] = null;

  const { user, error, isLoading } = useUser();

  if (isLoading) {
    console.log('Auth0 SDK is Loading');
  }

  return (
    <Container
      sx={{
        bg: 'background',
        height: '100%',
        position: 'fixed',
        zIndex: 1,
      }}
    >
      <Flex sx={{ justifyContent: 'space-between', mb: 6, py: 2 }}>
        <Link href="/" passHref>
          <ThemeLink>
            <Icon name="maker" color="text" size={4} />
          </ThemeLink>
        </Link>
        <IconButton sx={{ cursor: 'pointer', pt: 3 }}>
          <Icon
            name="dp_close"
            size="auto"
            color="text"
            sx={{
              cursor: 'pointer',
              height: 20,
              width: 20,
            }}
            onClick={close}
          />
        </IconButton>
      </Flex>
      <Flex as="nav" sx={{ flexDirection: 'column', px: 2 }}>
        <ThemeLink href={url} target="_blank">
          <Flex sx={{ alignItems: 'center', px: 2 }}>
            <Icon color="primary" name="increase"></Icon>
            <Text sx={{ px: 2, fontSize: 5, color: 'text' }}>{linkText}</Text>
          </Flex>
        </ThemeLink>
        <Text sx={{ px: 2, fontSize: 2, color: 'onBackgroundMuted' }}>{text}</Text>
        {/*<Dropdown*/}
        {/*  sx={{ width: [7, 8] }}*/}
        {/*  options={['Finance', 'Business']}*/}
        {/*  // activeGroup={activeGroup}*/}
        {/*  // onChange={onChange}*/}
        {/*/>*/}
        {LINKS.map(({ name, url }) => (
          <Link href={{ pathname: url, query }} passHref key={name}>
            <NavLink
              key={name}
              sx={{
                py: 4,
                fontSize: 7,
              }}
              variant="links.mobileNav"
            >
              {name}
            </NavLink>
          </Link>
        ))}
      </Flex>
    </Container>
  );
};

const Header = ({ query, subnav, mobile, router }) => {
  const [mobileOpened, setMobileOpened] = useState(false);

  const { user, error, isLoading } = useUser();

  if (isLoading) {
    console.log('Auth0 SDK is Loading');
  }

  if (!isLoading) {
    console.log('Auth0 SDK finished Loading');
  }

  useEffect(() => {
    setMobileOpened(false);
  }, [router?.asPath]);
  return (
    <Box
      sx={{ width: '100%', zIndex: 1, position: [mobileOpened ? 'fixed' : undefined, undefined] }}
    >
      {mobileOpened ? (
        <MobileMenu close={() => setMobileOpened(false)} />
      ) : (
        <>
          {/* {!mobile && <Banners bannerData={bannerData} />} */}
          <Container as="header" mt={[0, 2]} sx={{ bg: 'background' }}>
            <Flex
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: [0, 3],
                py: [2, 0],
              }}
            >
              <Link href="/" passHref>
                <ThemeLink>
                  <Icon name="maker" color="text" size={4} />
                </ThemeLink>
              </Link>
              <Flex sx={{ alignItems: 'center' }}>
                <Flex
                  as="nav"
                  sx={{
                    alignItems: 'center',
                  }}
                >
                  {LINKS.map(({ name, url }) => (
                    <Link href={{ pathname: url, query }} passHref key={name}>
                      <NavLink
                        key={name}
                        sx={{
                          display: ['none', 'none', 'block'],
                          pr: 4,
                          '&:last-child': { pr: [null, 0] },
                        }}
                        variant="links.nav"
                      >
                        {name}
                      </NavLink>
                    </Link>
                  ))}
                  {user ? (
                    <a href="/api/auth/logout" key={'Logout'} style={{ textDecoration: 'none' }}>
                      <NavLink
                        key={'Logout'}
                        sx={{
                          display: ['none', 'none', 'block'],
                          pr: 4,
                          '&:last-child': { pr: [null, 0] },
                        }}
                        variant="links.nav"
                      >
                        {'Logout'}
                      </NavLink>
                    </a>
                  ) : (
                    <a
                      href="/api/auth/login"
                      key={'Login/Sign-Up'}
                      style={{ textDecoration: 'none' }}
                    >
                      <NavLink
                        key={'Login/Sign-Up'}
                        sx={{
                          display: ['none', 'none', 'block'],
                          pr: 4,
                          '&:last-child': { pr: [null, 0] },
                        }}
                        variant="links.nav"
                      >
                        {'Login/Sign-Up'}
                      </NavLink>
                    </a>
                  )}
                </Flex>
                <IconButton sx={{ display: ['block', 'block', 'none'], cursor: 'pointer' }}>
                  <Icon
                    name="dp_menu"
                    size="auto"
                    color="text"
                    sx={{
                      height: 24,
                      width: 19,
                    }}
                    onClick={() => setMobileOpened(!mobileOpened)}
                  />
                </IconButton>
              </Flex>
            </Flex>
          </Container>
        </>
      )}
      {subnav ?? null}
    </Box>
  );
};

export default Header;
