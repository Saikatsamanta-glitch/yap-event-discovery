'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ShareEvent = ({ title, url, presetKey = '' }) => {
  const [isCopied, setIsCopied] = useState(false);

  function copyTextToClipboard(url) {
    return navigator?.clipboard?.writeText?.(url);
  }

  const handleCopyClick = () => {
    copyTextToClipboard(url).then(() => {
      setIsCopied(true);
    });
  };

  useEffect(() => {
    let timeoutId;

    if (isCopied) {
      timeoutId = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isCopied]);

  const openPopup = (url, width, height) => {
    if (typeof window !== 'undefined') {
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      window.open(
        url,
        '_blank',
        `width=${width},height=${height},top=${top},left=${left}`
      );
    }
  };

  function isMobileOrTablet() {
    return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
  }

  const handleShare = (platform) => {
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case 'whatsapp':
        shareUrl = `https://${
          isMobileOrTablet() ? 'api' : 'web'
        }.whatsapp.com/send/?text=${encodeURIComponent(
          `Hey Check this out!\n\n${title}\n`
        )}%20${encodeURIComponent(url)}%20${encodeURIComponent(
          `\n-Discover the latest, the greatest, and most exciting event on yapsody.events`
        )}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(
          `Take a look at this event, I believe you will find this interesting.\n\n${title}\n`
        )}&via=${encodeURIComponent('Yapsody')}`;
        break;
      case 'pinterest':
        shareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
          url
        )}`;
        break;
      default:
        return;
    }

    if (window.innerWidth < 768) {
      // Open in a new tab for mobile screens
      window.open(shareUrl, '_blank');
    } else {
      // Open in a popup centered on the screen for larger screens
      const width = 600;
      const height = 400;
      openPopup(shareUrl, width, height);
    }
  };

  return (
    <>
      {isCopied && (
        <button
          type="button"
          data-qa-selector={`${presetKey}event_details_page_copy_link_success_label`}
          className="share-overlay-btn"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-share-icons/Copy%20Link.svg`}
            alt={'Copy Link Icon'}
            width={32}
            height={32}
          />
          <span>Link Copied</span>
        </button>
      )}
      <div className="share-overlay__content">
        <button
          className="share-overlay__item"
          data-qa-selector={`${presetKey}event_details_page_share_on_facebook_button`}
          onClick={() => handleShare('facebook')}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-share-icons/Facebook.svg`}
            alt={'Facebook Icon'}
            width={32}
            height={32}
          />
        </button>
        <button
          className="share-overlay__item"
          data-qa-selector={`${presetKey}event_details_page_share_on_whatsapp_button`}
          onClick={() => handleShare('whatsapp')}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-share-icons/Whatsapp.svg`}
            alt={'WhatsApp Icon'}
            width={32}
            height={32}
          />
        </button>
        <button
          className="share-overlay__item"
          data-qa-selector={`${presetKey}event_details_page_share_on_linkedin_button`}
          onClick={() => handleShare('linkedin')}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-share-icons/LinkedIn.svg`}
            alt={'Linkedin Icon'}
            width={32}
            height={32}
          />
        </button>
        <button
          className="share-overlay__item"
          data-qa-selector={`${presetKey}event_details_page_share_on_twitter_button`}
          onClick={() => handleShare('twitter')}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-share-icons/X.svg`}
            alt={'X Icon'}
            width={32}
            height={32}
          />
        </button>
        <button
          className="share-overlay__item"
          data-qa-selector={`${presetKey}event_details_page_share_on_pinterest_button`}
          onClick={() => handleShare('pinterest')}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-share-icons/Pinterest.svg`}
            alt={'Pinterest Icon'}
            width={32}
            height={32}
          />
        </button>
        <button
          data-qa-selector={`${presetKey}event_details_page_copy_event_link_button`}
          onClick={handleCopyClick}
          className="share-overlay__item copy-link"
        >
          <div
            className="share-overlay__item-icon"
            data-qa-selector={`${presetKey}event_discovery_event_details_share_event_overlay_copy_logo`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-share-icons/Copy%20Link.svg`}
              alt={'Copy Link Icon'}
              width={32}
              height={32}
            />
          </div>
        </button>
      </div>
    </>
  );
};

export default ShareEvent;
