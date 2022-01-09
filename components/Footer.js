/** @jsx jsx */
import Link from 'next/link';
import {
  jsx,
  Flex,
  Grid,
  Text,
  NavLink,
  Container,
  Link as ThemeLink,
  useColorMode,
} from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

const links = [
  [
    'About',
    [
      ['Our Team', '/team'],
      ['Careers', '/careers'],
      ['Our Finances', '/finances'],
    ],
  ],
  [
    'Help',
    [
      ['FAQs', '/faqs'],
      ['Community', '/community'],
    ],
  ],
  [
    'Affiliated Resources',
    [
      ['MakerDAO Website', '/security/multi-collateral-dai-security'],
      ['MakerDAO Forum', '/security/mcd-security-audits'],
      ['MakerDAO Discord', '/security/bug-bounty-program'],
    ],
  ],
];

const ColorModeToggle = (props) => {
  const [mode, setMode] = useColorMode();
  return (
    <Flex
      sx={{ mt: 'auto', alignItems: 'center', cursor: 'pointer' }}
      onClick={(e) => {
        const next = mode === 'dark' ? 'light' : 'dark';
        setMode(next);
      }}
    >
      <Icon name={'moon'} color="text" size="auto" sx={{ height: 20, width: 20 }} />
      <Text variant="plainText" sx={{ fontSize: 3, pl: 2 }}>
        Color Mode
      </Text>
    </Flex>
  );
};

const IconLink = ({ name, url, height = 20, width = 20 }) => {
  return (
    <ThemeLink href={url} target="_blank">
      <Icon name={name} color="text" size="auto" sx={{ cursor: 'pointer', height, width }} />
    </ThemeLink>
  );
};

const Section = ({ title, content }) => {
  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Text variant="plainText" sx={{ fontSize: 3, fontWeight: 'semiBold' }}>
        {title}
      </Text>
      {content.map(([name, url]) => {
        return url.indexOf('http') === 0 ? (
          <NavLink
            key={name}
            href={url}
            target="_blank"
            sx={{ px: 0, py: 1, fontSize: 3, color: 'onBackgroundMuted' }}
            variant="sidebar"
          >
            {name}
          </NavLink>
        ) : (
          <Link key={name} href={url} passHref>
            <NavLink
              sx={{ px: 0, py: 1, fontSize: 3, color: 'onBackgroundMuted' }}
              variant="sidebar"
            >
              {name}
            </NavLink>
          </Link>
        );
      })}
    </Flex>
  );
};

const Footer = () => {
  return (
    <Container as="footer" sx={{ pt: 6 }}>
      <Grid sx={{ pb: 4 }} columns={[2, 3, 6]} gap={4}>
        <Flex sx={{ flexDirection: 'column', height: ['100%', '50%', '50%'] }}>
          <Flex sx={{ pb: 2 }}>
            <IconLink name="maker_full" url="https://www.makerdao.com" width={127} />
          </Flex>
        </Flex>
        {links.map(([title, content]) => {
          return <Section key={title} title={title} content={content} />;
        })}
      </Grid>
    </Container>
  );
};

export default Footer;
