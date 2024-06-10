'use client';
import Image from 'next/image';
import React from 'react';

const Illustration = ({
  src,
  alt,
  width = 200,
  height = 200,
  dataQaSelector,
}) => {
  return (
    <>
      <Image
        className="illustration-dark"
        data-qa-selector={`${dataQaSelector}_image`}
        width={width}
        height={height}
        src={`/images/${src}-dark.svg`}
        alt={alt}
      />

      <Image
        className="illustration-light"
        data-qa-selector={`${dataQaSelector}_image`}
        width={width}
        height={height}
        src={`/images/${src}-light.svg`}
        alt={alt}
      />
    </>
  );
};

export default Illustration;
