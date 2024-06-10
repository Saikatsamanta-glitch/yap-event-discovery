import { Flex, Heading, LazyImage } from '@/components';
import BlogCard from '@/components/BlogCard';
import Image from 'next/image';
import React from 'react';
import { blogPageMetaKeywords, metaDataTitleSuffix } from '@/components/utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata(_, parent) {
  const title = `Top 4th of July Events and Ceremony in the USA ${metaDataTitleSuffix}`;
  const description = `We've made it easy for you to find Memorial Day parades and ceremonies across the USA. Read on to locate events in your city!`;
  const imgURL = `${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/blogs/4th_july_events/Title_Image.png`;

  const previousImages = (await parent).openGraph?.images || [];

  const openGraphEventImage = imgURL
    ? [
        {
          url: imgURL,
          width: 1200,
          height: 630,
          alt: 'Top 4th of July Events and Ceremony in the USA',
          type: 'image/png',
        },
      ]
    : [
        {
          type: 'image/png',
          width: 1200,
          height: 630,
          url: previousImages?.[0]?.url,
          alt: 'Yapody Events',
        },
      ];

  return {
    title: title,
    description: description,
    keywords: blogPageMetaKeywords,
    openGraph: {
      title: title,
      description: description,
      images: openGraphEventImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: openGraphEventImage,
    },
  };
}

const BlogSection = ({
  title,
  src,
  description,
  links,
  imgAlt,
  isFancyTitle = true,
  showLink = false,
}) => {
  return (
    <Flex flexDirection="column" rowGap="24">
      {title && (
        <Heading
          level={2}
          fancy={isFancyTitle}
          className={'blog-section--title'}
        >
          {title}
        </Heading>
      )}
      {src && (
        <Image
          src={src}
          alt={imgAlt}
          width={800}
          height={400}
          className="blog-section--img"
        />
      )}
      {links && Array.isArray(links) ? (
        <>
          {links.map((link, index) => {
            return (
              <Heading level={4} key={index}>
                <a
                  href={`${link?.link}`}
                  className="blog-section--link"
                  data-qa-selector="event_details_page_venue_label"
                >
                  {link?.name}
                </a>
              </Heading>
            );
          })}
        </>
      ) : null}
      {description && Array.isArray(description) ? (
        <Flex flexDirection="column" rowGap="24">
          {description.map((desc, index) => {
            return (
              <Heading
                level={4}
                key={index}
                className="blog-section--description"
              >
                {desc}
                {showLink && index === description?.length - 1 ? (
                  <span>
                    <a href="/" className="blog-section--description--link">
                      Yapsody.events
                    </a>
                  </span>
                ) : null}
              </Heading>
            );
          })}
        </Flex>
      ) : null}
    </Flex>
  );
};

