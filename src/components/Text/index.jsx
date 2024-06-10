import React from 'react';
import cx from 'classnames';

const Text = ({
  as,
  children,
  size,
  className,
  color,
  dataQaSelector,
  ...props
}) => {
  const classNames = cx({
    'y-text': true,
    [`y-text__body--${size}`]: Boolean(size),
    [`y-text__color--${color}`]: color,
    [className]: Boolean(className),
  });

  const Component = as || 'p';
  return (
    <Component
      className={classNames}
      data-qa-selector={dataQaSelector}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;
