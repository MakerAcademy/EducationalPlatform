/** @jsx jsx */
import { jsx, Heading, Box, Flex, Grid, Container, Link as ThemeLink } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import GuideCard from '@components/GuideCard';

const GuideList = ({ guides, title, path }) => {
  return (
    <Flex>
      <Box>
        <Container>
          <Flex
            sx={{
              alignItems: 'center',
              flexWrap: 'wrap',
              mb: 3,
            }}
          >
            <Heading variant="largeHeading">{title}</Heading>

            <Link href={'/topics'} passHref>
              <Flex sx={{ ml: 'auto', alignItems: 'center' }}>
                <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                <ThemeLink sx={{ color: 'text', cursor: 'pointer' }}>View All</ThemeLink>
              </Flex>
            </Link>
          </Flex>
        </Container>
        <Grid
          gap={4}
          sx={{
            ml: [0, 2],
            gridAutoFlow: 'column',
            overflowX: 'auto',
            pl: [2, 'calc(50% - 1140px / 2)'],
            '::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
          }}
        >
          {guides.map((guide, i) => {
            if (!guide) return null;
            const {
              data: {
                frontmatter: { contentType, title, titleURL, description, topic, subtopic },
              },
            } = guide;
            return (
              <GuideCard
                key={title}
                title={title}
                type={contentType}
                description={description}
                link={`/${path}/${topic}/${titleURL}/`}
                linkText={'Read'}
                icon={`stamp_${(i % 5) + 1}`}
                tags={subtopic}
                sx={{
                  width: 7,
                  border: 'light',
                  borderColor: 'muted',
                  borderRadius: 'small',
                  '&:hover': {
                    borderColor: 'primaryEmphasis',
                  },
                  p: 3,
                }}
              />
            );
          })}
        </Grid>
      </Box>
    </Flex>
  );
};

export default GuideList;
