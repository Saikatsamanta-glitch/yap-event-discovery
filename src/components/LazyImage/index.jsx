'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const FALLBACK_IMAGE = '/images/event_fallback.jpg';

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const LazyImage = ({
  src = FALLBACK_IMAGE,
  alt,
  dataQaSelector,
  className,
  width,
  height,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      loading="lazy"
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        shimmer(width, height)
      )}`}
      width={width}
      height={height}
      className={className}
      src={imgSrc}
      alt={alt}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          setImgSrc(FALLBACK_IMAGE);
        }
      }}
      onError={() => {
        setImgSrc(FALLBACK_IMAGE);
      }}
      data-qa-selector={`${dataQaSelector}_image`}
      {...props}
    />
  );
};

export default LazyImage;
