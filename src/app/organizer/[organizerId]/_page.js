import { EventCarousel, HeroBackground } from '@/components';
import { EVENTS } from '@/components/utils';
import React from 'react';

const OrganizerPage = () => {
  return (
    <div>
      <HeroBackground
        image="https://images.unsplash.com/photo-1563902244988-42d466e79b25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        title="Organizer"
        subtitle="Organizer Name"
      />
      {['Upcoming', 'Must Attend Live', 'Online', 'Free'].map((event) => {
        return <EventCarousel key={event} events={EVENTS} title={event} />;
      })}
    </div>
  );
};

export default OrganizerPage;
