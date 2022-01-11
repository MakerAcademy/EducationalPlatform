import { useGithubMarkdownForm } from 'react-tinacms-github';

const useEditFrontmatterForm = (mdFile, preview) => {
  if (!preview) {
    // if we are not in preview return the mdFile and don't register the form
    return [mdFile.data, null];
  }

  const navFormOptions = {
    label: 'Frontmatter',
    __type: 'screen',
    fields: [
      {
        name: 'frontmatter.title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'frontmatter.description',
        label: 'Description',
        component: 'text',
      },
      {
        component: 'select',
        name: 'frontmatter.contentType',
        label: 'Content Type',
        description: 'Select the content type for this resource.',
        options: ['programs', 'topics'],
      },
      {
        component: 'select',
        name: 'frontmatter.topic',
        label: 'Topic',
        description: 'Select the content topic for this resource.',
        options: ['business', 'development', 'finance', 'law'],
      },
      {
        component: 'text',
        name: 'frontmatter.subtopic',
        label: 'subtopic',
        description: 'Provide one subtopic which this document refers to',
      },
      {
        component: 'select',
        name: 'frontmatter.level',
        label: 'level',
        description: 'Choose a difficulty level for the document',
        options: ['beginner', 'intermediate', 'advanced'],
      },
      {
        name: 'frontmatter.root',
        label: 'Is Root?',
        component: 'toggle',
        toggleLabels: {
          true: true,
          false: false,
        },
        required: false,
      },
      {
        name: 'frontmatter.body',
        label: 'Document Body',
        description: 'Use the rich text editor to compose or copy and paste markdown content.',
        component: 'markdown',
      },
    ],
  };

  return useGithubMarkdownForm(mdFile, navFormOptions);
};

export default useEditFrontmatterForm;
