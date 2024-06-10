import Image from 'next/image';
import React from 'react';
import cx from 'classnames';
import { Flex, Heading } from '@/components';
import BlogCard from '@/components/BlogCard';
import { blogPageMetaKeywords, metaDataTitleSuffix } from '@/components/utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata(_, parent) {
  const title = `Yapsody Events - Official Yapsody Events blog! Discover what's happening in your city! ${metaDataTitleSuffix}`;
  const description = `Official blog of Yapsody Events in your City, Find out whats happening in your city!`;

  const previousImages = (await parent).openGraph?.images || [];

  const openGraphEventImage = [
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

const BlogList = () => {
  const className = cx({
    'blog-home-page': true,
    'blog-home-page__bg': true,
  });

  const blogList = [
    {
      id: 1,
      name: 'Top 4th of July Events and Ceremony in the USA',
      image_url: `${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/blogs/4th_july_events/july_event_card_image.png`,
      blogTime: '3 min read',
      start_date: '2024-05-20T08:37:52.000Z',
      start_date_timezone: {
        utc_offset: '00:00',
      },
    },
  ];

  return (
    <>
      <div
        className={className}
        data-qa-selector={`blogs_banner_image`}
        style={{
          position: 'relative',
        }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/home-banner-light.jpg`}
          fill={true}
          alt={'Background Light Image'}
          className={'blog-home-page__bg-light'}
          data-qa-selector={'blog_list_page_banner_image'}
        />
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/home-banner-dark.jpg`}
          fill={true}
          alt={'Background Dark Image'}
          className={'blog-home-page__bg-dark'}
          data-qa-selector={'blog_list_page_banner_image'}
        />
        <Flex
          flexDirection="column"
          gap="8"
          style={{
            width: '100%',
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Heading
            level={1}
            dataQaSelector={'blog_list_page_title'}
            className={'blog-home-page--title'}
          >
            Blogs
          </Heading>
          <Heading
            level={4}
            dataQaSelector={'blog_list_page_description'}
            style={{ maxWidth: '600px', textAlign: 'center' }}
            className={'blog-home-page--description'}
          >
            Discover the latest insights and in-depth research on upcoming
            events. Gain a comprehensive understanding of each event!
          </Heading>
        </Flex>
      </div>

      <div className="event-grid">
        <div className="event-grid--container">
          {blogList?.map((blog, index) => {
            return (
              <BlogCard
                gridView={true}
                key={blog?.id}
                blog={blog}
                dataQaSelector={`blog_list_page_blog_card_${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BlogList;
