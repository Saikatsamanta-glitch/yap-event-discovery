import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advanced from 'dayjs/plugin/advancedFormat';
import { decode } from 'html-entities';

dayjs.extend(utc);

export const getWeekendStartDateInfo = (startDate) => {
  const weekendStartDate = dayjs(startDate);
  const currentDate = dayjs().utc();
  const isWeekendStarted = weekendStartDate.isBefore(currentDate);
  return isWeekendStarted
    ? currentDate.format('YYYY-MM-DDTHH:mm:ss[Z]')
    : startDate;
};

export const getTimeRange = (time) => {
  switch (time) {
    case 'today':
      return {
        id: 'today',
        name: 'Today',
        query: {
          today_current_date: dayjs().utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
          today_end_date: dayjs()
            .utc()
            .endOf('day')
            .format('YYYY-MM-DDTHH:mm:ss[Z]'),
        },
      };
    case 'tomorrow':
      return {
        id: 'tomorrow',
        name: 'Tomorrow',
        query: {
          tomorrow_start_date: dayjs()
            .add(1, 'day')
            .utc()
            .startOf('day')
            .format('YYYY-MM-DDTHH:mm:ss[Z]'),
          tomorrow_end_date: dayjs()
            .add(1, 'day')
            .utc()
            .endOf('day')
            .format('YYYY-MM-DDTHH:mm:ss[Z]'),
        },
      };
    case 'week':
      return {
        id: 'week',
        name: 'This Week',
        query: {
          week_start_date: dayjs().utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
          week_end_date: dayjs()
            .utc()
            .endOf('week')
            .format('YYYY-MM-DDTHH:mm:ss[Z]'),
        },
      };
    case 'weekend':
      return {
        id: 'weekend',
        name: 'This Weekend',
        query: {
          weekend_start_date: getWeekendStartDateInfo(
            dayjs()
              .utc()
              .startOf('week')
              .add(6, 'day')
              .format('YYYY-MM-DDTHH:mm:ss[Z]')
          ),
          weekend_end_date: dayjs()
            .utc()
            .endOf('week')
            .add(1, 'day')
            .format('YYYY-MM-DDTHH:mm:ss[Z]'),
        },
      };
    default:
      return {
        today: {
          id: 'today',
          name: 'Today',
          query: {
            today_current_date: dayjs().utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
            today_end_date: dayjs()
              .utc()
              .endOf('day')
              .format('YYYY-MM-DDTHH:mm:ss[Z]'),
          },
        },
        tomorrow: {
          id: 'tomorrow',
          name: 'Tomorrow',
          query: {
            tomorrow_start_date: dayjs()
              .add(1, 'day')
              .utc()
              .startOf('day')
              .format('YYYY-MM-DDTHH:mm:ss[Z]'),
            tomorrow_end_date: dayjs()
              .add(1, 'day')
              .utc()
              .endOf('day')
              .format('YYYY-MM-DDTHH:mm:ss[Z]'),
          },
        },
        week: {
          id: 'week',
          name: 'This Week',
          query: {
            week_start_date: dayjs().utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
            week_end_date: dayjs()
              .utc()
              .endOf('week')
              .format('YYYY-MM-DDTHH:mm:ss[Z]'),
          },
        },
        weekend: {
          id: 'weekend',
          name: 'This Weekend',
          query: {
            weekend_start_date: getWeekendStartDateInfo(
              dayjs()
                .utc()
                .startOf('week')
                .add(6, 'day')
                .format('YYYY-MM-DDTHH:mm:ss[Z]')
            ),
            weekend_end_date: dayjs()
              .utc()
              .endOf('week')
              .add(1, 'day')
              .format('YYYY-MM-DDTHH:mm:ss[Z]'),
          },
        },
      };
  }
};

export const getLocalDateFromUTC = ({ utcDate, utcOffset, format }) => {
  dayjs.extend(timezone);
  dayjs.extend(advanced);
  if (!utcDate || !utcOffset) {
    return '';
  }

  const utcDateString = dayjs.utc(utcDate);

  const [offsetHours, offsetMinutes] = utcOffset.split(':').map(Number);

  const localDate =
    offsetHours > 0
      ? utcDateString.add(offsetHours, 'hour').add(offsetMinutes, 'minute')
      : utcDateString
          .subtract(Math.abs(offsetHours), 'hour')
          .subtract(offsetMinutes, 'minute');

  if (format) {
    return localDate.format(format);
  }

  return localDate;
};

export const getTimeZoneFormattedDate = ({
  localDate,
  timezone,
  format = 'ddd, D MMMM | h:mm a',
}) => {
  if (!timezone) {
    return localDate ? localDate?.format(format) : '';
  }

  const timeZoneFormattedDate = localDate
    ? localDate?.tz(timezone)?.format(format)
    : '';

  if (format.includes('zzz')) {
    const splittedDate = timeZoneFormattedDate.split('|');
    const timezone = splittedDate[2]
      ?.split(' ')
      ?.map((str) => str[0])
      ?.join('');

    return splittedDate[0] + '|' + splittedDate[1] + timezone;
  }
  return timeZoneFormattedDate || '-';
};

export function generateSearchQuery({ searchParams }) {
  const time = searchParams.date || '';
  const category = searchParams?.category || '';

  return { ...getTimeRange(time)?.query, category: category };
}

const concert = '/images/concert.jpg';
const concert2 = '/images/concert2.jpg';
const concert3 = '/images/concert3.jpg';
const concert4 = '/images/concert4.jpg';
const concert5 = '/images/concert5.jpg';

export const EVENTS = [
  {
    id: 1,
    eventName: 'World Ocean Day | Beach Cleanup and Sea- riffic After-Party',
    date: 'Thu 15 Jun',
    time: '10 am - 4 pm',
    eventType: 'Community',
    imgSrc: concert,
  },
  {
    id: 2,
    eventName: 'Ice Cube : Concert Show',
    date: 'Thu 15 Jun',
    time: '10 am - 4 pm',
    eventType: 'Concert',
    imgSrc: concert2,
  },
  {
    id: 3,
    eventName: 'Spice Wannabe : The Spice Girls Tribute',
    date: 'Thu 15 Jun',
    time: '10 am - 4 pm',
    eventType: 'Concert',
    imgSrc: concert3,
  },
  {
    id: 4,
    eventName: 'Liquid Sunshine Hard Rock Rooftop Pool Party',
    date: 'Thu 15 Jun',
    time: '10 am - 4 pm',
    eventType: 'Food & Drinks',
    imgSrc: concert4,
  },
  {
    id: 5,
    eventName:
      'Juneteenth - James Weldon and Rosamund Johnson: Social Justice…',
    date: 'Thu 15 Jun',
    time: '10 am - 4 pm',
    eventType: 'Community',
    imgSrc: concert5,
  },
  {
    id: 6,
    eventName: 'George Michael Reborn',
    date: 'Thu 15 Jun',
    time: '10 am - 4 pm',
    eventType: 'Community',
    imgSrc: concert,
  },
  {
    id: 7,
    eventName:
      'Juneteenth - James Weldon and Rosamund Johnson: Social Justice…',
    date: 'Thu 15 Jun',
    time: '10 am - 4 pm',
    eventType: 'Community',
    imgSrc: concert2,
  },
];

export const getHiddenElementCount = (EventGenreCategoryRef) => {
  const parentWidth =
    EventGenreCategoryRef.current.getBoundingClientRect().width;

  const allCategoryItem = document.querySelectorAll('.category-item');

  const elementCount = [...allCategoryItem].filter((item) => {
    return item.offsetLeft >= parentWidth;
  }).length;

  return elementCount;
};

export const getImageURL = ({ key, width, height }) => {
  if (!key) {
    return;
  }
  const path = getFileBase64String({
    key,
    bucket: process.env.NEXT_PUBLIC_IMAGES_BUCKET,
    width,
    height,
  });

  return `${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/${path}`;
};

export const getFileBase64String = ({ key, bucket, width, height }) => {
  const payload = {
    bucket,
    key: key,
    edits: {
      resize: {
        width,
        height,
        fit: 'inside',
        withoutEnlargement: true,
      },
    },
  };

  return btoa(JSON.stringify(payload));
};

