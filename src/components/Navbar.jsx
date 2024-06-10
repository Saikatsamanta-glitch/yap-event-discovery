import React, { Suspense } from 'react';
import Flex from './Flex';
import SearchBox from './SearchBox';
import { Button } from '.';
import { PlusIcon } from './Icons';
import NavbarFooterLogoLink from './NavbarFooterLogoLink';

const Navbar = () => {
  return (
    <Flex
      as="header"
      gap="12"
      justifyContent="center"
      className="navbar"
      dataQaSelector="event_discovery_header_whole_header"
    >
      <Flex
        gap="16"
        alignItems="center"
        className="navbar-container"
        style={{ maxWidth: '1200px' }}
        flexDirection="row"
        flexWrap="wrap"
      >
        <Flex
          className="navbar-container-logo-wrapper"
          dataQaSelector="header_logo_image"
        >
          <NavbarFooterLogoLink isNavbar={true} />
        </Flex>
        <Button
          as="a"
          href="https://boxoffice.yapsody.com/ticketing/signup?utm_campaign=header_eventdiscovery_cta"
          target="_blank"
          leftComponent={<PlusIcon width="0.7em" height="0.7em" />}
          className="searchbar-theme-btn"
          dataQaSelector="header_list_your_events"
        >
          List Your Event
        </Button>
        <Flex
          gap="32"
          alignItems="center"
          className="searchbar-theme-btn-wrapper"
        >
          <Suspense>
            <SearchBox
              dataQaSelector="event_discovery_header_search"
              placeholder="Search for events"
            />
          </Suspense>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
