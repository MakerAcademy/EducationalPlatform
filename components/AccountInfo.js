/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx, Box, Flex, Text, Radio, Divider, Label, Button, Input } from 'theme-ui';
import { useUser } from '@auth0/nextjs-auth0';

const AccountSettingsForm = () => {
  const { user, error, isLoading } = useUser();
  const name = user ? user.name : 'Your Name';
  const username = user ? user.nickname : 'Your Username';

  return (
    <Box>
      <Box>
        <h1>Account Settings</h1>
      </Box>
      <Box>
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue={name} />
      </Box>
      <Box>
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue={username} />
      </Box>
      <Box>
        <Label>Role</Label>
        <Flex mb={3}>
          <Label>
            <Radio name="learner-role" defaultChecked={true} /> Learner
          </Label>
          <Label>
            <Radio name="educator-role" /> Educator
          </Label>
          <Label>
            <Radio name="editor-role" /> Editor
          </Label>
        </Flex>
      </Box>
      <Flex css={{ marginTop: 20, justifyContent: 'flex-end' }}>
        <Button>Save changes</Button>
      </Flex>
      <Divider />
      <Text>Change your password here. After saving, you'll be logged out.</Text>
      <Box>
        <Label htmlFor="currentPassword">Current password</Label>
        <Input id="currentPassword" type="password" />
      </Box>
      <Box>
        <Label htmlFor="newPassword">New password</Label>
        <Input id="newPassword" type="password" />
      </Box>
      <Box>
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input id="confirmPassword" type="password" />
      </Box>
      <Flex css={{ marginTop: 20, justifyContent: 'flex-end' }}>
        <Button>Change password</Button>
      </Flex>
    </Box>
  );
};

export default AccountSettingsForm;
