import { useCMS, usePlugins } from 'tinacms';
import slugify from 'slugify';
import { FORM_ERROR } from 'final-form';
import { MarkdownFieldPlugin } from 'react-tinacms-editor';

import { toMarkdownString } from '@utils';
import { removeInvalidChars } from '../utils/removeInvalidChars';

const useCreateDocument = (resources) => {
  const cms = useCMS();
  cms.plugins.add(MarkdownFieldPlugin);

  usePlugins([
    {
      __type: 'content-creator',
      name: 'Add a new resource',
      fields: [
        {
          name: 'title',
          label: 'Title',
          component: 'text',
          required: true,
          validate(value, allValues, meta, field) {
            if (!value) {
              return 'A title is required';
            }
            if (
              resources.some(
                (post) => post.data.frontmatter.titleURL === slugify(value, { lower: true })
              )
            ) {
              return 'Sorry the document title must be unique';
            }
          },
        },
        {
          name: 'description',
          label: 'Description',
          component: 'text',
          required: true,
          validate(value, allValues, meta, field) {
            if (!value) {
              return 'A description is required';
            }
          },
        },
        {
          component: 'select',
          name: 'contentType',
          label: 'Content Type',
          description: 'Select the content type for this resource.',
          options: ['programs', 'topics'],
          required: true,
          validate(value, allValues, meta, field) {
            if (!value) {
              return 'Content type is required';
            }
          },
        },
        {
          component: 'select',
          name: 'Topic',
          label: 'Topic',
          description: 'Select the content topic for this resource.',
          options: ['business', 'development', 'finance', 'law'],
          required: true,
          validate(value, allValues, meta, field) {
            if (!value) {
              return 'Content topic is required';
            }
          },
        },
        {
          component: 'tags',
          name: 'subtopic',
          label: 'subtopic',
          description: 'Provide one subtopic which this document refers to',
          required: true,
          validate(value, allValues, meta, field) {
            if (!value) {
              return 'Subtopic is required';
            }
          },
        },
        {
          component: 'select',
          name: 'level',
          label: 'level',
          description: 'Choose a difficulty level for the document',
          options: ['beginner', 'intermediate', 'advanced'],
          required: true,
          validate(value, allValues, meta, field) {
            if (!value) {
              return 'Difficulty level is required';
            }
          },
        },
        {
          component: 'select',
          name: 'level',
          label: 'level',
          description: 'Choose a difficulty level for the document',
          options: ['beginner', 'intermediate', 'advanced'],
          required: true,
          validate(value, allValues, meta, field) {
            if (!value) {
              return 'Difficulty level is required';
            }
          },
        },
        {
          name: 'root',
          label: 'Is Root?',
          component: 'toggle',
          toggleLabels: {
            true: true,
            false: false,
          },
          required: false,
        },
        {
          name: 'body',
          label: 'Document Body',
          description: 'Use the rich text editor to compose or copy and paste markdown content.',
          component: 'markdown',
        },
      ],
      onSubmit: async (form, cms) => {
        const github = cms.api.github;

        const slug = removeInvalidChars(slugify(form.title, { lower: true }));
        const fileRelativePath = `content/${form.contentType}/${form.topic}/${slug}.md`;
        const rawMarkdownBody = form.body;

        form.titleURL = slug;
        form.date = form.date || new Date().toString();
        // form.author = (await github.getUser()).name;
        delete form.body;

        return await github
          .commit(
            fileRelativePath,
            null,
            toMarkdownString({
              rawFrontmatter: {
                ...form,
              },
              rawMarkdownBody,
            }),
            `Created new document: ${form.title}`
          )
          .then((response) => {
            cms.alerts.success(`Document committed successfully to branch: ${github.branchName}.`);
          })
          .catch((e) => {
            cms.alerts.error('Error committing document');
            console.error(`Error committing document: ${e}`);
            return { [FORM_ERROR]: e };
          });
      },
    },
  ]);
};

export default useCreateDocument;
