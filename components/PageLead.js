import { Container, jsx, Heading, Text, Flex, Link as ThemeLink, Button } from 'theme-ui';
import { InlineText } from 'react-tinacms-inline';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import { useState } from 'react';
import VideoModal from './Dialog';

const PageLead = ({ cta, mobile }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Container>
      <Flex sx={{ py: [4, 4, 6], flexDirection: 'column', position: 'relative' }}>
        <Icon
          color="textMuted"
          name="rect_1"
          size="100px"
          sx={{
            position: 'absolute',
            left: mobile ? '5%' : '30%',
            transform: mobile ? 'scale(0.5, 0.5)' : undefined,
            top: mobile ? '-10%' : '30px',
          }}
        />
        <Icon
          color="textMuted"
          name="rect_2"
          size="120px"
          sx={{
            position: 'absolute',
            top: mobile ? '-50px' : '85px',
            right: mobile ? '30%' : '200px',
            transform: mobile ? 'scale(0.5, 0.5)' : undefined,
          }}
        />
        <Icon
          color="textMuted"
          name="rect_3"
          size="160px"
          sx={{
            position: 'absolute',
            top: mobile ? '-50px' : '200px',
            right: mobile ? '-5%' : '25px',
            transform: mobile ? 'scale(0.3, 0.3)' : undefined,
          }}
        />
        <Icon
          color="textMuted"
          name="rect_4"
          size="120px"
          sx={{
            position: 'absolute',
            bottom: mobile ? '-15%' : '65px',
            right: mobile ? '10%' : '225px',
            transform: mobile ? 'scale(0.5, 0.5)' : undefined,
          }}
        />
        <Icon
          color="textMuted"
          name="rect_5"
          size="115px"
          sx={{
            position: 'absolute',
            bottom: mobile ? '-60%' : '-50px',
            left: mobile ? '60%' : '400px',
            transform: mobile ? 'translate(-100%, -100%) scale(0.5, 0.5);' : undefined,
          }}
        />
        <Icon
          color="textMuted"
          name="rect_6"
          size="180px"
          sx={{
            position: 'absolute',
            bottom: mobile ? '20px' : '40px',
            left: mobile ? undefined : '-65px',
            right: mobile ? '67%' : undefined,
            transform: mobile ? 'scale(0.4, 0.4)' : undefined,
          }}
        />
        <Heading variant="megaHeading">
          <InlineText name="primaryNavHeader" />
        </Heading>
        <Heading sx={{ color: 'onBackgroundMuted' }} variant="megaSubHeading">
          <InlineText name="secondaryNavHeader" />
        </Heading>
        <Flex sx={{ flexDirection: 'column', pl: [5, 7], mt: 3, width: ['100%', '75%'] }}>
          <Text
            className="subtext"
            sx={{
              color: 'onBackgroundMuted',
              mb: 2,
            }}
          >
            <InlineText name="subtext" />
          </Text>
          <Link href="/">
            <Flex sx={{ alignItems: 'center' }}>
              <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
              <ThemeLink>{cta}</ThemeLink>
            </Flex>
          </Link>
          <VideoModal
            cta={cta}
            style={{
              overlay: {
                position: 'fixed',
                zIndex: 1020,
                top: 0,
                left: 0,
                width: '560',
                height: '315',
                background: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              content: {
                top: 'auto',
                left: 'auto',
                right: 'auto',
                bottom: 'auto',
                width: '560',
                padding: '0',
              },
            }}
            children={
              <iframe
                width="560"
                height="315"
                src="https://www.youtube-nocookie.com/embed/BWqcw4lWoBM?controls=0"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            }
          />
        </Flex>
      </Flex>
    </Container>
  );
};

export default PageLead;
