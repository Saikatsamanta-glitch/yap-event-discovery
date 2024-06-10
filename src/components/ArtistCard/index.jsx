import React from 'react';
import { Heading } from '..';
import { getDecodedText } from '../utils';

const ArtistCard = ({ artist, dataQaSelector }) => {
  const initials = artist?.name?.charAt(0)?.toUpperCase();

  const artistName = getDecodedText({
    text: artist?.name,
  });

  return (
    <div
      className="y-artist-card"
      data-qa-selector={`${dataQaSelector}_artist_name_label`}
    >
      <div
        className="y-artist-card__image"
        data-qa-selector={`${dataQaSelector}_artist_image`}
      >
        {initials}
      </div>
      <a href={`/search?q=${artistName}&type=artist`}>
        <Heading level="5" data-qa-selector={`${dataQaSelector}_artist_name`}>
          {artistName}
        </Heading>
      </a>
    </div>
  );
};

export default ArtistCard;
