import React from 'react';
import cx from 'classnames';

const FLEX_GAP_VALUES = {
  2: true,
  4: true,
  6: true,
  8: true,
  12: true,
  16: true,
  20: true,
  24: true,
  32: true,
  40: true,
};

const JUSTIFY_CONTENT_VALUES = {
  'flex-start': true,
  'flex-end': true,
  center: true,
  'space-around': true,
  'space-between': true,
  'space-evenly': true,
};

const FLEX_DIRECTION_VALUES = {
  row: true,
  'row-reverse': true,
  column: true,
  'column-reverse': true,
};

const ALIGN_ITEMS_VALUES = {
  stretch: true,
  'flex-start': true,
  'flex-end': true,
  center: true,
};

const Flex = ({
  gap,
  rowGap,
  columnGap,
  customGap,
  customRowGap,
  customColumnGap,
  justifyContent,
  alignItems,
  flex,
  flexGrow,
  flexShrink,
  flexBasis,
  flexDirection,
  children,
  className,
  style,
  flexWrap,
  as,
  dataQaSelector,
  ...props
}) => {
  if (justifyContent && !JUSTIFY_CONTENT_VALUES[justifyContent]) {
    /* eslint-disable no-console */
    console.error(
      `Invalid value '${justifyContent}' provided for 'justify-content'`
    );
  }

  if (alignItems && !ALIGN_ITEMS_VALUES[alignItems]) {
    /* eslint-disable no-console */
    console.error(`Invalid value '${alignItems}' provided for 'align-items'`);
  }

  if (gap && !FLEX_GAP_VALUES[gap]) {
    /* eslint-disable no-console */
    console.error(`Invalid value '${gap}' provided for 'gap'`);
  }

  if (rowGap && !FLEX_GAP_VALUES[rowGap]) {
    /* eslint-disable no-console */
    console.error(`Invalid value '${rowGap}' provided for 'row-gap'`);
  }

  if (columnGap && !FLEX_GAP_VALUES[columnGap]) {
    /* eslint-disable no-console */
    console.error(`Invalid value '${columnGap}' provided for 'column-gap'`);
  }

  if (flexDirection && !FLEX_DIRECTION_VALUES[flexDirection]) {
    /* eslint-disable no-console */
    console.error(
      `Invalid value '${flexDirection}' provided for 'flex-direction'`
    );
  }

  const customStyles = {
    ...style,
    gap: customGap,
    rowGap: customRowGap,
    columnGap: customColumnGap,
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
  };

  const classNames = cx({
    'y-flex': true,
    [`y-flex__justify-content--${justifyContent}`]: Boolean(justifyContent),
    [`y-flex__align-items--${alignItems}`]: Boolean(alignItems),
    [`y-flex__gap--${gap}`]: Boolean(gap),
    [`y-flex__row-gap--${rowGap}`]: Boolean(rowGap),
    [`y-flex__column-gap--${columnGap}`]: Boolean(columnGap),
    [`y-flex__direction--${flexDirection}`]: Boolean(flexDirection),
    [`y-flex__wrap--${flexWrap}`]: Boolean(flexWrap),
    [className]: Boolean(className),
  });

  const Component = as || 'div';

  return (
    <Component
      className={classNames}
      style={customStyles}
      data-qa-selector={dataQaSelector}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Flex;