export function clientCookiesUtils() {
  if (typeof document === 'undefined') return {};
  let doc = document;
  if (!doc) doc = {};
  if (typeof doc === 'string') doc = { cookie: doc };
  if (doc.cookie === undefined) doc.cookie = '';

  const self = {};
  self.get = function (key) {
    const splat = doc.cookie.split(/;\s*/);
    for (let i = 0; i < splat.length; i++) {
      const ps = splat[i].split('=');
      const k = unescape(ps[0]);
      if (k === key) return unescape(ps[1]);
    }
    return undefined;
  };

  self.set = function (key, value, opts) {
    const expirationDate = new Date();
    expirationDate.setTime(
      // eslint-disable-next-line no-mixed-operators
      expirationDate.getTime() + 365 * 24 * 60 * 60 * 1000
    );
    const expires = 'expires=' + expirationDate.toUTCString();

    if (!opts) {
      opts = {
        expires,
        path: '/',
      };
    }

    let s = escape(key) + '=' + escape(value);

    if (opts.expires) s += '; expires=' + opts.expires;
    if (opts.path) s += '; path=' + escape(opts.path);
    if (opts.domain) s += '; domain=' + escape(opts.domain);
    if (opts.secure) s += '; secure';

    doc.cookie = s;
    return s;
  };
  return self;
}

const getEventTicketOffers = ({ eventData, eventUrl }) => {
  const ticketsAvailability = {
    0: 'https://schema.org/InStock',
    1: 'https://schema.org/SoldOut',
    2: 'https://schema.org/PreOrder',
  };

  const offers =
    eventData?.ticket_offers?.length >= 1
      ? {
          offers: eventData?.ticket_offers?.map((ticket) => {
            return {
              '@type': 'Offer',
              priceCurrency:
                ticket?.currency ||
                eventData?.ticket_offers[0]?.currency ||
                'USD',
              price:
                ticket?.high_price ||
                eventData?.ticket_offers[0]?.high_price ||
                0,
              validFrom:
                ticket?.valid_from || eventData?.ticket_offers[0]?.valid_from,
              availability: ticketsAvailability[ticket?.availability],
              url: eventUrl,
            };
          }),
        }
      : {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: 0,
            validFrom: eventData?.start_date,
            availability: 'https://schema.org/InStock',
            url: eventUrl,
          },
        };

  return offers;
};

const getEventOrganisers = ({ eventData }) => {
  const data =
    eventData?.organizers?.length > 0
      ? {
          organizer: eventData?.organizers?.map((organizer) => {
            return {
              '@type': 'Organization',
              name: organizer?.name || 'No Organizer Assigned',
              url:
                organizer?.website_url || eventData?.sitemaps?.[0]?.event_url,
            };
          }),
        }
      : eventData?.artists?.length > 0
      ? {
          organizer: eventData?.artists?.map((artist) => {
            return {
              '@type': 'Organization',
              name: artist?.name || 'No Organizer Assigned',
              url: eventData?.sitemaps?.[0]?.event_url,
            };
          }),
        }
      : {
          organizer: {
            '@type': 'Organization',
            name: 'No Organizer Assigned',
            url: eventData?.sitemaps?.[0]?.event_url,
          },
        };

  return data;
};

const getEventArtists = ({ eventData }) => {
  const data =
    eventData?.artists?.length > 0
      ? {
          performer: eventData?.artists?.map((artist) => {
            return {
              '@type': 'Person',
              name: artist?.name || 'No Performer Assigned',
            };
          }),
        }
      : eventData?.organizers?.length > 0
      ? {
          performer: eventData?.organizers?.map((organizer) => {
            return {
              '@type': 'Person',
              name: organizer?.name || 'No Performer Assigned',
            };
          }),
        }
      : {
          performer: {
            '@type': 'Person',
            name: 'No Performer Assigned',
          },
        };
  return data;
};

