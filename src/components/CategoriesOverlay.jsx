'use client';
import React, { useState } from 'react';
import Overlay from './Overlay';
import { EventGenreCategory } from '.';
import { Button, Heading } from '.';
import Image from 'next/image';

const CategoriesOverlay = ({
  searchParams,
  dataQaSelector = 'homepage',
  page,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleOnClose() {
    setIsOpen((s) => !s);
  }

  return (
    <>
      <Overlay
        open={isOpen}
        onClose={handleOnClose}
        title="All Categories"
        dataQaSelector={`${dataQaSelector}_category`}
        className="categories-overlay"
        trigger={
          <div className="categories-overlay__more_wrapper">
            <Button
              as="a"
              variant="outline"
              dataQaSelector={`${dataQaSelector}_category_more`}
              className="categories-overlay__more_wrapper-btn"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/category/More-light.svg`}
                alt={`More Icon`}
                width={56}
                height={56}
                className={''}
              />
            </Button>
            <Heading
              level="5"
              dataQaSelector={`${dataQaSelector}_category_more_label`}
              className="categories-overlay__more_wrapper-label"
            >
              More
            </Heading>
          </div>
        }
        showCloseIcon={true}
      >
        <EventGenreCategory
          searchParams={searchParams}
          categoryListclassName="categories-overlay__list"
          dataQaSelector={`${dataQaSelector}_category_overlay`}
          isShowMore={false}
          page={page}
        />
      </Overlay>
    </>
  );
};

export default CategoriesOverlay;
