import {
  ArtistCard,
  GetDirections,
  Heading,
  Text,
  ToggleDescription,
} from '@/components';
import React from 'react';
import EventDetailCard from './EventDetailCard';
import { getDecodedText, hasHtmlEntities } from '@/components/utils';
import Image from 'next/image';

export const EventDetail = ({
  event,
  artists,
  organizer,
  children,
  decodedEventLocation,
  decodedEventName,
  ...rest
}) => {
  const latitude = event?.location?.latitude;
  const longitude = event?.location?.longitude;
  const address = getDecodedText({ text: event?.location?.address });
  // Convert milliseconds to seconds
  const eventStartDate = new Date(event?.start_date)?.getTime() / 1000;
  const eventEndDate =
    new Date(event?.end_date || event?.start_date)?.getTime() / 1000;

  const eventExactLocation =
    latitude && longitude
      ? `lat=${latitude}&lng=${longitude}`
      : `address=${address}`;

  let eventDescription = hasHtmlEntities(event?.description)
    ? getDecodedText({ text: event?.description })
    : event?.description;
  // Double checking if HTML-Entities are present are not
  eventDescription = hasHtmlEntities(eventDescription)
    ? getDecodedText({ text: eventDescription })
    : eventDescription;

  const organizerName = getDecodedText({
    text: organizer?.name,
  });

  const filteredArtists = artists?.filter(
    (artist) => artist?.name?.trim() !== ''
  );

  return (
    <div className="event-detail-card--event-detail">
      <div className="event-detail-card-info--left">
        <EventDetailCard
          heading={
            <Text
              data-qa-selector={`mobile_event_details_page_event_title_label`}
              className="event-detail-card--info__heading"
            >
              {decodedEventName}
            </Text>
          }
          presetKey="mobile_"
          showTickets={false}
          decodedEventLocation={decodedEventLocation}
          {...rest}
        />
      </div>
      {event?.description?.trim() ? (
        <div className="event-detail--about-event">
          <Heading
            level="2"
            fancy
            dataQaSelector="event_details_page_about_the_event_label"
          >
            About the Event
          </Heading>
          <ToggleDescription
            dataQaSelector="event_details_page_event_description"
            description={eventDescription}
          />
        </div>
      ) : null}
      {children}
      {event?.location?.name !== 'online' ? (
        <div className="event-detail--map" id="event-detail-map-section">
          <Heading
            level="2"
            fancy
            dataQaSelector="event_details_page_location_label"
          >
            Location
          </Heading>
          <div className="event-detail--map__location">
            <div className="event-detail--map__location--heading-container">
              <div
                className="event-detail--map__location-icon"
                data-qa-selector="event_details_page_venue_image"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Location-light.svg`}
                  alt={'Location Light Icon'}
                  width={25}
                  height={32}
                  className={'event-icons-light'}
                />
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Location-dark.svg`}
                  alt={'Location Dark Icon'}
                  width={18}
                  height={18}
                  className={'event-icons-dark'}
                />
              </div>
              <Heading level="5" className="event-detail--map__location-text">
                <a
                  href={`/search?q=${decodedEventLocation}&type=venue`}
                  className="event-detail--map__location-link"
                  data-qa-selector="event_details_page_venue_label"
                >
                  {decodedEventLocation || ''}
                </a>
                <br />
                {event?.location?.address ? (
                  <span
                    className="event-detail--map__location-sub-text"
                    data-qa-selector="event_details_page_address_label"
                  >
                    {address}
                  </span>
                ) : null}
              </Heading>
            </div>
            <GetDirections
              location={event?.location}
              className="event-detail--map__location-button"
            />
          </div>
          <iframe
            title="Event Details Find a place to stay Map"
            src={`https://www.stay22.com/embed/gm?aid=${process.env.NEXT_PUBLIC_STAY22_AFFILIATE_ID}&${eventExactLocation}&eventstart=${eventStartDate}&eventend=${eventEndDate}&eseetz=auto`}
            id="event-details-find-place-t0-stay-widget"
            className="event-detail--map-iframe"
            data-qa-selector="event_details_page_stay_22_map"
            width="100%"
            height="400px"
          ></iframe>
        </div>
      ) : null}
      {filteredArtists?.length ? (
        <div className="event-detail--artist">
          <Heading
            fancy
            level="2"
            dataQaSelector="event_details_page_artist_label"
            className="event-detail--artist--heading"
          >
            Artist
          </Heading>
          <div className="event-detail--artist--container">
            {filteredArtists?.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                dataQaSelector="event_details_page"
              />
            ))}
          </div>
        </div>
      ) : null}
      {organizer ? (
        <div className="event-detail--organizers">
          <Heading
            fancy
            level="2"
            dataQaSelector="event_details_page_organizer_label"
          >
            Organizers
          </Heading>
          <a href={`/search?q=${organizerName}&type=organizer`}>
            <Heading
              level="5"
              dataQaSelector="event_details_page_artist_name_label"
              className="event-detail--organizers-name"
            >
              {organizerName}
            </Heading>
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default EventDetail;
