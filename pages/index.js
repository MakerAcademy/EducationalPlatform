/** @jsx jsx */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, jsx, Heading, Grid } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';
import { usePlugin, useFormScreenPlugin } from 'tinacms';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { useGithubToolbarPlugins, useGithubJsonForm } from 'react-tinacms-github';
import { InlineForm } from 'react-tinacms-inline';
import SingleLayout from '@layouts/SingleLayout.js';
import useCreateDocument from '@hooks/useCreateDocument';
import useBannerForm from '@hooks/useBannerForm';
import useFeaturedGuidesForm from '@hooks/useFeaturedGuidesForm';
import GuideList from '@components/GuideList';
import CommunityCta from '@components/CommunityCta';
import AboutThisSite from '@components/AboutThisSite';
import PageLead from '@components/PageLead';
import IntroText from '@components/IntroText';
import DocumentationList from '@components/DocumentationList';
import SecurityFeatures from '@components/SecurityFeatures';
import NewsletterCallout from '@components/NewsletterCallout';
import LibrariesSdks from '@components/LibrariesSdks';
import { getResources } from '@utils';
import { landingPageFormOptions } from '../data/formOptions';

const Page = ({ file, guides, documentation, featGuidesFile, preview }) => {
  const [mobile, setMobile] = useState(false);
  const bpi = useBreakpointIndex({ defaultIndex: 2 });
  const router = useRouter();

  const [data, form] = useGithubJsonForm(file, landingPageFormOptions);
  const [featGuidesData, featGuidesForm] = useFeaturedGuidesForm(featGuidesFile, preview);

  useFormScreenPlugin(featGuidesForm);
  usePlugin(form);
  useGithubToolbarPlugins();
  useCreateDocument([...guides, ...documentation]);

  useEffect(() => {
    setMobile(bpi < 2);
  }, [bpi]);

  const featuredGuides = featGuidesData.featuredGuides.map((slug) =>
    guides.find(({ data }) => data.frontmatter.slug === slug)
  );

  return (
    <SingleLayout mobile={mobile} router={router}>
      <Head>
        <title>Maker Protocol Developer Portal</title>
      </Head>
      <InlineForm form={form}>
        <Grid sx={{ rowGap: 6 }}>
          <PageLead
            cta="Interested? Watch Maker Academy's introduction video here!"
            mobile={mobile}
          />
          <GuideList title="Featured Programs" path="guides" guides={featuredGuides} />
          <GuideList title="Featured Topics" path="guides" guides={featuredGuides} />
          <GuideList title="Recent MakerDAO News" path="guides" guides={featuredGuides} />
        </Grid>
      </InlineForm>
    </SingleLayout>
  );
};

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({ preview, previewData }) {
  const resources = await getResources(preview, previewData, 'content/resources');
  const documentation = resources.filter((g) => g.data.frontmatter.contentType === 'documentation');
  const guides = resources.filter((g) => g.data.frontmatter.contentType === 'guides');
  if (preview) {
    // get data from github
    const file = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'data/landingPage.json',
      parse: parseJson,
    });

    const featGuidesFile = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'data/featuredGuides.json',
      parse: parseJson,
    });

    return {
      props: {
        file: { ...file.props.file },
        featGuidesFile: {
          ...featGuidesFile.props.file,
        },
        guides,
        documentation,
        preview,
      },
    };
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'data/landingPage.json',
        data: (await import('../data/landingPage.json')).default,
      },
      featGuidesFile: {
        fileRelativePath: 'data/featuredGuides.json',
        data: (await import('../data/featuredGuides.json')).default,
      },
      guides,
      documentation,
    },
  };
};

export default Page;
