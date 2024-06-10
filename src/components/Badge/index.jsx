import React from 'react';
import cx from 'classnames';

const Badge = ({ className, children, dataQaSelector, ...props }) => {
  const classNames = cx({
    'y-badge': true,
    [className]: Boolean(className),
  });

  return (
    <div
      className={classNames}
      data-qa-selector={`${dataQaSelector}_badge`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;
