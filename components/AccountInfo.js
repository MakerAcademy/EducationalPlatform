import React from 'react';
import { Box, Flex, Radio, Divider, Label, Button, Input } from 'theme-ui';

const AccountSettings = () => {
  return (
    <Box>
      <Box>
        <h1>Account Settings</h1>
      </Box>
      <Box>
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="Pedro Duarte" />
      </Box>
      <Box>
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@peduarte" />
      </Box>
      <Box>
        <Label>Role</Label>
        <Flex mb={3}>
          <Label>
            <Radio name="letter" /> Learner
          </Label>
          <Label>
            <Radio name="letter" /> Educator
          </Label>
          <Label>
            <Radio name="letter" /> Editor
          </Label>
        </Flex>
      </Box>
      <Flex css={{ marginTop: 20, justifyContent: 'flex-end' }}>
        <Button>Save changes</Button>
      </Flex>
      <Divider />
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

export default AccountSettings;
