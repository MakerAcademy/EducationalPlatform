import { useRouter } from 'next/router';
import SingleLayout from '../layouts/SingleLayout';
import Head from 'next/head';
import { useState } from 'react';
import { Grid, Textarea } from 'theme-ui';
import { jsx, Box, Flex, Text, Radio, Divider, Label, Button, Input } from 'theme-ui';

const Page = () => {
  const [mobile, setMobile] = useState(false);
  const router = useRouter();
  const [count, setCount] = useState(0);

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    console.log('submitted');
    const form = document.getElementById('createDocumentForm');
    const res = await fetch('/api/mongodb/document', {
      body: JSON.stringify({
        title: form.elements['title'].value,
        author: form.elements['author'].value,
        topic: form.elements['topic'].value,
        body: form.elements['body'].value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const result = await res.json();
  };

  const handleGetDocumentsList = async (e) => {
    e.preventDefault();
    const form = document.getElementById('readDocumentForm');
    const res = await fetch('/api/mongodb/document', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    const result = await res.json();
    console.log(result);
    setCount(result.message.length);
  };

  const handleUpdateDocument = async (e) => {
    e.preventDefault();
    console.log('submitted');
    const form = document.getElementById('updateDocumentForm');
    const res = await fetch('/api/mongodb/document', {
      body: JSON.stringify({
        action: 'updateDocument',
        title: form.elements['title'].value,
        author: form.elements['author'].value,
        topic: form.elements['topic'].value,
        body: form.elements['body'].value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    const result = await res.json();
  };

  const handleDeleteDocument = async (e) => {
    e.preventDefault();
    const form = document.getElementById('deleteDocumentForm');
    const res = await fetch('/api/mongodb/document', {
      body: JSON.stringify({
        action: 'deleteDocument',
        title: form.elements['title'].value,
        author: form.elements['author'].value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });

    const result = await res.json();
  };

  return (
    <SingleLayout mobile={mobile} router={router}>
      <Head>
        <title>Demo Page</title>
      </Head>
      <Grid columns={[3, '1fr 2fr 1fr']} gap="0">
        <Box />
        <Box
          sx={{
            borderRadius: 0,
            py: 0,
            px: 4,
            pb: 4,
            border: mobile ? undefined : 'solid',
            borderColor: 'muted',
            borderWidth: '0 0 0 0',
          }}
        >
          <Box>
            <Box>
              <h1>Demo Forms</h1>
            </Box>
            <Box as="form" id="createDocumentForm" onSubmit={handleCreateDocument}>
              <h2>Create Document</h2>

              <Box>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder={'title'} />
              </Box>
              <Box>
                <Label htmlFor="author">Author</Label>
                <Input id="author" placeholder={'author'} />
              </Box>
              <Box>
                <Label htmlFor="topic">Topic</Label>
                <Input id="topic" placeholder={'topic'} />
              </Box>
              <Box>
                <Label htmlFor="body">Document Body</Label>
                <Textarea id="body" placeholder="body" />
              </Box>
              <Flex css={{ marginTop: 20, justifyContent: 'flex-end' }}>
                <Button type="submit">Create New Document</Button>
              </Flex>
            </Box>
            <Divider />
            <Box as="form" id="readDocumentForm" onSubmit={handleGetDocumentsList}>
              <h2>Get Number of Documents</h2>
              <Box>
                <h2>Doc Count: {count}</h2>
              </Box>
              <Flex css={{ marginTop: 20, justifyContent: 'flex-end' }}>
                <Button type="submit">Fetch Document Count</Button>
              </Flex>
            </Box>
            <Divider />
            <Box as="form" id="deleteDocumentForm" onSubmit={handleDeleteDocument}>
              <h2>Delete Document</h2>

              <Box>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder={'title'} />
              </Box>
              <Box>
                <Label htmlFor="author">Author</Label>
                <Input id="author" placeholder={'author'} />
              </Box>
              <Flex css={{ marginTop: 20, justifyContent: 'flex-end' }}>
                <Button type="submit">Delete Document</Button>
              </Flex>
            </Box>
            <Divider />
            <Box as="form" id="updateDocumentForm" onSubmit={handleUpdateDocument}>
              <h2>Update Document</h2>

              <Box>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder={'title'} />
              </Box>
              <Box>
                <Label htmlFor="author">Author</Label>
                <Input id="author" placeholder={'author'} />
              </Box>
              <Box>
                <Label htmlFor="topic">Topic</Label>
                <Input id="topic" placeholder={'topic'} />
              </Box>
              <Box>
                <Label htmlFor="body">Document Body</Label>
                <Textarea id="body" placeholder="body" />
              </Box>
              <Flex css={{ marginTop: 20, justifyContent: 'flex-end' }}>
                <Button type="submit">Update Document</Button>
              </Flex>
            </Box>
          </Box>
        </Box>
        <Box />
      </Grid>
    </SingleLayout>
  );
};

export default Page;
