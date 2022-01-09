import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { Flex, Box, Link as ThemeLink } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import router, { useRouter } from 'next/router';

const VideoModal = (props) => {
  const router = useRouter();
  return (
    <Flex>
      <Link href={'/?clicked=${true}'} as="/">
        <Flex sx={{ alignItems: 'center' }}>
          <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
          <ThemeLink>{props.cta}</ThemeLink>
        </Flex>
      </Link>
      <Modal
        isOpen={!!router.query.clicked}
        onRequestClose={() => router.push('/')}
        style={props.style}
      >
        {props.children}
      </Modal>
    </Flex>
  );
};

export default VideoModal;
