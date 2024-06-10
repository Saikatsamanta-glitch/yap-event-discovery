'use client';
import { useState, useEffect } from 'react';
import { clientCookiesUtils, convertStringToUrlFormat } from './utils';

const CategoryLinks = ({ category, index }) => {
  const [cookiesUrl, setCookiesUrl] = useState();

  useEffect(() => {
    const url = clientCookiesUtils()?.get?.('x-url') || '';

    setCookiesUrl(url);
  }, []);

  return (
    <li key={category.id} className="footer-list__item">
      <a
        href={`${cookiesUrl}/?category=${convertStringToUrlFormat({
          data: category?.name,
        })}`}
        className="footer-list__link"
        rel="noreferrer"
        data-qa-selector={`footer_category_${index + 1}_link`}
      >
        {category.name}
      </a>
    </li>
  );
};

export default CategoryLinks;
