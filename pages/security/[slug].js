import { useEffect, useState } from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useBreakpointIndex } from '@theme-ui/match-media';
import matter from 'gray-matter';
import { useFormScreenPlugin } from 'tinacms';
import { getGithubPreviewProps, parseMarkdown, parseJson } from 'next-tinacms-github';
import useSubNavForm from '@hooks/useSubNavForm';
import ResourcesLayout from '@layouts/ResourcesLayout';
import ResourcePresentation from '@components/ResourcePresentation';
import { createToc, getResources } from '@utils';
import useStore from '@stores/store';
import { ContentTypes } from '@utils/constants';

const SecurityPage = ({ file, navFile, sharedContentfile, preview, slug, toc }) => {
  const [navData, navForm] = useSubNavForm(navFile, preview);
  useFormScreenPlugin(navForm);
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const bpi = useBreakpointIndex({ defaultIndex: 2 });

  const [setActiveGroup, setActiveParent] = useStore((state) => [
    state.setActiveGroup,
    state.setActiveParent,
  ]);

  useEffect(() => {
    setMobile(bpi < 2);
  }, [bpi]);

  useEffect(() => {
    setActiveGroup(file?.data.frontmatter.group);
    setActiveParent(file?.data.frontmatter.parent);
    return () => setActiveGroup(null) || setActiveParent(null);
  }, [setActiveGroup, setActiveParent, file]);

  const title = file?.data?.frontmatter?.title;

  return !file ? (
    <Error statusCode={404} />
  ) : router.isFallback ? (
    <div>Loading...</div>
  ) : (
    <ResourcesLayout
      resourcePath={ContentTypes.SECURITY}
      slug={slug}
      toc={toc}
      mobile={mobile}
      router={router}
      navData={navData}
    >
      <Head>
        <title>{title || 'Maker Protocol Developer Portal'}</title>
      </Head>
      <ResourcePresentation
        file={file}
        contentType={ContentTypes.SECURITY}
        navFile={navFile}
        preview={preview}
        mobile={mobile}
        sharedContentfile={sharedContentfile}
      />
    </ResourcesLayout>
  );
};

export const getStaticProps = async function ({ preview, previewData, params }) {
  const { slug } = params;
  let toc = '';

  const resources = await getResources(preview, previewData, 'content/resources/security');
  const resource = resources.find((r) => r.data.frontmatter.slug === slug);
  const fileRelativePath = resource.fileRelativePath;

  if (preview) {
    const sharedContentfile = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'data/sharedL3Content.json',
      parse: parseJson,
    });

    const navFile = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'data/securitySubNav.json',
      parse: parseJson,
    });

    const markdownFile = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath,
      parse: parseMarkdown,
    });
    if (typeof window === 'undefined') {
      toc = createToc(markdownFile.props.file.data.markdownBody);
    }

    markdownFile.props.file.data.frontmatter = {
      ...resource.data.frontmatter,
      ...markdownFile.props.file.data.frontmatter,
    };
    return {
      props: {
        sharedContentfile: { ...sharedContentfile.props.file },
        navFile: {
          ...navFile.props.file,
        },
        resources,
        toc,
        previewURL: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}`,
        ...markdownFile.props,
      },
    };
  }

  if (typeof window === 'undefined') {
    toc = createToc(resource.data.markdownBody);
  }
  return {
    props: {
      sharedContentfile: {
        fileRelativePath: 'data/sharedL3Content.json',
        data: (await import('../../data/sharedL3Content.json')).default,
      },
      navFile: {
        fileRelativePath: 'data/securitySubNav.json',
        data: (await import('../../data/securitySubNav.json')).default,
      },
      slug,
      resources,
      toc,
      sourceProvider: null,
      error: null,
      preview: false,
      // the markdown file
      file: {
        fileRelativePath: resource.fileRelativePath,
        data: {
          frontmatter: resource.data.frontmatter,
          markdownBody: resource.data.markdownBody,
        },
      },
    },
  };
};

export const getStaticPaths = async function () {
  const fg = require('fast-glob');
  const contentDir = 'content/resources/security';
  const files = await fg(`${contentDir}/**/*.md`);

  const paths = files.reduce((acc, file) => {
    const content = require(`../../content/resources/security${file.replace(contentDir, '')}`);
    const { data } = matter(content.default);
    if (data.slug) acc.push({ params: { slug: data.slug } });
    return acc;
  }, []);

  return {
    fallback: true,
    paths,
  };
};

export default SecurityPage;
