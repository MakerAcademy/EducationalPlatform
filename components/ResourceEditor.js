import { usePlugin, useFormScreenPlugin } from 'tinacms';
import { useGithubToolbarPlugins } from 'react-tinacms-github';
import { InlineForm } from 'react-tinacms-inline';
import { InlineWysiwyg } from 'react-tinacms-editor';
import useEditFrontmatterForm from '@hooks/useEditFrontmatterForm';
import { useGithubMarkdownForm } from 'react-tinacms-github';
import MarkdownWrapper from '@components/MarkdownWrapper';
import { useMarkdownForm } from 'next-tinacms-markdown';

const ResourceEditor = ({ file, preview, cms }) => {
  useGithubToolbarPlugins();
  const [fmData, fmForm] = useEditFrontmatterForm(file, preview);
  useFormScreenPlugin(fmForm);

  const [data, form] = useGithubMarkdownForm(file);
  usePlugin(form);

  return (
    <InlineForm form={form}>
      <InlineWysiwyg
        name="markdownBody"
        sticky="62px"
        imageProps={{
          uploadDir: () => '/images/',
          parse: ({ id }) => id,
          previewSrc(src) {
            return cms.media.previewSrc(src);
          },
        }}
        focusRing={{ offset: { x: 35, y: 0 }, borderRadius: 0 }}
      >
        <MarkdownWrapper source={data.markdownBody} />
      </InlineWysiwyg>
    </InlineForm>
  );
};

export default ResourceEditor;