export const generateEventStructureData = ({ eventData }) => {
  const eventType = {
    Business: 'BusinessEvent',
    Festival: 'Festival',
    Sports: 'SportsEvent',
    Music: 'MusicEvent',
    Social: 'SocialEvent',
    Education: 'EducationEvent',
    Event: 'Event',
    Dance: 'DanceEvent',
    Comedy: 'ComedyEvent',
    Screening: 'ScreeningEvent',
    VisualArts: 'VisualArtsEvent',
    Childrens: 'ChildrensEvent',
  };

  const attendanceModeMap = {
    0: 'https://schema.org/OnlineEventAttendanceMode',
    1: 'https://schema.org/OfflineEventAttendanceMode',
    2: 'https://schema.org/MixedEventAttendanceMode',
  };

  const statusMap = {
    0: 'https://schema.org/EventCancelled',
    1: 'https://schema.org/EventMovedOnline',
    2: 'https://schema.org/EventPostponed',
    3: 'https://schema.org/EventScheduled',
    4: 'https://schema.org/EventRescheduled',
    5: 'https://schema.org/EventScheduled',
    6: 'https://schema.org/EventScheduled',
  };

  const imgURL = getImageURL({
    key: eventData.image_url,
    width: 1000,
    height: 1000,
  });

  const eventName = convertStringToUrlFormat({ data: eventData?.name });
  const eventId = eventData?.id;
  const eventUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/events/${eventId}-${eventName}`;

  const offlineLocation = {
    '@type': 'Place',
    name: eventData?.location?.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: eventData?.location?.address,
      addressLocality: eventData?.location?.city,
      postalCode: eventData?.location?.postal_code,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: eventData?.location?.latitude,
      longitude: eventData?.location?.longitude,
    },
  };

  const eventOnelineUrl = {
    '@type': 'VirtualLocation',
    url: eventUrl,
  };

  const eventOrganizers = getEventOrganisers({ eventData });

  const eventLocation =
    eventData?.attendance_mode === 0
      ? eventOnelineUrl
      : eventData?.attendance_mode === 1
      ? offlineLocation
      : [eventOnelineUrl, offlineLocation];

  const eventTicketOffers = getEventTicketOffers({ eventData, eventUrl });

  const eventPerformers = getEventArtists({ eventData });

  const eventPreviousStartDate =
    eventData?.status === 4
      ? { previousStartDate: eventData?.start_date || '' }
      : {};

  const startDate = getLocalDateFromUTC({
    utcDate: eventData?.start_date || '',
    utcOffset: eventData?.start_date_timezone?.utc_offset,
  })?.toISOString();

  const endDate = getLocalDateFromUTC({
    utcDate: eventData.end_date || '',
    utcOffset: eventData?.start_date_timezone?.utc_offset,
  })?.toISOString();

  const schema = {
    '@context': 'https://schema.org',
    '@type': eventType[eventData?.category?.name] || 'Event',
    name: eventData?.name || '',
    description:
      eventData?.description?.trim() ||
      `${eventData?.name ? `${eventData.name}, ` : ''}${
        eventData?.location?.name ? `${eventData?.location?.name}, ` : ''
      }${startDate ? `${startDate}` : ''}`,
    keywords: `${eventData?.name ? `${eventData.name}, ` : ''}${
      startDate ? `${startDate},` : ''
    }${eventData?.location?.name ? `${eventData?.location?.name}, ` : ''}${
      eventData?.category?.name ? `${eventData?.category?.name}` : ''
    }`,
    image: imgURL,
    eventStatus: statusMap[eventData?.status] || '',
    eventAttendanceMode: attendanceModeMap[eventData?.attendance_mode] || '',
    startDate: startDate || '',
    endDate: endDate || '',
    location: eventLocation,
    ...eventPreviousStartDate,
    ...eventTicketOffers,
    ...eventOrganizers,
    ...eventPerformers,
  };

  return schema;
};

export const convertStringToUrlFormat = ({ data }) => {
  let eventName = data ? decode(data) : '';
  eventName = eventName?.replace(/[^a-zA-Z0-9\s]/g, ' ')?.trim();
  return eventName?.replace(/\s+/g, '-')?.toLowerCase();
};

export const getCategoryImage = ({ categoryName }) => {
  const FALLBACK_IMAGE = '/images/event_fallback.jpg';

  const categoriesType = {
    Business: '/images/business.jpg',
    Sports: '/images/sports.jpg',
    Music: '/images/music.jpg',
    Social: '/images/social.jpg',
    Education: '/images/education.jpg',
    Event: '/images/event.jpg',
    Dance: '/images/dancing.jpg',
    Comedy: '/images/comedy.jpg',
    Screening: '/images/screening.jpg',
    VisualArts: '/images/visualarts.jpg',
    Childrens: '/images/childrens.jpg',
    Film: '/images/Film.png',
    'Arts & Theatre': '/images/Art&Theatre.png',
    Miscellaneous: '/images/Miscellaneous.png',
    Concerts: '/images/Concert.png',
    Theatre: '/images/Theatre.png',
  };
  const categoryImage = categoriesType[categoryName] || FALLBACK_IMAGE;

  return categoryImage;
};

export const getIsEventOverInfo = ({ eventEndDate, utcOffset }) => {
  if (!eventEndDate || !utcOffset) {
    return '';
  }
  const endDateObj = dayjs.utc(eventEndDate);
  const [offsetHours, offsetMinutes] = utcOffset.split(':').map(Number);
  const localDate = endDateObj
    .add(offsetHours, 'hour')
    .add(offsetMinutes, 'minute');
  const currentDate = dayjs().utc(true);
  const eventIsOver = localDate.isBefore(currentDate);
  return eventIsOver;
};

export const getDecodedText = ({ text }) => {
  const decodedText = text ? decode(text) : '';
  return decodedText;
};

export const hasHtmlEntities = (input) => {
  return /&(?:[a-z]+|#\d+);/.test(input);
};

export const metaDataTitleSuffix = '| Yapsody Events';

export const capitalizeWords = (str) => {
  return str
    ?.split(' ')
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(' ');
};

const getCategoryMetadata = (
  category,
  locationName,
  updateDate,
  cityCountryName
) => {
  const categoryMetadata = {
    sports: {
      title: `Sports Events${cityCountryName}${updateDate} - Upcoming Tournaments, Matches, Tickets & Things To Do${locationName} ${metaDataTitleSuffix}`,
      description: `Explore a Diverse Range of Sports Events${cityCountryName}${updateDate}, Featuring NBA, Basketball, Football, Golf, Soccer, Cricket, Computer Games, and More Exciting Tournaments.`,
      keywords: [
        'live games',
        'athletics',
        'matches',
        'tournaments',
        'sporting events',
        'team sports',
        'individual sports',
        'fan experiences',
      ],
    },
    dance: {
      title: `Dance Events${cityCountryName}${updateDate} - Upcoming Dance Classes, Workshops, Competitions${locationName} ${metaDataTitleSuffix}`,
      description: `Find upcoming dance performances, workshops, competitions, and more${cityCountryName}${updateDate}. Get your tickets now.`,
      keywords: [
        'dance performances',
        'ballet',
        'contemporary dance',
        'modern dance',
        'ballroom dance',
        'dance events',
        'dance tickets',
        'choreography',
        'dance shows',
      ],
    },
    comedy: {
      title: `Comedy Shows${cityCountryName}${updateDate} - Upcoming stand-up shows, comedy gigs, performances${locationName} ${metaDataTitleSuffix}`,
      description: `Find upcoming hilarious comedy events, stand-up shows, comedy gigs, performances, festivals and laugh your heart out${cityCountryName}${updateDate}. Get your tickets now`,
      keywords: [
        'Comedy shows',
        'stand-up comedy',
        'comedy events',
        'humorous performances',
        'laughter',
        'comedians',
        'comedy tickets',
      ],
    },
    music: {
      title: `Music Events${cityCountryName}${updateDate} - Upcoming music events, festivals, band, concerts${locationName} ${metaDataTitleSuffix}`,
      description: `Find the latest live music events${cityCountryName}${updateDate}, concerts, gigs, and festivals. Book tickets for your favorite music artists and bands. Discover performances near you.`,
      keywords: [
        'Live music events',
        'Concert tickets',
        'Music festivals',
        'Local bands',
        'Music performances',
        'Music gigs',
        'Tour dates',
        'Concert listings',
        'Music concerts',
        'Live performances',
      ],
    },
    screening: {
      title: `Screening Events${cityCountryName}${updateDate} - Upcoming Movie Screenings, Premieres, and Film Festivals${locationName} ${metaDataTitleSuffix}`,
      description: `Discover exciting screening events from movie premieres to film festivals, and cinematic experiences${cityCountryName}${updateDate}. Get your tickets now`,
      keywords: [
        'movie screenings',
        'film screenings',
        'cinema events',
        'upcoming screenings',
        'new releases',
        'screening tickets',
        'cinema showtimes',
        'film premieres',
        'movie events',
        'screening schedule',
      ],
    },
    social: {
      title: `Social Events${cityCountryName}${updateDate} - Upcoming parties, gatherings, networking events, meetups, social gatherings events${locationName} ${metaDataTitleSuffix}`,
      description: `Connect with Like-Minded Individuals at Social Events${cityCountryName}${updateDate}. Discover Atherings, Networking Opportunities, Meetups, and Engaging Social Gatherings in Your City.`,
      keywords: [
        'Social events',
        'Community gatherings',
        'Networking opportunities',
        'Socializing events',
        'Meetups',
        'Social gatherings',
        'Networking events',
        'Social calendar',
        'Community events',
        'Social activities',
      ],
    },
    visualarts: {
      title: `Visual Arts Events${cityCountryName}${updateDate} - Upcoming Exhibitions, Galleries, Workshops and Creative Showcases in ${locationName} ${metaDataTitleSuffix}`,
      description: `Discover captivating visual arts events fom art exhibitions to gallery showcases, find upcoming artistic experiences${cityCountryName}${updateDate}. Book tickets now`,
      keywords: [
        'Fine art',
        'Contemporary art',
        'Painting',
        'Sculpture',
        'Photography',
        'Digital art',
        'Mixed media',
        'Art galleries',
        'Art exhibitions',
        'Art events',
        'Art shows',
        'Art installations',
        'Art festivals',
        'Visual arts events',
        'Artistic expressions',
      ],
    },
    business: {
      title: `Business Events${cityCountryName}${updateDate} - Upcoming Workshops, Seminars, Networking, and Conferences${locationName} ${metaDataTitleSuffix}`,
      description: `Discover upcoming Business Events, from conferences to workshops, find and book tickets for top-notch Business Category events${cityCountryName}${updateDate}.`,
      keywords: [
        'Business events',
        'Networking opportunities',
        'Professional development',
        'Corporate seminars',
        'Entrepreneurial workshops',
        'Industry conferences',
        'Business summits',
        'Leadership training',
        'Executive retreats',
        'Business networking events',
      ],
    },
    education: {
      title: `Education Events${cityCountryName}${updateDate} -Upcoming Workshops, Seminars, Conferences, training sessions${locationName} ${metaDataTitleSuffix}`,
      description: `Explore educational events, from workshops and seminars to conferences and training sessions. Find upcoming opportunities to learn and grow${cityCountryName}${updateDate}. Book tickets now`,
      keywords: [
        'Online Learning',
        'Educational Events',
        'Workshops',
        'Seminars',
        'Professional Development',
        'Courses',
        'Training Programs',
        'Educational Resources',
        'Academic Events',
        'Learning Opportunities',
      ],
    },
    childrens: {
      title: `Kid's Events${cityCountryName}${updateDate} - Discover Fun and Exciting Activities for Children${locationName} ${metaDataTitleSuffix}`,
      description: `Discover children's event${cityCountryName}${updateDate} filled with games, storytelling, educational workshops and laughter. Join us for a magical adventure where imagination knows no bounds! Book tickets now.`,
      keywords: [
        'Family-friendly events',
        'Kid-friendly activities',
        "Children's entertainment",
        'Family outings',
        'Kids events',
        'Child-friendly performances',
        'Fun for kids',
        "Children's shows",
        'Youth activities',
        'Kid-friendly attractions',
      ],
    },
    event: {
      title: `Events${cityCountryName}${updateDate} - Upcoming festivals, concerts, workshops, seminar${locationName} ${metaDataTitleSuffix}`,
      description: `Explore a diverse range of events, from concerts and festivals to workshops and seminars.  Find and book tickets for top-rated${cityCountryName}${updateDate}.`,
      keywords: [
        'Events',
        'Tickets',
        'Concerts',
        'Live performances',
        'Festivals',
        'Shows',
        'Entertainment',
        'Local events',
        'Cultural events',
        'Music events',
        'Theater',
        'Arts',
        'Performances',
        'Family-friendly events',
        'Sports events',
        'Community events',
        'Nightlife',
        'Comedy shows',
        'Dance events',
        'Exhibitions',
      ],
    },
    film: {
      title: `Film Events${cityCountryName}${updateDate} - Experience the magic of cinema, screenings, premieres${locationName} ${metaDataTitleSuffix}`,
      description: `Discover the latest movie screenings, premieres, and cinematic events for unforgettable movie experiences${cityCountryName}${updateDate}. Book tickets now.`,
      keywords: [
        'Movie tickets',
        'Film screenings',
        'Cinema events',
        'Blockbuster movies',
        'Indie films',
        'Film festivals',
        'Movie premieres',
        'Classic films',
        'Film enthusiasts',
        'Director retrospectives',
        'Cult classics',
        'Film screenings near me',
        'Red carpet events',
        'Film buffs',
        'Film fanatics',
      ],
    },
    'arts&theatre': {
      title: `Arts & Theatre Events${cityCountryName}${updateDate} - Upcoming Live Performances & Cultural Experiences${locationName} ${metaDataTitleSuffix}`,
      description: `Discover live performances, cultural experiences, and theatrical masterpieces${cityCountryName}${updateDate}. Find the vibrant world of arts and theater, book tickets now.`,
      keywords: [
        'add events',
        'live games',
        'athletics',
        'matches',
        'tournaments',
        'sporting events',
        'team sports',
        'individual sports',
        'fan experiences',
      ],
    },
    miscellaneous: {
      title: `Variety of Miscellaneous Events${cityCountryName}${updateDate} - From unique gatherings to special occasions, explore and book tickets for a variety of exciting events${locationName} ${metaDataTitleSuffix}`,
      description: `Discover a wide array of miscellaneous events${cityCountryName}${updateDate}, from offbeat festivals to quirky gatherings, there's something for everyone. Explore and book tickets now.`,
      keywords: [
        'Unique events',
        'Diverse experiences',
        'Eclectic gatherings',
        'Varied happenings',
        'Special occasions',
        'Unconventional outings',
        'Assorted entertainment',
        'Mixed events',
        'Range of activities',
        'Eclectic gatherings',
      ],
    },
    concerts: {
      title: `Concert Events${cityCountryName}${updateDate} - From intimate acoustic sets to electrifying stadium shows, live music performances${locationName} ${metaDataTitleSuffix}`,
      description: `Discover a wide range of concert events${cityCountryName}${updateDate}, From rock and pop to jazz and classical, find and book tickets for electrifying live music performances.`,
      keywords: [
        'Live concerts',
        'Music events',
        'Concert tickets',
        'Upcoming shows',
        'Gig listings',
        'Performance schedule',
        'Concert calendar',
        'Music festivals',
        'Artists lineup',
        'Ticket booking',
        'Venue details',
        'Tour dates',
        'Popular bands',
        'Local concerts',
        'Stage performances',
      ],
    },
    theatre: {
      title: `Theater Events${cityCountryName}${updateDate} - Discover captivating live performances, dramatic shows, and theatrical masterpieces${locationName} ${metaDataTitleSuffix}`,
      description: `Browse and book tickets for an unforgettable theater experience. From classic plays to contemporary productions, live performances and dramatic shows${cityCountryName}${updateDate}`,
      keywords: [
        'Live theater events',
        'Stage performances',
        'Theater productions',
        'Drama shows',
        'Musical theater',
        'Broadway shows',
        'Play performances',
        'Theatre tickets',
        'Theatrical experiences',
        'Acting performances',
      ],
    },
  };

  return categoryMetadata[category];
};

