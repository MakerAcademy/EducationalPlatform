import React from 'react';
import { Box, Flex, Text, Label, Button, Input } from 'theme-ui';

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
      <Flex css={{ marginTop: 20, justifyContent: 'flex-end' }}>
        <Button>Save changes</Button>
      </Flex>
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
