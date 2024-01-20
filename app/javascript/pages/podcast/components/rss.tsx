import React from "react";
import classNames from "classnames";

import CopyLink from "../../../components/copy-link/CopyLink";
import { ButtonVariant } from "../../../components/button/Button";

type RSSProps = {
  iconOnly?: boolean;
  variant?: "default" | "left";
};

export default function RSS({
  iconOnly = false,
  variant = "default",
}: RSSProps): JSX.Element {
  const containerClassName = classNames(
    variant === "default" && "flex flex-col justify-center items-center",
    variant === "left" && "flex flex-col justify-start items-start"
  );

  return (
    <div className={containerClassName}>
      <p className="text-gray-500 text-base mb-4">Or subscribe via RSS feed</p>

      <CopyLink
        icon="ri-rss-line text-gray-700"
        buttonVariant={ButtonVariant.Red}
        iconOnly={iconOnly}
      >
        https://feeds.transistor.fm/ask-maybe
      </CopyLink>
    </div>
  );
}
