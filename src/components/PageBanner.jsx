'use client';

import Overlay from './Overlay';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Button, Flex, Heading, Icons, LazyImage, Text } from '@/components';

const PageBanner = ({ ctaUrl, preset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  let timer;

  const handleShowBannerTimer = () => {
    const bannerState = localStorage.getItem('initialBannerState');
    timer = setInterval(() => {
      const time = JSON.parse(bannerState).time;
      const difference = dayjs().diff(time, 'hour');
      if (difference >= 48) {
        clearInterval(timer);
        setIsOpen(true);
        localStorage.setItem(
          'initialBannerState',
          JSON.stringify({
            isOpen: true,
            isTimerOn: false,
            initialLoadTime: dayjs().add(30, 'second'),
          })
        );
      }
    }, 1000);
  };

  const handleBannerState = (time, isCurrentTimeGreater) => {
    if (!isCurrentTimeGreater) {
      return setTimeout(() => {
        setShowBanner(true);
        setIsOpen(true);
      }, Math.abs(time));
    }
  };

  const getInitialBannerLoadTime = () => {
    const bannerState = localStorage.getItem('initialBannerState');

    const initalLoadTime = JSON.parse(bannerState).initialLoadTime;

    const time = dayjs().diff(initalLoadTime);

    const isCurrentTimeGreater = dayjs().isAfter(initalLoadTime);

    return { time, isCurrentTimeGreater };
  };

  useEffect(() => {
    const bannerState = localStorage.getItem('initialBannerState');
    let bannerShowTimer;
    if (!bannerState) {
      localStorage.setItem(
        'initialBannerState',
        JSON.stringify({
          isOpen: true,
          initialLoadTime: dayjs().add(30, 'second'),
        })
      );

      bannerShowTimer = handleBannerState(30000, false);
    } else {
      const data = JSON.parse(bannerState);

      if (data?.initialLoadTime) {
        const { time, isCurrentTimeGreater } = getInitialBannerLoadTime();
        if (isCurrentTimeGreater && data?.isOpen) {
          setIsOpen(true);
          setShowBanner(true);
        } else {
          bannerShowTimer = handleBannerState(time, isCurrentTimeGreater);
        }
      }

      if (data.isTimerOn) {
        handleShowBannerTimer();
      }
    }

    return () => {
      clearTimeout(bannerShowTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="global-banner">
      {showBanner ? (
        <Overlay
          open={isOpen}
          showHeader={false}
          className="global-banner__overlay-wrapper"
          dataQaSelector={`${preset}_your_event`}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LazyImage
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/page_overlay_background.jpg`}
              alt="page_overlay_background"
              width={568}
              height={443}
              className={'global-banner__overlay-background-image'}
            />

            <button
              className="global-banner__close-icon"
              aria-label="Close"
              data-qa-selector={`${preset}_your_event_overlay_close_button`}
              onClick={() => {
                localStorage.setItem(
                  'initialBannerState',
                  JSON.stringify({
                    time: dayjs(),
                    isOpen: false,
                    isTimerOn: true,
                  })
                );
                handleShowBannerTimer();
                setIsOpen(false);
              }}
            >
              <Icons.CloseIcon />
            </button>

            <Flex
              flexDirection="column"
              gap="40"
              alignItems="center"
              className="global-banner__overlay-content-wrapper"
            >
              <Flex flexDirection="column" gap="20">
                <Flex flexDirection="column" gap="32">
                  <Flex
                    flexDirection="column"
                    gap="4"
                    dataQaSelector={`${preset}_your_event_overlay_title_label`}
                    className="global-banner__overlay-content-heading"
                  >
                    <Heading level="1">List Your Events</Heading>
                    <Heading level="1">Sell Tickets Online!</Heading>
                  </Flex>
                  <Text
                    dataQaSelector={`${preset}_your_event_overlay_description_label`}
                  >
                    Create, promote, and sell tickets for your event
                    effortlessly.
                  </Text>
                </Flex>
                <Text>
                  We offer a flat 50% rebate to non-profit organizations, and
                  our platform is free for free events.
                </Text>
              </Flex>

              <Button
                as="a"
                href={ctaUrl}
                target="_blank"
                dataQaSelector={`${preset}_your_event_overlay_book_a_call`}
                className="global-banner__overlay-content-button"
              >
                Book a Call
              </Button>
            </Flex>
          </div>
        </Overlay>
      ) : null}
    </div>
  );
};

export default PageBanner;
