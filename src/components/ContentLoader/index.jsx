import React from 'react';
import cx from 'classnames';

const ContentLoader = ({
  className,
  width,
  height,
  borderRadius,
  style,
  ...props
}) => {
  const classNames = cx({
    'content-loader': true,
    [className]: Boolean(className),
  });

  const CUSTOM_STYLES = {
    minWidth: width,
    minHeight: height,
    borderRadius,
    ...style,
  };

  return <div className={classNames} style={CUSTOM_STYLES} {...props}></div>;
};

export default ContentLoader;
