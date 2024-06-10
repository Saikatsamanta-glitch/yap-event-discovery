'use client';
import React from 'react';
import { Button } from '.';

const GetDirections = ({ location, className }) => {
  if (!location?.latitude || !location?.longitude) return null;

  return (
    <Button
      as="a"
      data-qa-selector="event_details_page_get_directions_button"
      href="/"
      onClick={(e) => {
        e.preventDefault();

        const url =
          'https://maps.google.com/?q=' +
          location?.latitude +
          ',' +
          location?.longitude;
        window.open(url);
      }}
      variant="outline"
      className={className}
    >
      Get Directions
    </Button>
  );
};

export default GetDirections;
