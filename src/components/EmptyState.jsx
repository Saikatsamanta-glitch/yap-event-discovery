'use client';
import { useState, useEffect } from 'react';
import { Button, Flex } from '.';
import Illustration from './Illustration';
import { clientCookiesUtils } from './utils';

export default function EmptyState({
  illustration = 'no-search-result',
  onClick,
  buttonTitle,
  title,
  subtitle,
  alt = 'Illustration',
  detailStyle,
  dataQaSelector,
  width = 200,
  height = 200,
  asLink = false,
  link,
}) {
  const [cookiesUrl, setCookiesUrl] = useState();

  useEffect(() => {
    const url = clientCookiesUtils()?.get?.('x-url') || '';

    setCookiesUrl(url);
  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      className="empty-screen"
    >
      <Illustration
        src={illustration}
        alt={alt}
        dataQaSelector={dataQaSelector}
        width={width}
        height={height}
      />
      <div className="empty-screen__info" style={detailStyle}>
        {title ? (
          <h3
            data-qa-selector={`${dataQaSelector}_title`}
            className="empty-screen__heading"
          >
            {title}
          </h3>
        ) : null}
        {subtitle ? (
          <p
            data-qa-selector={`${dataQaSelector}_description`}
            className="empty-screen__subheading"
          >
            {subtitle}
          </p>
        ) : null}
        {buttonTitle && !asLink ? (
          <Button dataQaSelector={dataQaSelector} onClick={onClick}>
            {buttonTitle}
          </Button>
        ) : null}
        {buttonTitle && asLink ? (
          <Button
            dataQaSelector={dataQaSelector}
            as="a"
            href={`${cookiesUrl}${link}`}
          >
            {buttonTitle}
          </Button>
        ) : null}
      </div>
    </Flex>
  );
}
