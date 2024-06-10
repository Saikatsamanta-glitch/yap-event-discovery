import React from 'react';
import { LazyImage } from '.';
import cx from 'classnames';

const PromotionalImage = ({
  ctaUrl,
  gridView,
  className = '',
  dataQaSelector = '',
  imageUrl = '',
}) => {
  const classNames = cx({
    'promotional-image': !Boolean(className),
    [className]: Boolean(className),
  });

  return (
    <div className={classNames} data-grid-view={Boolean(gridView)}>
      <a
        href={ctaUrl}
        target="_blank"
        rel="noreferrer"
        data-qa-selector={dataQaSelector}
      >
        <LazyImage
          width={500}
          height={156}
          className="promotional-image--img"
          src={
            imageUrl
              ? imageUrl
              : `${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/promotional_images/promotional_image.jpg`
          }
          style={gridView ? { width: '100%' } : {}}
          alt="promotional-image"
        />
      </a>
    </div>
  );
};

export default PromotionalImage;
