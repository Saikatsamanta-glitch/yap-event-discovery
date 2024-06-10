import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import cx from 'classnames';
import { Icons } from '.';

const Overlay = ({
  className,
  title,
  open,
  onClose,
  trigger,
  children,
  dataQaSelector,
  showCloseIcon,
  showHeader = true,
}) => {
  const contentClassNames = cx({
    'y-overlay': true,
    [className]: Boolean(className),
  });

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className="y-overlay__backdrop" />
        <Dialog.Content
          className={contentClassNames}
          data-qa-selector={`${dataQaSelector}_whole_overlay`}
        >
          <div className="y-overlay__content">
            {showHeader ? (
              <div className="y-overlay__header">
                <Dialog.Title
                  className="y-overlay__header--title"
                  data-qa-selector={`${dataQaSelector}_overlay_title`}
                >
                  {title}
                </Dialog.Title>
                {showCloseIcon && (
                  <Dialog.Close asChild>
                    <button
                      className="y-overlay__header--close-icon"
                      aria-label="Close"
                      data-qa-selector={`${dataQaSelector}_overlay_close_button`}
                    >
                      <Icons.CloseIcon />
                    </button>
                  </Dialog.Close>
                )}
              </div>
            ) : null}
            <div className="y-overlay__body">{children}</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Overlay;
