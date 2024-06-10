'use client';
import React, { useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

const RenderClearBtn = ({
  clearBtnProps,
  dataQaSelector,
  inputRef,
  onChange,
  setInputFocused,
}) => {
  const [redirectUrl, setRedirectUrl] = useState('/');

  const { searchValue } = clearBtnProps;

  useEffect(() => {
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : process.env.NEXT_PUBLIC_HOST_URL;

    if (typeof window !== 'undefined') {
      const url = document.referrer.split(baseUrl).join('');

      if (url.includes('/search')) {
        setRedirectUrl('/');
      }
      setRedirectUrl(url);
    }
  }, []);

  return searchValue ? (
    <Link
      data-qa-selector={`${dataQaSelector}_cancel_btn`}
      href={redirectUrl}
      style={{ height: '16px' }}
      onClick={() => {
        onChange();
        inputRef?.current?.focus();
        setInputFocused(true);
      }}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Close-light.svg`}
        alt={'Close Light Icon'}
        width={14}
        height={14}
        className={'y-input-icons-light'}
      />
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Close-dark.svg`}
        alt={'Close Dark Icon'}
        width={14}
        height={14}
        className={'y-input-icons-dark'}
      />
    </Link>
  ) : (
    <>
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Search-light.svg`}
        alt={'Search Light Icon'}
        width={18}
        height={18}
        className={'y-input-icons-light'}
      />
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Search-dark.svg`}
        alt={'Search Dark Icon'}
        width={18}
        height={18}
        className={'y-input-icons-dark'}
      />
    </>
  );
};

const Input = ({
  value = '',
  onChange,
  rightComponent,
  className,
  placeholder,
  dataQaSelector,
  showClearBtn,
  clearBtnProps = {},
  onFocus,
  onBlur,
  ...props
}) => {
  const [isInputFocused, setInputFocused] = useState(false);
  const inputRef = useRef(null);

  const rootClassNames = cx({
    'y-input': true,
    [className]: Boolean(className),
  });

  const wrapperClassNames = cx({
    'y-input__wrapper': true,
    focused: Boolean(isInputFocused),
  });

  function handleInputFocus(e) {
    onFocus?.(e);
    setInputFocused(true);
  }

  function handleInputBlur(e) {
    onBlur?.(e);
    setInputFocused(false);
  }

  return (
    <div className={rootClassNames}>
      <div className={wrapperClassNames}>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            onChange(value);
          }}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          {...props}
        />
        <div
          className="y-input__wrapper--right"
          data-qa-selector="header_search_bar_close_button"
        >
          {rightComponent ? (
            rightComponent
          ) : showClearBtn ? (
            <RenderClearBtn
              clearBtnProps={clearBtnProps}
              dataQaSelector={dataQaSelector}
              inputRef={inputRef}
              onChange={onChange}
              setInputFocused={setInputFocused}
            />
          ) : (
            <>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Search-light.svg`}
                alt={'Search Light Icon'}
                width={18}
                height={18}
                className={'y-input-icons-light'}
              />
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Search-dark.svg`}
                alt={'Search Dark Icon'}
                width={18}
                height={18}
                className={'y-input-icons-dark'}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