const getLocationDateMetadata = (countryName, cityName, updateDate) => {
  const city = cityName ? capitalizeWords(cityName?.replace('-', ' ')) : '';
  const country = countryName
    ? capitalizeWords(countryName?.replace('-', ' '))
    : '';

  if (countryName && !cityName) {
    return {
      title: `${country} Events${updateDate} | Upcoming Events & Things To Do In ${country}${updateDate} ${metaDataTitleSuffix}`,
      description: `Experience the Top Upcoming Events in ${country}${updateDate}. Explore concerts, meetups, open mics, art shows, music, live comedy, exhibitions, festivals, workshops, travel events. Book tickets`,
    };
  } else {
    return {
      title: `${city} Events${updateDate} | Upcoming Events & Things To Do In ${city}, ${country}${updateDate} ${metaDataTitleSuffix}`,
      description: `Experience the Top Upcoming Events in ${city}${updateDate}. Explore concerts, meetups, open mics, art shows, music, live comedy, exhibitions, festivals, workshops, travel events. Book tickets`,
    };
  }
};

export const getMetadata = (
  date,
  category = '',
  cityName = '',
  countryName = ''
) => {
  const updateDate = date !== undefined ? ` ${getTimeRange(date)?.name}` : '';

  const locationName =
    countryName && cityName
      ? ` in ${capitalizeWords(cityName?.replace('-', ' '))}, ${capitalizeWords(
          countryName?.replace('-', ' ')
        )}`
      : countryName
      ? ` in ${capitalizeWords(countryName?.replace('-', ' '))}`
      : '';

  const cityCountryName = cityName
    ? ` in ${capitalizeWords(cityName?.replace('-', ' '))}`
    : countryName
    ? ` in ${capitalizeWords(countryName?.replace('-', ' '))}`
    : '';

  const showLocationData = locationName && locationName.trim().length > 0;

  if (showLocationData || category || date) {
    const metadata =
      category &&
      getCategoryMetadata(category, locationName, updateDate, cityCountryName);

    if (metadata) {
      return metadata;
    } else {
      return getLocationDateMetadata(countryName, cityName, updateDate);
    }
  }

  return {
    title: `Discover Events and Experience Exciting Moments [Book Now] ${metaDataTitleSuffix}`,
    description:
      'Find the Best Live Events, Concerts, Sports, and More Near You. Join us for Unforgettable Experiences.',
  };
};

const formatNumber = ({ config = {} }) => {
  return (number) => new Intl.NumberFormat('en-US', config).format(number);
};

const getHighestLowestPrice = (tickets) => {
  const data = tickets.reduce(
    (acc, ticket) => {
      if (ticket.low_price === null && ticket.high_price === null) {
        return {
          lowestPrice: [...acc.lowestPrice, ticket.low_price],
          highestPrice: [...acc.highestPrice, ticket.high_price],
          isLowestHighestPriceNull: true,
        };
      }
      return {
        ...acc,
        lowestPrice: [...acc.lowestPrice, ticket.low_price],
        highestPrice: [...acc.highestPrice, ticket.high_price],
      };
    },
    {
      lowestPrice: [],
      highestPrice: [],
      isLowestHighestPriceNull: false,
    }
  );

  return data;
};

const getSortedLowestHighesPrice = (lowestPrice, highestPrice, last) => {
  const sortedLowestPrice = lowestPrice
    .filter((value) => value !== null && value !== undefined)
    .sort((a, b) => a - b);

  const sortedHighestPrice = highestPrice.sort((a, b) => a - b)[last];

  return { sortedHighestPrice, sortedLowestPrice };
};

const getPostFixString = (tickets, sortedHighestPrice, sortedLowestPrice) => {
  const isOnlyLowestHighestPriceZero =
    tickets.length === 1 &&
    (sortedLowestPrice[0] === 0 || sortedHighestPrice === 0);

  const isLowPriceEqualsHighPrice =
    sortedLowestPrice[0] === sortedHighestPrice || isOnlyLowestHighestPriceZero;

  const postFixString =
    tickets.length >= 1 && !isLowPriceEqualsHighPrice ? 'onwards' : '';

  return { postFixString, isLowPriceEqualsHighPrice };
};

