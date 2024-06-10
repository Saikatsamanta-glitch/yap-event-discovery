import React from 'react';
import cx from 'classnames';

const Divider = ({ className, children, dataQaSelector, ...props }) => {
  const classNames = cx({
    'y-divider': true,
    [className]: Boolean(className),
  });

  return (
    <div
      className={classNames}
      data-qa-selector={`${dataQaSelector}_divider`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Divider;
