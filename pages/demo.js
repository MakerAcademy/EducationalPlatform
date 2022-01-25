import { useRouter } from 'next/router';
import SingleLayout from '../layouts/SingleLayout';
import Head from 'next/head';
import { useState } from 'react';
import { Grid, Textarea } from 'theme-ui';
import { jsx, Box, Flex, Text, Radio, Divider, Label, Button, Input } from 'theme-ui';

const Page = () => {
  const [mobile, setMobile] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [topic, setTopic] = useState('');
  const [body, setBody] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();
    console.log('submitted');
    const form = document.getElementById('createUserForm');
    const res = await fetch('/api/demo', {
      body: JSON.stringify({
        action: 'createUser',
        userid: form.elements['id'].value,
        email: form.elements['email'].value,
        name: form.elements['name'].value,
        role: form.elements['role'].value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const result = await res.json();
  };

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    console.log('submitted');
    const form = document.getElementById('createDocumentForm');
    const res = await fetch('/api/demo', {
      body: JSON.stringify({
        action: 'createDocument',
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

  const handleReadDocument = async (e) => {
    e.preventDefault();
    const form = document.getElementById('readDocumentForm');
    const res = await fetch('/api/demo', {
      body: JSON.stringify({
        action: 'readDocument',
        title: form.elements['title'].value,
        author: form.elements['author'].value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const result = await res.json();
    console.log(result);
    setTitle(result.Item.title.S);
    setAuthor(result.Item.author.S);
    setTopic(result.Item.topic.S);
    setBody(result.Item.body.S);
  };

  const handleUpdateDocument = async (e) => {
    e.preventDefault();
    console.log('submitted');
    const form = document.getElementById('updateDocumentForm');
    const res = await fetch('/api/demo', {
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
      method: 'POST',
    });
    const result = await res.json();
  };

  const handleDeleteDocument = async (e) => {
    e.preventDefault();
    const form = document.getElementById('deleteDocumentForm');
    const res = await fetch('/api/demo', {
      body: JSON.stringify({
        action: 'deleteDocument',
        title: form.elements['title'].value,
        author: form.elements['author'].value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
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
            <Box as="form" id="createUserForm" onSubmit={handleCreateUser}>
              <h2>Create User</h2>

              <Box>
                <Label htmlFor="id">User ID</Label>
                <Input id="id" placeholder={'id'} />
              </Box>
              <Box>
                <Label htmlFor="email">email</Label>
                <Input id="email" placeholder={'email'} />
              </Box>
              <Box>
                <Label htmlFor="name">name</Label>
                <Input id="name" placeholder={'name'} />
              </Box>
              <Box>
                <Label>Role</Label>
                <Flex mb={3}>
                  <Label>
                    <Radio name="role" value="Learner" defaultChecked={true} /> Learner
                  </Label>
                  <Label>
                    <Radio name="role" value="Creator" /> Creator
                  </Label>
                  <Label>
                    <Radio name="role" value="Editor " /> Editor
                  </Label>
                </Flex>
              </Box>
              <Flex css={{ marginTop: 20, justifyContent: 'flex-end' }}>
                <Button type="submit">Create New User</Button>
              </Flex>
            </Box>
            <Divider />
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
            <Box as="form" id="readDocumentForm" onSubmit={handleReadDocument}>
              <h2>Read Document</h2>

              <Box>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder={'title'} />
              </Box>
              <Box>
                <Label htmlFor="author">Author</Label>
                <Input id="author" placeholder={'author'} />
              </Box>
              <Flex css={{ marginTop: 20, justifyContent: 'flex-end' }}>
                <Button type="submit">Fetch Document</Button>
              </Flex>
            </Box>
            <Box>
              <h2>{title}</h2>
              <h3>{author}</h3>
              <h3>{topic}</h3>
              <Box>{body}</Box>
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
