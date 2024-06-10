import React from 'react';
import cx from 'classnames';

const Heading = ({
  as,
  children,
  level = 6,
  fancy,
  color,
  className,
  dataQaSelector,
  ...props
}) => {
  const classNames = cx({
    'y-text': true,
    'y-text__fancy': Boolean(fancy),
    [`y-text__h${level}`]: Boolean(level),
    [`y-text__color--${color}`]: color,
    [className]: Boolean(className),
  });

  const Component = as || `h${level}`;

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

export default Heading;
