import React from 'react';
import cx from 'classnames';

const TYPES = ['blur', 'outline'];

const Tag = ({
  asLink,
  className,
  children,
  type = TYPES[0],
  active,
  dataQaSelector,
  ...props
}) => {
  const classNames = cx({
    'y-tag': true,
    [`y-tag--${type}`]: Boolean(type),
    [`y-tag--${type}-active`]: Boolean(active),
    [className]: Boolean(className),
  });

  const Component = asLink ? 'a' : 'button';

  return (
    <Component
      className={classNames}
      data-qa-selector={dataQaSelector}
      {...props}
    >
      {type === 'blur' && !active ? <div className="y-tag--blur-bg" /> : null}
      <span>{children}</span>
    </Component>
  );
};

export default Tag;
