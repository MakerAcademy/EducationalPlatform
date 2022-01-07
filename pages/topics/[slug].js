import { useEffect, useState } from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useBreakpointIndex } from '@theme-ui/match-media';
import matter from 'gray-matter';
import { useFormScreenPlugin } from 'tinacms';
import { getGithubPreviewProps, parseMarkdown, parseJson } from 'next-tinacms-github';
import useSubNavForm from '@hooks/useSubNavForm';
import { createToc, getResources } from '@utils';
import useStore from '@stores/store';
import { ContentTypes } from '@utils/constants';
import { Box, Container, Flex, Grid, Heading, jsx, Text } from 'theme-ui';
import GuideGrid from '@components/GuideGrid';
import Dropdown from '@components/Dropdown';
import SingleLayout from '@layouts/SingleLayout';

const FeaturedCount = ({ count, ...props }) => {
  return (
    <Text
      variant="plainText"
      sx={{
        fontSize: 3,
        my: 'auto',
        ...props.sx,
      }}
    >
      {count} featured
    </Text>
  );
};

const Filter = ({ options, activeGroup, onChange, count, mobile }) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ border: 'light', borderColor: 'muted', borderWidth: '1px 0 1px 0', mb: 2 }}>
        <Container sx={{ p: 0 }}>
          <Grid columns={[2, '1fr 2fr 1fr']}>
            <Text variant="plainText" sx={{ fontSize: 3, p: 2, my: 'auto' }}>
              Show me guides about:
            </Text>
            <Flex
              sx={{
                border: 'light',
                borderColor: 'muted',
                borderWidth: mobile ? '0 0 0 1px' : '0 1px 0 1px',
                px: 4,
                py: 2,
              }}
            >
              <Dropdown
                sx={{ width: [7, 8] }}
                options={options}
                activeGroup={activeGroup}
                onChange={onChange}
              />
            </Flex>
            {!mobile && <FeaturedCount count={count} sx={{ py: 2, px: 4 }} />}
          </Grid>
        </Container>
      </Box>
      {mobile && <FeaturedCount count={count} sx={{ px: 2 }} />}
    </Box>
  );
};

const walk = (resources, array) => {
  array.forEach((item) => {
    const children = resources.filter(
      (resource) => resource.data.frontmatter.parent === item.data.frontmatter.slug
    );
    if (children.length > 0) {
      item.children = children;
      walk(resources, item.children);
    }
  });
};

const DocsPage = ({ guides, slug }) => {
  const [active, setActive] = useState('everything');
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const bpi = useBreakpointIndex({ defaultIndex: 2 });
  const url = 'topics/' + slug;
  useEffect(() => {
    setMobile(bpi < 2);
  }, [bpi]);

  const resources = guides.filter((guide) =>
    active === 'everything' ? Boolean : guide.data.frontmatter.subtopic === active
  );
  const componentNames = guides.reduce(
    (acc, guide) => {
      acc.push(guide.data.frontmatter.subtopic);
      return [...new Set(acc)];
    },
    ['everything']
  );

  return (
    <SingleLayout mobile={mobile} router={router}>
      <Head>
        <title>Maker Protocol Developer Portal - Guides</title>
      </Head>
      <Heading variant="megaHeading">
        <Text> {slug} </Text>
      </Heading>
      <Filter
        activeGroup={active}
        onChange={setActive}
        options={componentNames}
        count={resources.length}
        mobile={mobile}
      />
      <GuideGrid title="Guides" path={url} resources={resources} />
    </SingleLayout>
  );
};

export const getStaticProps = async function ({ preview, previewData, params }) {
  const { slug } = params;
  const url = 'content/resources/topics/' + slug;
  const resources = await getResources(preview, previewData, url);
  const guides = resources.filter((g) => g.data.frontmatter.contentType === ContentTypes.GUIDES);
  if (preview) {
    const file = (
      await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: 'data/guidesPage.json',
        parse: parseJson,
      })
    ).props;

    return {
      props: {
        ...file,
        guides,
      },
    };
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'data/guidesPage.json',
        data: (await import('../../data/guidesPage.json')).default,
      },
      guides,
      slug,
    },
  };
};

export const getStaticPaths = async function () {
  const fg = require('fast-glob');
  const contentDir = 'content/resources/documentation';
  const files = await fg(`${contentDir}/**/*.md`);

  const paths = files.reduce((acc, file) => {
    const content = require(`../../content/resources/documentation${file.replace(contentDir, '')}`);
    const { data } = matter(content.default);
    if (data.slug) acc.push({ params: { slug: data.slug } });
    return acc;
  }, []);

  return {
    fallback: true,
    paths,
  };
};

export default DocsPage;
