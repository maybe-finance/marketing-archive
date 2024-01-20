import React from "react";
import classNames from "classnames";

type CardProps = {
  children?: React.ReactNode;
  scale?: boolean;
  className?: string;
  paddingClassName?: string;
};

export default function Card({
  children,
  scale = false,
  className = "",
  paddingClassName = "p-6 sm:p-8 md:p-10",
}: CardProps): JSX.Element {
  return (
    <div
      className={classNames(
        "bg-gray-900 rounded-2xl",
        scale && "transform-gpu transition-transform hover:scale-105",
        paddingClassName,
        className
      )}
    >
      {children}
    </div>
  );
}
