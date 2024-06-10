'use client';
import React, { Suspense } from 'react';
import { SearchBox } from '.';

const BodySearchBox = () => {
  return (
    <Suspense>
      <div className="body-searchbar">
        <SearchBox
          dataQaSelector="header_search_bar"
          placeholder="Search for events"
        />
      </div>
    </Suspense>
  );
};

export default BodySearchBox;
