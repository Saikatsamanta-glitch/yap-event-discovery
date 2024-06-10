import React, { Suspense } from 'react';
import Flex from './Flex';
import Heading from './Heading';
import { createQueryString, getEventCategories } from '@/services';
import ContentLoader from './ContentLoader';
import { Button, CategoriesOverlay } from '.';
import cx from 'classnames';
import Image from 'next/image';
import { convertStringToUrlFormat } from './utils';

async function CategoryList({
  searchParams,
  page = '/',
  className = '',
  dataQaSelector = 'homepage',
  categoryListclassName = '',
  categoryLimit = 0,
  isShowMore = true,
}) {
  const categoryName = searchParams?.category || '';
  const data = await getEventCategories();

  if (!data) return;

  const genreCategoryClassNames = cx({
    'event-genre-category': true,
    [className]: Boolean(className),
  });

  const categoryListClassNames = cx({
    'event-genre-category__list': true,
    [categoryListclassName]: Boolean(categoryListclassName),
  });

  const categoriesLimit = categoryLimit
    ? categoryLimit
    : data?.categories?.length;

  return (
    <Flex gap="12" flexDirection="column" className={genreCategoryClassNames}>
      <Flex gap="24" className={categoryListClassNames}>
        {data?.categories?.slice(0, categoriesLimit)?.map((category) => {
          const isSelected =
            categoryName === convertStringToUrlFormat({ data: category?.name });
          const categoryImageUrl = category?.logo?.light_logo
            ? `${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}${category?.logo?.light_logo}`
            : null;

          const classNames = cx({
            'event-genre-category__list--item-btn': true,
            'event-genre-category__list--item-btn-selected': isSelected,
          });

          return (
            <li key={category.id} className="event-genre-category__list--item">
              <Flex flexDirection="column" gap="12" alignItems="center">
                <Button
                  as="a"
                  variant="outline"
                  className={classNames}
                  selected={isSelected}
                  href={`${page}${createQueryString({
                    ...searchParams,
                    category: isSelected
                      ? null
                      : convertStringToUrlFormat({ data: category?.name }),
                  })}`}
                  dataQaSelector={`${dataQaSelector}_category_${category?.name
                    ?.replace(/\s/g, '')
                    ?.toLowerCase()}_image`}
                >
                  <Image
                    src={
                      categoryImageUrl ||
                      `${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/category/FallbackIcon-light.svg`
                    }
                    alt={`${category?.name} Icon`}
                    width={56}
                    height={56}
                    className={'event-genre-category__list--item-light'}
                  />
                </Button>
                <Heading
                  level="5"
                  dataQaSelector={`${dataQaSelector}_category_${category?.name
                    ?.replace(/\s/g, '')
                    ?.toLowerCase()}_label`}
                  className="event-genre-category__list--item-label"
                >
                  {category?.name}
                </Heading>
              </Flex>
            </li>
          );
        })}
        {isShowMore ? (
          <li className="event-genre-category__list--item">
            <CategoriesOverlay
              searchParams={searchParams}
              page={page}
              dataQaSelector={dataQaSelector}
            />
          </li>
        ) : null}
      </Flex>
    </Flex>
  );
}

const EventGenreCategory = ({
  searchParams,
  page = '/',
  className = '',
  dataQaSelector = 'homepage',
  categoryListclassName = '',
  categoryLimit = 0,
  isShowMore = true,
}) => {
  return (
    <Suspense
      fallback={
        <Flex
          gap="24"
          flexDirection="column"
          className={'event-genre-category'}
        >
          <Flex
            gap="24"
            className="event-genre-category__list"
            flexWrap={'wrap'}
          >
            {new Array(14).fill(1).map((_, index) => (
              <ContentLoader
                key={index}
                className="event-genre-category__list--item"
                height="80px"
                width="80px"
                borderRadius="8px"
              />
            ))}
          </Flex>
        </Flex>
      }
    >
      <CategoryList
        page={page}
        searchParams={searchParams}
        categoryListclassName={categoryListclassName}
        dataQaSelector={dataQaSelector}
        className={className}
        categoryLimit={categoryLimit}
        isShowMore={isShowMore}
      />
    </Suspense>
  );
};

export default EventGenreCategory;
