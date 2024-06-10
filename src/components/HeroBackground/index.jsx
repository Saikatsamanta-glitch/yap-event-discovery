/* eslint-disable @next/next/no-img-element */
import React from 'react';
import cx from 'classnames';
import Heading from '../Heading';

const HeroBackground = ({
  className,
  title,
  subtitle,
  image,
  children,
  ...props
}) => {
  const classNames = cx({
    'y-hero-background': true,
    [className]: Boolean(className),
  });

  return (
    <div className={classNames} {...props}>
      <div
        className="y-hero-background--image"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0, 0.5), rgba(0,0,0, 0.5)), url(${image})`,
        }}
      />

      <div className="y-hero-background--image-blur-overlay" />

      <div className="y-hero-background--content">
        <div className="y-hero-background--content-image">
          <img
            alt="hey"
            src="https://images.unsplash.com/photo-1563902244988-42d466e79b25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          />
        </div>
        <div className="y-hero-background--content__info">
          <Heading level="4" className="y-hero-background--content__info-title">
            {title}
          </Heading>
          <Heading
            level="1"
            className="y-hero-background--content__info-subtitle"
          >
            {subtitle}
          </Heading>
          {children}
        </div>
      </div>
    </div>
  );
};

export default HeroBackground;
