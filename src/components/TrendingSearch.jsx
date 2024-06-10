'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { trendingSerachResults } from './utils';

const TrendingSearch = () => {
  const params = useParams();
  const country = params?.countryName || params?.country || 'united-states';

  const countryTrendingSearches = trendingSerachResults[country] || [];

  return countryTrendingSearches && countryTrendingSearches?.length ? (
    <div className="footer-list__item_trending_wrapper">
      <p
        className="footer-list__header"
        data-qa-selector="footer_concerts_label"
      >
        Trending Searches
      </p>
      <ul>
        {countryTrendingSearches?.map((search, index) => {
          return (
            <React.Fragment key={index}>
              <li className="footer-list__item">
                <a
                  href={search?.url}
                  className="footer-list__link"
                  rel="noreferrer"
                  data-qa-selector={search?.dataQaSelector}
                >
                  {search.name}
                </a>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  ) : null;
};

export default TrendingSearch;
