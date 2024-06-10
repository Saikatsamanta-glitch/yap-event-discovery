import React from 'react';
import cx from 'classnames';

const mapBtntoClassnames = {
  solid: 'y-button--solid',
  outline: 'y-button--outline',
};

const Button = ({
  as,
  className,
  dataQaSelector,
  selected = false,
  children,
  variant = 'solid',
  leftComponent,
  ...props
}) => {
  const Component = as || 'button';

  const classNames = cx({
    'y-button': true,
    'y-button--selected': selected,
    [mapBtntoClassnames[variant]]: true,
    [className]: Boolean(className),
  });

  return (
    <Component
      className={classNames}
      data-qa-selector={`${dataQaSelector}_button`}
      {...props}
    >
      {leftComponent ? (
        <span className="y-button--component y-button--component-left">
          {leftComponent}
        </span>
      ) : null}
      <span>{children}</span>
    </Component>
  );
};

export default Button;
