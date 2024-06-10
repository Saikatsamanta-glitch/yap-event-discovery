import { Button, Flex, Heading } from '@/components';
import { DefaultTicketIcon } from '@/components/Icons';
import ShareEvent from '@/components/ShareEvent';
import React from 'react';
import { getImageURL } from '@/components/utils';
import { Text } from '@/components';
import Image from 'next/image';

export const Tickets = ({ sitemap, forMobileView, presetKey = '' }) => {
  return (
    <div
      className="event-detail-card--ticket"
      data-mobileview={Boolean(forMobileView)}
    >
      {sitemap.map((siteCard) => {
        const eventLogo = getImageURL({
          key: siteCard?.logo,
          width: 35,
          height: 35,
        });
        return (
          <div className="event-detail-card--ticket__card" key={siteCard.name}>
            {siteCard?.logo ? (
              <img
                src={eventLogo}
                className={'event-detail-card--ticket__card-card-ticket-logo'}
                alt="logo"
                data-qa-selector={`${presetKey}event_details_page_get_tickets_logo`}
              />
            ) : (
              <DefaultTicketIcon />
            )}
            <h5
              data-qa-selector={`${presetKey}event_details_page_event_source_label`}
            >
              {siteCard?.name}
            </h5>
            <Button
              dataQaSelector={`${presetKey}event_details_page_get_tickets`}
              as="a"
              href={
                process.env.NEXT_PUBLIC_APPLICATION_ENVIRONMENT === 'production'
                  ? `${siteCard.event_url}?utm_source=event_page&utm_medium=events&utm_campaign=cta&utm_term=get_tickets`
                  : siteCard.event_url
              }
              target="_blank"
              variant="solid"
              className="event-detail-card--ticket__card-link"
            >
              Get Tickets
            </Button>
          </div>
        );
      })}
    </div>
  );
};

const EventDetailCard = ({
  price,
  timeZoneFormattedDate,
  data,
  eventName,
  decodedEventLocation,
  showTickets = true,
  isEventOver,
  sitemap,
  presetKey = '',
  heading,
}) => {
  return (
    <>
      {' '}
      <div className="event-detail-card--info">
        {heading}
        <div className="event-detail-card--info__date">
          <div className="event-detail-card--info-icon">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Clock-light.svg`}
              alt={'Clock Light Icon'}
              width={26}
              height={26}
              className={'event-icons-light'}
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Clock-dark.svg`}
              alt={'Clock Dark Icon'}
              width={20}
              height={20}
              className={'event-icons-dark'}
            />
          </div>
          <Flex flexDirection="column" gap="12">
            <h5
              className="event-detail-card--info__date-text"
              data-qa-selector={`${presetKey}event_details_page_event_date_label`}
            >
              {`${timeZoneFormattedDate || '-'}`}
            </h5>
          </Flex>
        </div>
        <div className="event-detail-card--info__location">
          <div className="event-detail-card--info-icon">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Location-light.svg`}
              alt={'Location Light Icon'}
              width={26}
              height={26}
              className={'event-icons-light'}
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Location-dark.svg`}
              alt={'Location Dark Icon'}
              width={20}
              height={20}
              className={'event-icons-dark'}
            />
          </div>
          <Flex flexDirection="column" gap="12">
            <a href={`/search?q=${decodedEventLocation}&type=venue`}>
              <Heading
                level="5"
                dataQaSelector={`${presetKey}event_details_page_venue_link`}
                className="event-detail-card--info__location-text"
              >
                {decodedEventLocation || ''}
              </Heading>
            </a>
          </Flex>
        </div>
        <div className="event-detail-card--info__pricing">
          <div className="event-detail-card--info-icon">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Wallet-light.svg`}
              alt={'Wallet Light Icon'}
              width={26}
              height={26}
              className={'event-icons-light'}
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Wallet-dark.svg`}
              alt={'Wallet Dark Icon'}
              width={18}
              height={18}
              className={'event-icons-dark'}
            />
          </div>
          <Text
            data-qa-selector={`${presetKey}event_details_page_event_price_label`}
          >
            {price}
          </Text>
        </div>
        {isEventOver || !showTickets ? null : <Tickets sitemap={sitemap} />}
      </div>
      <div className="event-detail-card--info__share">
        <Heading
          fancy
          level="4"
          dataQaSelector={`${presetKey}event_details_page_invite_your_friends_label`}
        >
          Invite your friends to this event
        </Heading>
        <ShareEvent
          title={data?.name}
          url={`${process.env.NEXT_PUBLIC_HOST_URL}/events/${data.id}-${eventName}`}
          presetKey={presetKey}
        />
      </div>
      {/* <PromotionalImage
        gridView={false}
        ctaUrl={
          process.env.NEXT_PUBLIC_APPLICATION_ENVIRONMENT === 'production'
            ? 'https://boxoffice.yapsody.com/ticketing/signup?utm_campaign=portal_eventdiscovery_ad_cta'
            : 'https://boxoffice.yapsody.com/ticketing/signup'
        }
        className="event-detail--promotional-image__square"
        dataQaSelector="mobile_event_details_page_promo_card_image"
        imageUrl={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/promotional_images/promotional_image.jpg`}
      /> */}
      {/* <PromotionalImage
        gridView={false}
        ctaUrl={
          process.env.NEXT_PUBLIC_APPLICATION_ENVIRONMENT === 'production'
            ? 'https://boxoffice.yapsody.com/ticketing/signup?utm_campaign=portal_eventdiscovery_ad_cta'
            : 'https://boxoffice.yapsody.com/ticketing/signup'
        }
        className="event-detail--promotional-image__horizontal"
        dataQaSelector="event_details_page_promo_card_image"
        imageUrl={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/promotional_images/horizontal_promotional_image.jpg`}
      /> */}
    </>
  );
};

export default EventDetailCard;
