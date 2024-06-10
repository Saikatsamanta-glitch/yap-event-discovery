import React from 'react';
import {
  ArtistCard,
  CalendarEvent,
  Flex,
  Heading,
  HeroBackground,
} from '@/components';

const ArtistPage = () => {
  return (
    <div>
      <HeroBackground
        image="https://images.unsplash.com/photo-1563902244988-42d466e79b25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        title="Artist"
        subtitle="Artist Name"
      />
      <div className="artist-page__detail">
        <Flex flexDirection="column" gap="20" flexBasis="45%">
          <Heading level="4" fancy>
            Upcoming Events
          </Heading>
          <Flex gap="16" flexDirection="column">
            {new Array(10).fill(0).map((_, i) => (
              <CalendarEvent
                key={i}
                title="Potterville, CA, US"
                subtitle="Eagle Mountain Casino"
              />
            ))}
          </Flex>
        </Flex>
        <Flex flexDirection="column" gap="20" flex="1">
          <Heading level="4" fancy>
            Similar Artists
          </Heading>
          <Flex columnGap="24" rowGap="16" flexWrap="wrap">
            <ArtistCard />
            <ArtistCard />
            <ArtistCard />
            <ArtistCard />
            <ArtistCard />
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default ArtistPage;
