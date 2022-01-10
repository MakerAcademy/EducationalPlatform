import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useBreakpointIndex } from '@theme-ui/match-media';
import matter from 'gray-matter';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { getResources } from '@utils';
import { ContentTypes } from '@utils/constants';
import ContentGrid from '@components/ContentGrid';
import TopicsHeader from '@components/TopicsHeader';
import WrapperLayout from '@layouts/WrapperLayout';

const walk = (resources, array) => {
  array.forEach((item) => {
    const children = resources.filter(
      (resource) => resource.data.frontmatter.parent === item.data.frontmatter.titleURL
    );
    if (children.length > 0) {
      item.children = children;
      walk(resources, item.children);
    }
  });
};

const NO_FILTER = 'All';

const TopicPage = ({ posts, topic }) => {
  const [filter, setFilter] = useState(NO_FILTER);
  const [searchChange, onSearchChange] = useState('');
  const filteredPosts = posts.filter((post) =>
    filter === NO_FILTER
      ? post.data.frontmatter.title.includes(searchChange)
      : post.data.frontmatter.subtopic === filter &&
        post.data.frontmatter.title.includes(searchChange)
  );
  const filters = posts.reduce(
    (acc, post) => {
      acc.push(post.data.frontmatter.subtopic);
      return [...new Set(acc)];
    },
    [NO_FILTER]
  );

  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const bpi = useBreakpointIndex({ defaultIndex: 2 });

  const url = 'topics/' + topic;

  useEffect(() => {
    setMobile(bpi < 2);
  }, [bpi]);

  return (
    <WrapperLayout mobile={mobile} router={router}>
      <TopicsHeader
        mobile={mobile}
        filters={filters}
        filteredCount={filteredPosts.length}
        title={topic.charAt(0).toUpperCase() + topic.slice(1)}
        filterOnChange={setFilter}
        onSearchChange={onSearchChange}
      />
      <ContentGrid content={filteredPosts} path={url} />
    </WrapperLayout>
  );
};

const TOPICS_PATH = 'content/topics';

export const getStaticProps = async function ({ preview, previewData, params }) {
  const { topic } = params;
  const url = TOPICS_PATH + '/' + topic;
  const resources = await getResources(preview, previewData, url);
  const posts = resources.filter((g) => g.data.frontmatter.contentType === 'topics');
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
        posts,
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
      posts,
      topic,
    },
  };
};

export const getStaticPaths = async function () {
  const paths = [];
  return {
    fallback: true,
    paths,
  };
};

export default TopicPage;
