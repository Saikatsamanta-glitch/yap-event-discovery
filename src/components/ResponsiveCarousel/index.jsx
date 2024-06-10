'use client';
import Carousel from 'react-multi-carousel';
import Image from 'next/image';
import 'react-multi-carousel/lib/styles.css';
import cx from 'classnames';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ResponsiveCarousel = ({
  CustomLeftArrow = null,
  CustomRightArrow = null,
  images = [],
  carouselclassName = '',
  carouselImageClassName = '',
  children = '',
}) => {
  const bannerClassNames = cx({
    'responsive-carousel': true,
    [carouselclassName]: Boolean(carouselclassName),
  });

  const bannerImageClassNames = cx({
    'responsive-carousel--image': true,
    [carouselImageClassName]: Boolean(carouselImageClassName),
  });

  return (
    <Carousel
      ssr
      responsive={responsive}
      arrows
      infinite={true}
      autoPlay
      containerClass="carousel-container"
      className={bannerClassNames}
      customLeftArrow={CustomLeftArrow ? <CustomLeftArrow /> : null}
      customRightArrow={CustomRightArrow ? <CustomRightArrow /> : null}
      autoPlaySpeed={5000}
    >
      {children
        ? children
        : images?.map((image, index) => {
            return (
              <Image
                key={index}
                className={bannerImageClassNames}
                src={image}
                alt={index}
                sizes="100vw"
                width={100}
                height={400}
              />
            );
          })}
    </Carousel>
  );
};

export default ResponsiveCarousel;
