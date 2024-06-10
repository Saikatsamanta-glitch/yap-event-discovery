'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import * as Popover from '@radix-ui/react-popover';

import Input from '../Input';
import { createQueryString } from '@/services';
import Image from 'next/image';

const dropdownItemMap = {
  event: {
    icon: `${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Event-red.svg`,
    renderSubtitle: (searchText) => `events with “${searchText}” title`,
  },
  artist: {
    icon: `${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Artist-red.svg`,
    renderSubtitle: (searchText) => `events featuring “${searchText}” artist`,
  },
  venue: {
    icon: `${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Location-red.svg`,
    renderSubtitle: (searchText) => `events with “${searchText}” venue`,
  },
  organizer: {
    icon: `${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Organization-red.svg`,
    renderSubtitle: (searchText) => `events organized by “${searchText}”`,
  },
};

const SearchDropdownItem = ({ type, searchText }) => {
  const DropdownIcon = dropdownItemMap[type]?.icon;

  return (
    <button
      type="button"
      className="searchbar-dropdown--item"
      onClick={() => {
        const query = createQueryString({
          q: encodeURIComponent(searchText),
          type,
        });
        location.href = `/search${query}`;
      }}
    >
      <div
        className="searchbar-dropdown--item-icon"
        data-qa-selector={`header_search_with_${type}_image`}
      >
        <Image src={DropdownIcon} alt={'Icon'} width={19} height={19} />
      </div>
      <div className="searchbar-dropdown--item-content">
        <p
          className="searchbar-dropdown--item-content-title"
          data-qa-selector={`header_search_with_${type}_label`}
        >
          {searchText}
        </p>
        <p className="searchbar-dropdown--item-content-subtitle">
          {dropdownItemMap[type]?.renderSubtitle(searchText)}
        </p>
      </div>
    </button>
  );
};

const SearchBox = ({ placeholder, dataQaSelector, ...props }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('q') || '';
  const router = useRouter();
  const [openDropdown, setOpenDropDown] = useState(false);

  const [searchValue, setSearchValue] = useState(search);

  const isSearchPage = pathname.includes('/search');

  useEffect(() => {
    if (!searchValue) {
      setOpenDropDown(false);
    }
  }, [searchValue, router, isSearchPage]);

  return (
    <div className="searchbar" data-qa-selector="header_search_bar_input">
      <>
        <Input
          value={searchValue}
          dataQaSelector={dataQaSelector}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // keeping code open for future changes
              const query = createQueryString({
                q: encodeURIComponent(searchValue),
                type: 'event',
              });
              location.href = `/search${query}`;
            }
          }}
          onChange={(value) => {
            setSearchValue(value);
            if (value) {
              setOpenDropDown(true);
            }
          }}
          onFocus={() => {
            if (searchValue) {
              setOpenDropDown(true);
            }
          }}
          showClearBtn
          clearBtnProps={{
            searchValue,
          }}
          {...props}
        />
        <Popover.Root open={openDropdown} onOpenChange={setOpenDropDown}>
          <Popover.Trigger asChild>
            <div />
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              className="searchbar-dropdown"
              sideOffset={5}
              align="start"
              onOpenAutoFocus={(event) => {
                event.preventDefault();
              }}
            >
              <SearchDropdownItem type="event" searchText={searchValue} />
              <SearchDropdownItem type="artist" searchText={searchValue} />
              <SearchDropdownItem type="venue" searchText={searchValue} />
              <SearchDropdownItem type="organizer" searchText={searchValue} />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </>
    </div>
  );
};

export default SearchBox;
