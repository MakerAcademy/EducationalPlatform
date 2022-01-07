import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { Container, Grid, Text, Flex, Box, Heading } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';
import GuideGrid from '@components/GuideGrid';
import Dropdown from '@components/Dropdown';
import SingleLayout from '@layouts/SingleLayout';
import { getResources } from '@utils';
import { ContentTypes } from '@utils/constants';
import { InlineText } from 'react-tinacms-inline';

const Page = ({ guides }) => {
  const [active, setActive] = useState('everything');
  const [mobile, setMobile] = useState(false);
  const bpi = useBreakpointIndex({ defaultIndex: 2 });
  const router = useRouter();

  useEffect(() => {
    setMobile(bpi < 2);
  }, [bpi]);

  const resources = guides.filter((guide) =>
    active === 'everything' ? Boolean : guide.data.frontmatter.subtopic.includes(active)
  );
  const componentNames = guides.reduce(
    (acc, guide) => {
      acc.push(...guide.data.frontmatter.subtopic);
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
        <Text> Programs </Text>
      </Heading>
      <GuideGrid title="Guides" path="programs" resources={resources} />
    </SingleLayout>
  );
};

export const getStaticProps = async function ({ preview, previewData }) {
  const resources = await getResources(preview, previewData, 'content/resources/programs');
  const guides = resources.filter((g) => g.data.frontmatter.contentType === 'programs');

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
    },
  };
};

export default Page;
