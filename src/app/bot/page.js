import { Heading, Text } from '@/components';
import { BodySearchBox } from '@/components';
import { metaDataTitleSuffix, metaDataKeywords } from '@/components/utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata(_, parent) {
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

  const title = `eventsBot - What is an eventsBot? ${metaDataTitleSuffix}`;
  return {
    title: title,
    description: `eventsBot is a generic name for Yapsody Event's web crawler`,
    keywords: metaDataKeywords,
    openGraph: {
      title: title,
      description: `eventsBot is a generic name for Yapsody Event's web crawler`,
      images: openGraphEventImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: `eventsBot is a generic name for Yapsody Event's web crawler`,
      images: openGraphEventImage,
    },
  };
}

export default function BotPage() {
  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <BodySearchBox />
      <div className="bot">
        <div className="bot-container">
          <Heading
            level="1"
            dataQaSelector="event_discovery_bot_page_heading"
            className="bot-container__heading"
          >
            eventsBot
          </Heading>
          <Text size="large">
            Events employs the eventsBot to crawl websites for event-related
            information. You can identify this bot by checking the user-agent
            string in the request, which will be &apos;eventsBot.&apos;
          </Text>
          <Heading
            fancy
            level="2"
            dataQaSelector="event_discovery_bot_page_sub_heading"
          >
            How the eventsBot Accesses Your Website
          </Heading>
          <Text size="large">
            The eventsBot typically accesses a website once every few seconds on
            average. Occasionally, delays may cause the rate to be slightly
            higher.
            <br />
            <br />
            To optimize efficiency, the eventsBot has been designed to operate
            on multiple machines simultaneously. Consequently, your logs may
            display visits from various machines at yapsody.events, all
            identified with the user-agent &apos;eventsBot&apos;. During each
            visit, we aim to crawl as many pages as possible without
            overwhelming your server&apos;s bandwidth.
          </Text>
          <Heading
            fancy
            level="2"
            dataQaSelector="event_discovery_bot_page_sub_heading"
          >
            Blocking eventsBot from Accessing Your Site
          </Heading>
          <Text size="large">
            If you wish to prevent the eventsBot from accessing confidential or
            private data, you can achieve this by utilizing password-protected
            server directories. It is crucial to distinguish between prohibiting
            the eventsBot from crawling a page and preventing both users and
            crawlers from accessing specific pages.
          </Text>
          <Heading
            fancy
            level="2"
            dataQaSelector="event_discovery_bot_page_sub_heading"
          >
            Verifying the eventsBot
          </Heading>
          <Text size="large">
            Before deciding to block our crawler, it&apos;s important to note
            that other crawlers can potentially mimic the user-agent string used
            by the eventsBot. Therefore, it is recommended to verify that the
            request genuinely originates from Events. Conducting a reverse DNS
            lookup on the source IP address of the request in question is one of
            the most reliable ways to verify this.
            <br />
            <br />
            Similar to other reputable web crawlers, the eventsBot strictly
            adheres to the directives outlined in your website&apos;s robots.txt
            file. If you encounter any issues with our crawling process, please
            do not hesitate to report it to{' '}
            <span>
              <a href="mailto:support@yapsody.com">support@yapsody.com</a>
            </span>
            . We value your feedback and are committed to ensuring a seamless
            experience for both users and website administrators.
          </Text>
        </div>
      </div>
    </div>
  );
}
