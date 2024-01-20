import React from "react";
import classNames from "classnames";
import Tippy, { TippyProps } from "@tippyjs/react/headless";

export enum TooltipVariant {
  Black,
  Gray,
}

const TooltipVariantClassNames = Object.freeze({
  [TooltipVariant.Black]: "border-gray-900 bg-black text-gray-300",
  [TooltipVariant.Gray]: "border-black bg-gray-900 text-white",
});

let isLeftMouseButtonDown = false;

const refreshLeftButtonState = function (e: MouseEvent) {
  isLeftMouseButtonDown = e.buttons === 1;
};

document.body.onmousedown = refreshLeftButtonState;
document.body.onmousemove = refreshLeftButtonState;
document.body.onmouseup = refreshLeftButtonState;

export interface TooltipProps extends TippyProps {
  children: React.ReactElement;
  content?: React.ReactNode;
  variant?: TooltipVariant;
  showOnClick?: boolean;
  className?: string;
}

export default function Tooltip({
  children,
  content,
  variant = TooltipVariant.Black,
  showOnClick = false,
  disabled,
  visible,
  className,
  ...rest
}: TooltipProps): JSX.Element {
  return (
    <Tippy
      render={(attrs) => (
        <div
          className={classNames(
            "px-2 py-1 border rounded-md text-sm",
            TooltipVariantClassNames[variant],
            className
          )}
          tabIndex={-1}
          {...attrs}
        >
          {content}
        </div>
      )}
      offset={[0, 0]}
      disabled={disabled ?? content === undefined}
      visible={visible}
      trigger={
        visible === undefined
          ? `mouseenter focus${showOnClick ? " click" : ""}`
          : undefined
      }
      hideOnClick={visible === undefined ? false : undefined}
      touch={showOnClick ? true : ["hold", 100]}
      onShow={() => (isLeftMouseButtonDown ? false : undefined)}
      {...rest}
    >
      {children}
    </Tippy>
  );
}
