/** @jsx jsx */
import Link from 'next/link';
import { Container, jsx, Card, Heading, Grid, Flex, Link as ThemeLink, Box } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { navItems as docLinks } from '../data/resourcesSubNav.json';

const DocumentationList = () => {
  return (
    <Box>
      <Container>
        <Flex sx={{ mb: 3, alignItems: 'center', justifyContent: 'space-between' }}>
          <Heading variant="largeHeading">Documentation</Heading>

          <Link href={'/documentation'} passHref>
            <Flex sx={{ ml: 3, alignItems: 'center' }}>
              <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
              <ThemeLink sx={{ color: 'text', cursor: 'pointer' }}>Start learning</ThemeLink>
            </Flex>
          </Link>
        </Flex>
      </Container>
      <Grid
        sx={{
          columnGap: 3,
          gridAutoFlow: 'column',
          overflowX: 'auto',
          pl: [2, 'calc(50% - 1140px / 2)'],
          '::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',

          gridTemplateRows: 'auto',

          rowGap: 3,
        }}
      >
        {docLinks.map(({ name, url }) => {
          return (
            <Link key={name} href={`${url}`} passHref>
              <Card
                sx={{
                  width: 180,
                  border: 'light',
                  bg: 'background',
                  borderColor: 'muted',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primaryEmphasis',
                  },
                }}
              >
                <Flex
                  sx={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <Heading>{name}</Heading>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                    <ThemeLink sx={{ color: 'text', cursor: 'pointer' }}>View Docs</ThemeLink>
                  </Flex>
                </Flex>
              </Card>
            </Link>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DocumentationList;