export const getEventOffersDetails = (tickets = [], sourceName) => {
  if (tickets.length === 0) {
    return 'To be announced';
  }

  const { lowestPrice, highestPrice, isLowestHighestPriceNull } =
    getHighestLowestPrice(tickets);

  if (isLowestHighestPriceNull) {
    return `Pricing on ${sourceName}`;
  }

  const last = highestPrice.length - 1;

  const { sortedHighestPrice, sortedLowestPrice } = getSortedLowestHighesPrice(
    lowestPrice,
    highestPrice,
    last
  );

  const isLowestPricePresent = sortedLowestPrice.length > 0;

  const price = isLowestPricePresent
    ? sortedLowestPrice[0]
    : sortedHighestPrice;

  const { isLowPriceEqualsHighPrice, postFixString } = getPostFixString(
    tickets,
    sortedHighestPrice,
    sortedLowestPrice
  );

  if (price === 0 && isLowPriceEqualsHighPrice) {
    return 'Free Entry';
  }

  const formattedPricePrefix = formatNumber({
    config: {
      currency: tickets[0]?.currency || 'USD',
      style: 'currency',
      maximumFractionDigits: String(price).split('.').length > 1 ? 2 : 0,
    },
  });

  return `${formattedPricePrefix(price)} ${postFixString}`;
};

export const metaDataKeywords = [
  'yapsody.events',
  'yapsody events',
  'Best Events & Activities',
  'Explore upcoming events',
  'Current events',
  'Get local events',
  'Event site',
  'Daily events',
  'Forthcoming events',
  'Special events',
  'Ongoing events',
  'Adventure events',
  'Concerts',
  'Events today',
  'Events this weekend',
  'Free Events',
  'Music events',
  'Things to do',
  'Festival events',
  'Nightlife events',
  'Music Events',
  'Social Events',
  'Dance Events',
  'Comedy Events',
  'Education Events',
  'Business Events',
  'Buy Tickets',
  'Price information',
];

export const generateCategoriesKeywords = ({ category }) => {
  const capitalizedCategory = capitalizeWords(category);
  return capitalizedCategory
    ? [
        'Yapsody.event',
        'Yapsody Events',
        `${capitalizedCategory} Free events`,
        `${capitalizedCategory} events near me`,
        `${capitalizedCategory} events Today`,
        `${capitalizedCategory} events this Tomorrow`,
        `${capitalizedCategory} events this Weekend`,
        `${capitalizedCategory} events this Week`,
        `${capitalizedCategory} events`,
        `${capitalizedCategory} event tickets`,
        'things to do',
        `${capitalizedCategory} things to do`,
        `find ${capitalizedCategory} events`,
        'add events',
      ]
    : [];
};
export const getOnlinePageMetadata = (date, category = '') => {
  const updateDate = date !== undefined ? ` ${getTimeRange(date)?.name}` : '';

  let title;
  let description;

  const capitalizedCategory = capitalizeWords(category);

  if (category && date) {
    title = `${capitalizedCategory} Online Events${updateDate} ${metaDataTitleSuffix}`;
    description = `Discover list of ${capitalizedCategory} events online, ${capitalizedCategory} Events Online${updateDate}, ${capitalizedCategory} Events activities in Online, things to do for ${capitalizedCategory} Events in Online, Online ${capitalizedCategory} Events.`;
  } else if (category) {
    title = `${capitalizedCategory} Online Events ${metaDataTitleSuffix}`;
    description = `Discover list of ${capitalizedCategory} events online, ${capitalizedCategory} Events in Online today, ${capitalizedCategory} Events in Online this weekend, ${capitalizedCategory} Events in Online this week, ${capitalizedCategory} Events activities in Online, things to do for ${capitalizedCategory} Events in Online, Online ${capitalizedCategory} Events.`;
  } else if (date) {
    title = `Online Events${updateDate} ${metaDataTitleSuffix}`;
    description = `Discover list of events online, Events in Online${updateDate}, Events activities in Online, things to do for Events in Online, Online Events`;
  } else {
    title = `Online Events ${metaDataTitleSuffix}`;
    description =
      'Discover list of events online, Events in Online today, Events in Online this weekend, Events in Online this week, Events activities in Online, things to do for Events in Online, Online Events';
  }

  return {
    title,
    description,
  };
};

export const insertPromotionalImages = ({
  eventsArray,
  isGridLoadMore = false,
}) => {
  const promotionalImage = {
    type: 'promotional',
  };
  const firstPromotionalImageIndex = isGridLoadMore ? -7 : 5;
  const subsequentPromotionalImageIndex = 15;

  if (!isGridLoadMore) {
    eventsArray?.splice(firstPromotionalImageIndex, 0, promotionalImage);
  }

  // Insert subsequent promotional images
  let offset = 1;
  for (
    let i = firstPromotionalImageIndex + subsequentPromotionalImageIndex;
    i < eventsArray?.length;
    i += subsequentPromotionalImageIndex
  ) {
    eventsArray?.splice(i + offset, 0, promotionalImage);
    offset++;
  }

  return eventsArray;
};