const Blog = () => {
  const similarBlogs = [];
  return (
    <>
      <div className="blog-detail-page">
        <Heading
          level={1}
          fancy={false}
          className={'blog-detail-page--heading'}
          dataQaSelector={'blog_details_page_title'}
        >
          Top 4th of July Events and Ceremony in the USA
        </Heading>
        <LazyImage
          src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/blogs/4th_july_events/july_event_card_image.png`}
          alt={'Blog Image'}
          width={800}
          height={400}
          className={'blog-detail-page--main-img'}
        />
        <Heading
          level={4}
          className={'blog-detail-page--description'}
          dataQaSelector={'blog_details_page_content'}
        >
          {`As the nation gears up to celebrate its independence, the 4th of July
          holds a special place in the heart of every American. This historic
          day presents exciting events and activities for all to enjoy. From
          historical walking tours that delve into the rich tapestry of history
          to picnics filled with laughter and camaraderie, and breathtaking
          firework displays that light up the night sky in a dazzling array of
          colors, there's something for everyone.`}
        </Heading>

        <Flex
          flexDirection="column"
          // rowGap="64"
          style={{
            // marginTop: '64px',
            marginBottom: '80px',
          }}
          className={'blog-detail-page--container'}
        >
          <BlogSection
            title="Things to do on 4th of July:"
            description={[
              'To honor this independence, there are countless ways to join in the festivities and make the most of this occasion.',
            ]}
            isFancyTitle={false}
          />
          <BlogSection
            title="1. Walking Tour"
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/blogs/4th_july_events/Walking_Tour.jpg`}
            links={[
              {
                name: '4th of July Old Port Historic Walking Tour',
                link: '/events/1101714-4th-of-july-old-port-historic-walking-tour',
              },
            ]}
            description={[
              'Embark on a journey through time with the 4th of July Old Port Historic Walking Tour. Led by the knowledgeable Leigh Rush Olson, this casual 2 1/2 hour, 2-mile tour delves into the rich history of Portland, Maine. From the city’s resilience in the face of adversity to its architectural marvels, each step uncovers a new layer of the past.',
              'Learn about the origins of prohibition, explore historical landmarks, and discover hidden gems along the way. Advanced tickets are required, so be sure to secure your spot early for this unforgettable experience.',
            ]}
            imgAlt="Walking Tour"
          />
          <BlogSection
            title="2. Picnic"
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/blogs/4th_july_events/Picnic.jpg`}
            links={[
              {
                name: 'Willie Nelson’s 4th of July Picnic with Bob Dylan and more',
                link: '/events/648071-willie-nelson-s-4th-of-july-picnic-with-bob-dylan-and-more',
              },
              {
                name: 'Willie Nelson’s 4th of July PIcnic with Bob Dylan, Robert Plant & More',
                link: '/events/1097198-willie-nelson-s-4th-of-july-picnic-with-bob-dylan-robert-plant-more',
              },
            ]}
            description={[
              'Pack your picnic basket, gather your friends and family, and celebrate America’s independence in style. Set against the backdrop of lively tunes and good company, this iconic event promises an unforgettable experience for music enthusiasts of all ages.',
              'Willie Nelson’s 4th of July Picnic is an iconic event that brings together music legends and fans alike for a day of celebration and unforgettable performances. Held annually on Independence Day, this legendary picnic is a must-attend event for music enthusiasts from across the country.',
              'The lineup typically features an impressive array of artists, with past editions boasting the likes of Bob Dylan, Robert Plant, and many other renowned musicians. Attendees can expect to be treated to a diverse range of musical styles, from country and rock to folk and blues.',
              'Where to meet: Freedom Mortgage Pavilion, Camden, New Jersey',
            ]}
            imgAlt="Willie Nelson’s 4th of July Picnic with Bob Dylan"
          />
          <BlogSection
            title="3. Fireworks"
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/blogs/4th_july_events/Fireworks.jpg`}
            links={[
              {
                name: '4th of July Fireworks Spectacular with San Francisco Symphony',
                link: '/events/1100686-4th-of-july-fireworks-spectacular-with-san-francisco-symphony',
              },
            ]}
            description={[
              'The 4th of July Fireworks Spectacular with the San Francisco Symphony presents “Defying Gravity: A Celebration of Heroes Featuring Songs from Wicked.” This electrifying event combines the awe-inspiring spectacle of fireworks with a captivating musical performance by the renowned San Francisco Symphony. Under the baton of conductor Edwin Outwitted and featuring vocalist Jessica Vosk, attendees will be treated to a dynamic program that includes beloved songs from the hit Broadway musical Wicked, such as “The Wizard and I” and “Defying Gravity.” Additionally, the symphony will perform iconic tunes like “Heroes” by David Bowie and “Wind Beneath My Wings” from Beaches, creating a moving tribute to the heroes who have shaped the nation.',
              'Feeling the urge to get up and go somewhere? That’s the spirit of the Fourth of July! It’s the liveliest day of the year, bursting with pride for America.',
              'If you’re hungry for more excitement and fun-filled Fourth of July events and celebrations, don’t miss out! Click the link below to explore further.',
              'To explore even more exciting 4th of July events, visit',
            ]}
            imgAlt="4th of July Fireworks Spectacular with San Francisco Symphony"
            showLink={true}
          />
        </Flex>
      </div>
      {similarBlogs?.length ? (
        <div className="similar-blogs">
          <Heading level={3} fancy>
            Check Out Other Blogs
          </Heading>
          <div className="similar-blogs--container">
            {similarBlogs?.map((blog) => {
              return <BlogCard gridView={true} key={blog?.id} blog={blog} />;
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Blog;
