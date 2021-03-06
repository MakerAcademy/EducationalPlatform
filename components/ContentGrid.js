/** @jsx jsx */
import { jsx, Container, Grid } from 'theme-ui';
import GuideCard from '@components/GuideCard';

const ContentGrid = ({ content, path }) => {
  return (
    <Container>
      <Grid columns={[1, 3, 4]} sx={{ gridRowGap: [5, 6], gridColumnGap: 5 }}>
        {content.map(
          (
            {
              data: {
                frontmatter: { group, title, titleURL, description },
              },
            },
            i
          ) => {
            return (
              <GuideCard
                key={title}
                title={title}
                type={group}
                description={description}
                link={`/${path}/${titleURL}/`}
                linkText={'Read'}
                icon={`stamp_${(i % 5) + 1}`}
              />
            );
          }
        )}
      </Grid>
    </Container>
  );
};

export default ContentGrid;