const generateLocationCategoriesKeywords = ({
  category,
  locationName,
  updateDate,
}) => {
  const categoryMetadataKeywords = {
    sports: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Sports events in ${locationName}${updateDate}`,
        `Sports events near me`,
        `Sports events in ${locationName} Today`,
        `Sports events in ${locationName} Tomorrow`,
        `Sports events in ${locationName} this Weekend`,
        `Sports events this Week`,
        `Sports events in ${locationName}`,
        `Sports event tickets`,
        `things to do`,
        `Sports things to do in ${locationName}${updateDate}`,
        `find Sports events in ${locationName}${updateDate}`,
        `add events in ${locationName}${updateDate}`,
        `live games`,
        `athletics`,
        `matches`,
        `tournaments`,
        `sporting events`,
        `team sports`,
        `individual sports`,
        `fan experiences`,
        `Sponsored Sprots events`,
        `Sports tournaments`,
        `Sports venue`,
        `Online ticket sales`,
        `Sports event promotion in ${locationName}${updateDate}`,
        `Expereince the best sports events in ${locationName}${updateDate}`,
        `Local sports events in ${locationName}${updateDate}`,
        `Nearby sports tournaments in ${locationName}${updateDate}`,
        `Local sports teams in ${locationName}${updateDate}`,
        `Nearby sports competitions in ${locationName}${updateDate}`,
        `Local event promotion in ${locationName}${updateDate}`,
        `Sporting events nearby in ${locationName}${updateDate}`,
        `Tickets for local sports events in ${locationName}${updateDate}`,
      ],
    },
    dance: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Dance events in ${locationName}${updateDate}`,
        `Dance events near me`,
        `Dance events in ${locationName} Today`,
        `Dance events in ${locationName} Tomorrow`,
        `Dance events in ${locationName} this Weekend`,
        `Dance events this Week`,
        `Dance events in ${locationName}`,
        `Dance event tickets`,
        `Things to do`,
        `Things to do in ${locationName}${updateDate}`,
        `Find Dance Events in ${locationName}`,
        `Add Dance Events`,
        `Dance events`,
        `Dance performances`,
        `Dance workshops`,
        `Dance competitions`,
        `Dance shows`,
        `Dance classes`,
        `Dance tickets`,
        `Dance events near me`,
        `Dance festivals`,
        `Ballet events`,
        `Contemporary dance`,
        `Hip-hop dance`,
        `Ballroom dance`,
        `Latin dance`,
        `Salsa events`,
        `Event tickets`,
        `Ticket booking`,
        `Event management`,
        `Ticketing platform`,
        `Event promotion`,
      ],
    },
    comedy: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Comedy events in ${locationName}${updateDate}`,
        `Comedy events near me`,
        `Comedy events in ${locationName} Today`,
        `Comedy events in ${locationName} Tomorrow`,
        `Comedy events in ${locationName} this Weekend`,
        `Comedy events this Week`,
        `Comedy events in ${locationName}`,
        `Comedy event tickets`,
        `Things to do`,
        `Things to do in ${locationName}${updateDate}`,
        `Find Comedy Events in ${locationName}${updateDate}`,
        `Add Comedy Events`,
        `Comedy events`,
        `Comedy performances`,
        `Comedy workshops`,
        `Comedy competitions`,
        `Comedy shows`,
        `Comedy classes`,
        `Comedy events near me`,
        `Comedy events`,
        `Stand-up comedy`,
        `Comedy gigs`,
        `Comedy festivals`,
        `Comedian appearances`,
        `Comedy club events`,
        `Sketch comedy`,
        `Comedy tickets`,
        `Comedy tours`,
        `Comedy events near me`,
        `Event tickets`,
        `Ticket booking`,
        `Event management`,
        `Ticketing platform`,
        `Event promotion`,
      ],
    },
    music: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Music events in ${locationName}${updateDate}`,
        `Music events near me`,
        `Music events in ${locationName} Today`,
        `Music events in ${locationName} Tomorrow`,
        `Music events in ${locationName} this Weekend`,
        `Music events this Week`,
        `Music events in ${locationName}`,
        `Music event tickets`,
        `Things to do`,
        `Things to do in ${locationName}${updateDate}`,
        `Find Music Events in ${locationName}${updateDate}`,
        `Add Music Events in ${locationName}${updateDate}`,
        `Live music events`,
        `Concerts`,
        `Gigs`,
        `Festivals`,
        `Music festivals`,
        `Concert tickets`,
        `Music artists`,
        `Bands`,
        `Performances`,
        `Event tickets`,
        `Music shows`,
        `Event management`,
        `Ticketing platform`,
        `Event promotion`,
      ],
    },
    screening: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Screening events in ${locationName}${updateDate}`,
        `Screening events near me`,
        `Screening events in ${locationName} Today`,
        `Screening events in ${locationName} Tomorrow`,
        `Screening events in ${locationName} this Weekend`,
        `Screening events this Week`,
        `Screening events in ${locationName}`,
        `Screening event tickets`,
        `Things to do`,
        `Things to do in ${locationName}${updateDate}`,
        `Find Screening Events in ${locationName}${updateDate}`,
        `Add Screening Events`,
        `Screening events`,
        `Screening performances`,
        `Screening workshops`,
        `Screening competitions`,
        `Screening shows`,
        `Screening classes`,
        `Screening events near me`,
        `Movie premieres`,
        `Film festivals`,
        `Cinema screenings`,
        `Film events`,
        `Movie tickets`,
        `Film tickets`,
        `Ticket booking`,
        `Event management`,
        `Ticketing platform`,
        `Event promotion`,
        `Movie screenings`,
        `Cinema events`,
        `Film screenings`,
        `Cinematic experiences`,
        `Film buffs`,
      ],
    },
    social: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Social events in ${locationName}${updateDate}`,
        `Social events near me${updateDate}`,
        `Social events in ${locationName} Today`,
        `Social events in ${locationName} Tomorrow`,
        `Social events in ${locationName} this Weekend`,
        `Social events this Week`,
        `Social events in ${locationName}`,
        `Social event tickets`,
        `Things to do`,
        `Things to do in ${locationName}${updateDate}`,
        `Find Social Events in ${locationName}${updateDate}`,
        `Add Social Events${updateDate}`,
        `Social events`,
        `Parties`,
        `Gatherings`,
        `Networking events`,
        `Social gatherings`,
        `Meetups`,
        `Community events`,
        `Event tickets`,
        `Ticket booking`,
        `Event management`,
        `Ticketing platform`,
        `Event promotion`,
      ],
    },
    visualarts: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free VisualArts events in ${locationName}${updateDate}`,
        `VisualArts events near me`,
        `VisualArts events in ${locationName} Today`,
        `VisualArts events in ${locationName} Tomorrow`,
        `VisualArts events in ${locationName} this Weekend`,
        `VisualArts events this Week`,
        `VisualArts events in ${locationName}`,
        `VisualArts event tickets`,
        `Things to do`,
        `Things to do in ${locationName}${updateDate}`,
        `Find VisualArts Events in ${locationName}${updateDate}`,
        `Add VisualArts Events`,
        `VisualArts events`,
        `VisualArts performances`,
        `VisualArts workshops`,
        `VisualArts competitions`,
        `VisualArts shows`,
        `VisualArts classes`,
        `VisualArts events near me`,
        `Visual arts events`,
        `Art exhibitions`,
        `Art galleries`,
        `Art shows`,
        `Art openings`,
        `Art fairs`,
        `Art installations`,
        `Art events`,
        `Gallery events`,
        `Exhibition tickets`,
        `Gallery tickets`,
        `Ticket booking`,
        `Event management`,
        `Ticketing platform`,
        `Event promotion`,
      ],
    },
    business: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Business events in ${locationName}${updateDate}`,
        `Business events near me`,
        `Business events in ${locationName} Today`,
        `Business events in ${locationName} Tomorrow`,
        `Business events in <Country> this Weekend`,
        `Business events this Week`,
        `Business events in ${locationName}`,
        `Business event tickets`,
        `Things to do`,
        `Things to do in ${locationName}`,
        `Find Business Events in ${locationName}${updateDate}`,
        `Add Business Events`,
        `Business events`,
        `Business performances`,
        `Business workshops`,
        `Business competitions`,
        `Business shows`,
        `Business classes`,
        `Business events near me`,
        `Business events`,
        `Workshops`,
        `Seminars`,
        `Conferences`,
        `Meetups`,
        `Professional networking events`,
        `Industry-specific events`,
        `Community gatherings`,
        `Ticket booking`,
        `Event management`,
        `Ticketing platform`,
        `Event promotion`,
        `Corporate Events`,
        `Business Conferences`,
        `Networking Events`,
        `Professional Seminars`,
        `Industry Workshops`,
        `Executive Retreats`,
        `Business Networking`,
        `Corporate Training Programs`,
        `Leadership Summits`,
        `Trade Shows`,
        `Product Launch Events`,
        `Team Building Activities`,
        `Business Expositions`,
        `Industry Conventions`,
        `Corporate Retreats`,
        `Business Seminars`,
        `Executive Conferences`,
        `Professional Development Events`,
        `Business Symposiums`,
        `Company Retreats`,
      ],
    },
    education: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Education events in ${locationName}${updateDate}`,
        `Education events near me`,
        `Education events in ${locationName} Today`,
        `Education events in ${locationName} Tomorrow`,
        `Education events in ${locationName} this Weekend`,
        `Education events this Week`,
        `Education events in ${locationName}`,
        `Education event tickets`,
        `Things to do`,
        `Things to do in ${locationName}`,
        `Find Education Events in ${locationName}${updateDate}`,
        `Add Education Events`,
        `Education events`,
        `Education performances`,
        `Education workshops`,
        `Education competitions`,
        `Education shows`,
        `Education classes`,
        `Education events near me`,
        `Education events`,
        `Workshops`,
        `Seminars`,
        `Conferences`,
        `Meetups`,
        `Professional networking events`,
        `Industry-specific events`,
        `Community gatherings`,
        `Ticket booking`,
        `Event management`,
        `Ticketing platform`,
        `Event promotion`,
      ],
    },
    childrens: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Children events in ${locationName}${updateDate}`,
        `Children events near me`,
        `Children events in ${locationName} Today`,
        `Children events in ${locationName} Tomorrow`,
        `Children events in ${locationName} this Weekend`,
        `Children events this Week`,
        `Children events in ${locationName}`,
        `Children event tickets`,
        `Things to do`,
        `Things to do in ${locationName}`,
        `Find Children Events in ${locationName}${updateDate}`,
        `Add Children Events`,
        `Children events`,
        `Children performances`,
        `Children workshops`,
        `Children shows`,
        `Children events in ${locationName}`,
        `Children's Events`,
        `Kids' Activities`,
        `Family-Friendly Events`,
        `Child-Friendly Activities`,
        `Kids' Entertainment`,
        `Children's Workshops`,
        `Kids' Festivals`,
        `Family Fun Events`,
        `Kids' Parties`,
        `Children's Shows`,
        `Toddler Events`,
        `Kids' Performances`,
        `Interactive Kids' Events`,
        `Children's Concerts`,
        `Kids' Sports Activities`,
        `Educational Kids' Events`,
        `Children's Storytime`,
        `Kids' Arts and Crafts`,
        `Kids' Outdoor Adventures`,
        `Creative Kids' Workshops`,
      ],
    },
    event: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Events in ${locationName}${updateDate}`,
        `Events near me`,
        `Events in ${locationName} Today`,
        `Events in ${locationName} Tomorrow`,
        `Events In ${locationName} this Weekend`,
        `Events this Week`,
        `Events in ${locationName}`,
        `Event Tickets`,
        `Things to do`,
        `Things to do in ${locationName}`,
        `Find Events in ${locationName}${updateDate}`,
        `Concerts`,
        `Festivals`,
        `Workshops`,
        `Seminars`,
        `Shows`,
        `Entertainment`,
        `Live Events`,
        `Music Events`,
        `Cultural Events`,
        `Performing Arts`,
        `Sports Events`,
        `Comedy Shows`,
        `Theatre Performances`,
        `Art Exhibitions`,
        `Networking Events`,
      ],
    },
    film: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Film events in ${locationName}${updateDate}`,
        `Film events near me`,
        `Film events in ${locationName} Today`,
        `Film events in ${locationName} Tomorrow`,
        `Film events in ${locationName} this Weekend`,
        `Film events this Week`,
        `Film events in ${locationName}`,
        `Film event tickets`,
        `Things to do`,
        `Things to do in ${locationName}${updateDate}`,
        `Find Film Events in ${locationName}${updateDate}`,
        `Add Film Events`,
        `Film events`,
        `Film performances`,
        `Film workshops`,
        `Film competitions`,
        `Film shows`,
        `Film classes`,
        `Film events near me`,
        `Film events`,
        `Movie screenings`,
        `Film premieres`,
        `Cinematic experiences`,
        `Film festivals`,
        `Movie nights`,
        `Independent films`,
        `Classic films`,
        `Documentary screenings`,
        `Foreign films`,
        `Hollywood blockbusters`,
        `Director retrospectives`,
        `Film series`,
        `Film industry events`,
        `Red carpet events`,
      ],
    },
    'arts&theatre': {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Art & Theater events in ${locationName}${updateDate}`,
        `Art & Theater events near me`,
        `Art & Theater events in ${locationName} Today`,
        `Art & Theater events in ${locationName} Tomorrow`,
        `Art & Theater events in ${locationName} this Weekend`,
        `Art & Theater events this Week`,
        `Art & Theater events in ${locationName}`,
        `Art & Theater event tickets`,
        `Things to do`,
        `Things to do in ${locationName}${updateDate}`,
        `Find Art & Theater Events in ${locationName}${updateDate}`,
        `Add Art & Theater Events`,
        `Art & Theater events`,
        `Art & Theater performances`,
        `Art & Theater workshops`,
        `Art & Theater competitions`,
        `Art & Theater shows`,
        `Art & Theater classes`,
        `Art & Theater events near me`,
        `Art & Theater events`,
        `Arts and Theater events`,
        `Live performances`,
        `Theater productions`,
        `Art exhibitions`,
        `Cultural experiences`,
        `Performing arts`,
        `Drama shows`,
        `Musical performances`,
        `Stage plays`,
        `Ballet performances`,
        `Opera shows`,
        `Comedy plays`,
        `Experimental theater`,
        `Visual arts events`,
        `Theater festivals`,
      ],
    },
    miscellaneous: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Miscelleous events in ${locationName}${updateDate}`,
        `Miscelleous events near me`,
        `Miscelleous events in ${locationName} Today`,
        `Miscelleous events in ${locationName} Tomorrow`,
        `Miscelleous events in ${locationName} this Weekend`,
        `Miscelleous events this Week`,
        `Miscelleous events in ${locationName}`,
        `Miscelleous event tickets`,
        `Things to do`,
        `Things to do in ${locationName}${updateDate}`,
        `Find Miscelleous Events in ${locationName}`,
        `Add Miscelleous Events`,
        `Miscelleous events`,
        `Miscelleous performances`,
        `Miscelleous workshops`,
        `Miscelleous shows`,
        `Miscelleous events near me`,
        `Unique events`,
        `Unconventional gatherings`,
        `Offbeat experiences`,
        `Eclectic mix of events`,
        `Quirky happenings`,
        `Hidden gems`,
        `Unexpected delights`,
        `Diverse range of events`,
        `Special occasions`,
        `Extraordinary adventures`,
      ],
    },
    concerts: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Concerts events in ${locationName}${updateDate}`,
        `Concerts events near me`,
        `Concerts events in ${locationName} Today`,
        `Concerts events in ${locationName} Tomorrow`,
        `Concerts events in ${locationName} this Weekend`,
        `Concerts events this Week`,
        `Concerts events in ${locationName}`,
        `Concerts event tickets`,
        `Things to do`,
        `Things to do in ${locationName}${updateDate}`,
        `Find Concerts Events in ${locationName}${updateDate}`,
        `Add Concerts Events`,
        `Concerts events`,
        `Concerts performances`,
        `Concerts workshops`,
        `Concerts shows`,
        `Concerts events near me`,
        `Concert events`,
        `Live music performances`,
        `Concert tickets`,
        `Music festivals`,
        `Rock concerts`,
        `Pop concerts`,
        `Jazz performances`,
        `Classical concerts`,
        `City music events`,
        `Hip-hop concerts`,
        `Electronic music shows`,
        `Indie music gigs`,
        `World music concerts`,
        `Tribute bands`,
        `Concert venues`,
      ],
    },
    theatre: {
      keywords: [
        `Yapsody.Events`,
        `Yapsody Events`,
        `Free Theater events in ${locationName}${updateDate}`,
        `Theater events near me`,
        `Theater events in ${locationName} Today`,
        `Theater events in ${locationName} Tomorrow`,
        `Theater events in ${locationName} this Weekend`,
        `Theater events this Week`,
        `Theater events in ${locationName}`,
        `Theater event tickets`,
        `Things to do`,
        `Things to do in ${locationName}${updateDate}`,
        `Find Theater Events in ${locationName}`,
        `Add Theater Events`,
        `Theater events`,
        `Theater performances`,
        `Theater workshops`,
        `Theater shows`,
        `Theater events near me`,
        `Live performances`,
        `Dramatic shows`,
        `Stage plays`,
        `Musical theater`,
        `Theatrical productions`,
        `Broadway shows`,
        `Off-Broadway performances`,
        `Community theater`,
        `Theater festivals`,
        `Shakespearean plays`,
        `Contemporary theater`,
        `Experimental theater`,
        `Theater workshops`,
        `Theater tickets`,
      ],
    },
  };

  return categoryMetadataKeywords[category]?.keywords;
};

export const generateLocationandTimeKeywords = ({
  date,
  category = '',
  cityName = '',
  countryName = '',
}) => {
  const updateDate = date !== undefined ? ` ${getTimeRange(date)?.name}` : '';
  const locationName = cityName
    ? `${capitalizeWords(cityName?.replace('-', ' '))}`
    : countryName
    ? `${capitalizeWords(countryName?.replace('-', ' '))}`
    : '';

  if (updateDate && locationName && !category) {
    return [
      `Best Events & Activities in ${locationName}`,
      `Events${updateDate}`,
      `Events${updateDate} in ${locationName}`,
      `Things To Do for Events${updateDate} in ${locationName}`,
      `Explore upcoming Concerts in ${locationName}${updateDate}`,
      `${locationName} Events${updateDate}`,
      `Current events in ${locationName}${updateDate}`,
      `get local events in ${locationName}${updateDate}`,
      `Special events in ${locationName}${updateDate}`,
      `Ongoing events in ${locationName}${updateDate}`,
      `adventure in ${locationName}${updateDate}`,
      `${locationName}, concerts in ${locationName}${updateDate}`,
      `${locationName} upcoming events${updateDate}`,
      `upcoming events in ${locationName}${updateDate}`,
      `Experiences in ${locationName}${updateDate}`,
      `free events in ${locationName}${updateDate}`,
      `music events in ${locationName}${updateDate}`,
      `things to do in ${locationName}${updateDate}`,
      `${locationName} festival${updateDate}`,
      `exhibitions in ${locationName}${updateDate}`,
      `${locationName} nightlife${updateDate}`,
      `${locationName} Events${updateDate}`,
      `Events${updateDate} in ${locationName} April`,
      `Events${updateDate} in ${locationName} May`,
      `Events${updateDate} in ${locationName} 2024`,
      `${locationName} Events${updateDate}`,
      `Sports Events in ${locationName} ${updateDate}`,
      `Current events in ${locationName}${updateDate}`,
      `Get local events in ${locationName}${updateDate}`,
      `Special Events in ${locationName}${updateDate}`,
      `Ongoing events in ${locationName}${updateDate}`,
      `Adventure in ${locationName}${updateDate}`,
      `Concerts in ${locationName}${updateDate}`,
      `Music Events in ${locationName}${updateDate}`,
      `Social Events in ${locationName}${updateDate}`,
      `Dance Events in ${locationName}${updateDate}`,
      `Comedy Events in ${locationName}${updateDate}`,
      `Education Events in ${locationName}${updateDate}`,
      `Business Events in ${locationName}${updateDate}`,
      `Events in ${locationName}${updateDate}`,
      `Buy Tickets`,
      `Price information`,
    ];
  } else if (locationName && !category && !updateDate) {
    return [
      `Best Events & Activities in ${locationName}`,
      `Explore upcoming Concerts in ${locationName}`,
      `${locationName} Events`,
      `Sports events`,
      `current events in ${locationName}`,
      `Get local events in ${locationName}`,
      `event site`,
      `daily events in ${locationName}`,
      `forthcoming events in ${locationName}`,
      `special events in ${locationName}`,
      `ongoing events in ${locationName}`,
      `events out of ${locationName}`,
      `adventure in ${locationName}`,
      `${locationName} concerts`,
      `events in ${locationName} today`,
      `${locationName} upcoming events`,
      `upcoming events in ${locationName}`,
      `new year events in ${locationName}`,
      `events in ${locationName} this weekend`,
      `free events in ${locationName}`,
      `music events in ${locationName}`,
      `things to do in ${locationName}`,
      `${locationName} festival`,
      `exhibitions in ${locationName}`,
      `${locationName} nightlife`,
      `Music Events in ${locationName}`,
      `Social Events in ${locationName}`,
      `Dance Events in ${locationName}`,
      `Comedy Events in ${locationName}`,
      `Education Events in ${locationName}`,
      `Business Events in ${locationName}`,
      `Buy Tickets`,
      `Price information`,
    ];
  } else {
    return generateLocationCategoriesKeywords({
      category,
      locationName,
      updateDate,
    });
  }
};

export const trendingSerachResults = {
  'united-states': [
    {
      name: 'Shakira - World Tour',
      url: '/search?q=Shakira&type=event',
      dataQaSelector: 'footer_united_states_links_shakira_world_tour_events',
    },
    {
      name: 'July 4th Events 2024',
      url: '/search?q=4th%20of%20July&type=event',
      dataQaSelector: 'footer_united_states_links_4th_july_events_2024',
    },
    {
      name: 'Pride Month Celebration',
      url: '/search?q=LGBT&type=event',
      dataQaSelector: 'footer_united_states_links_pride_month_celebration',
    },
    {
      name: 'Brooklyn Events',
      url: '/search?q=Brooklyn&type=event',
      dataQaSelector: 'footer_united_states_links_brooklyn_events_around_usa',
    },
    {
      name: 'Las Vegas Events',
      url: '/country/united-states/city/las-vegas',
      dataQaSelector: 'footer_united_states_links_las_vegas_events',
    },
    {
      name: 'Chicago Events',
      url: '/country/united-states/city/chicago',
      dataQaSelector: 'footer_united_states_links_chicago_events',
    },
    {
      name: 'New York Events',
      url: '/country/united-states/city/new-york',
      dataQaSelector: 'footer_united_states_links_new_york_events',
    },
    {
      name: 'Juneteenth 2024',
      url: '/search?q=Juneteenth&type=event',
      dataQaSelector: 'footer_united_states_links_juneteenth_2024',
    },
    {
      name: 'WWE Events 2024',
      url: '/search?q=WWE&type=event',
      dataQaSelector: 'footer_united_states_links_wwe_events_2024',
    },
  ],
  'united-kingdom': [
    {
      name: 'Things To Do In London',
      url: '/country/united-kingdom/city/london',
      dataQaSelector: 'footer_united_kingdom_links_things_to_do_in_london',
    },
    {
      name: 'Manchester Events',
      url: '/search?q=Manchester&type=venue',
      dataQaSelector: 'footer_united_kingdom_links_manchester_events',
    },
    {
      name: 'Things To Do In Manchester',
      url: '/country/united-kingdom/city/manchester',
      dataQaSelector: 'footer_united_kingdom_links_things_to_do_in_manchester',
    },
    {
      name: 'Liverpool Events',
      url: '/search?q=Liverpool&type=event',
      dataQaSelector: 'footer_united_kingdom_links_liverpool_events',
    },
    {
      name: 'Kygo World Tour 2024',
      url: '/search?q=kygo&type=event',
      dataQaSelector: 'footer_united_kingdom_links_kygo_world_tour_2024',
    },
  ],
  india: [
    {
      name: 'Events in Mumbai',
      url: '/country/india/city/mumbai',
      dataQaSelector: 'footer_india_links_events_in_mumbai',
    },
    {
      name: 'Hyderabad Events',
      url: '/country/india/city/hyderabad',
      dataQaSelector: 'footer_india_links_hyderabad_events',
    },
    {
      name: 'Chennai Events',
      url: '/country/india/city/chennai',
      dataQaSelector: 'footer_india_links_chennai_events',
    },
    {
      name: 'Things To Do In Delhi',
      url: '/country/india/city/new-delhi',
      dataQaSelector: 'footer_india_links_things_to_do_in_delhi',
    },
    {
      name: 'Meet-ups Around Mumbai',
      url: '/search?q=MEET%20UP&type=event',
      dataQaSelector: 'footer_india_links_meet_ups_around_mumbai',
    },
    {
      name: 'Lucknow Events',
      url: '/country/india/city/lucknow',
      dataQaSelector: 'footer_india_links_lucknow_events',
    },
    {
      name: 'Things To Do In Goa',
      url: '/country/india/city/goa',
      dataQaSelector: 'footer_india_links_things_to_do_in_goa',
    },
  ],
  canada: [
    {
      name: 'Montreal Events',
      url: '/search?q=montreal&type=venue',
      dataQaSelector: 'footer_canada_links_montreal_events',
    },
    {
      name: 'London Hall Events',
      url: '/search?q=London%20Music%20Hall&type=venue',
      dataQaSelector: 'footer_canada_links_london_hall_events',
    },
    {
      name: 'Ottawa Events',
      url: '/search?q=Ottawa&type=venue',
      dataQaSelector: 'footer_canada_links_ottawa_events',
    },
    {
      name: 'Kitchener Events',
      url: '/search?q=Kitchener%20Memorial%20Auditorium%20Complex&type=venue',
      dataQaSelector: 'footer_canada_links_kitchener_events',
    },
    {
      name: 'Vancouver Events',
      url: '/search?q=Vancouver&type=venue',
      dataQaSelector: 'footer_canada_links_vancouver_events',
    },
    {
      name: 'Halifax Events',
      url: '/search?q=Halifax%20Garrison%20Grounds&type=venue',
      dataQaSelector: 'footer_canada_links_halifax_events',
    },
    {
      name: 'Sports Events Around Canada',
      url: '/country/canada?category=sports',
      dataQaSelector: 'footer_canada_links_sports_events_around_canada',
    },
  ],
};

export const blogPageMetaKeywords = [
  'Memorial Day parades',
  'City events',
  'USA events',
  'Community events',
  'Memorial Day ceremonies',
  'Event blog',
  'Yapsody events',
  'Local parades',
  'firework',
  'picnic',
  'Event listings',
  "What's happening in your city",
  'City event guide',
  'Community activities',
  'Holiday events',
  'City celebrations',
];
