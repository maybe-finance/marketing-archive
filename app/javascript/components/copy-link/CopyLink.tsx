import React, { useState } from "react";
import { Button, ButtonVariant } from "../button";

export interface CopyLinkProps extends React.HTMLProps<HTMLButtonElement> {
  children: string;
  icon?: string;
  buttonVariant?: ButtonVariant;
  iconOnly?: boolean;
}

export default function CopyLink({
  children,
  icon,
  buttonVariant = ButtonVariant.Teal,
  iconOnly = false,
}: CopyLinkProps): JSX.Element {
  const [hasCopied, setHasCopied] = useState(false);

  const showCopyButton = !!navigator?.clipboard;

  const copyLink = () => {
    navigator.clipboard.writeText(children);

    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  const renderLabel = (hasCopied: boolean): JSX.Element => {
    if (hasCopied) {
      return <span>Copied</span>;
    }

    return <span>Copy link</span>;
  };

  const renderIcon = (hasCopied: boolean): JSX.Element => {
    if (hasCopied) {
      return <i className="ri-check-line ri-lg" />;
    }

    return <i className="ri-file-copy-line ri-lg" />;
  };

  return (
    <div className="inline-form-input-wrapper items-center">
      <div className="flex-grow px-4 py-2 mb-1 bg-transparent border-0 appearance-none sm:mb-0">
        <div className="flex items-center space-x-2.5">
          {!!icon && <i className={icon} />}
          <span>{children}</span>
        </div>
      </div>
      {showCopyButton && (
        <div className="w-full sm:w-auto">
          <Button
            variant={buttonVariant}
            className={`flex items-center justify-center space-x-2 ${
              hasCopied && !iconOnly ? "px-6" : ""
            }`}
            onClick={copyLink}
          >
            {!iconOnly && renderLabel(hasCopied)}
            {renderIcon(hasCopied)}
          </Button>
        </div>
      )}
    </div>
  );
}
