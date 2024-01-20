import React from "react";
import classNames from "classnames";

export interface ToolHeaderProps {
  title: React.ReactNode;
  description: React.ReactNode;
  gradientClassName?: string;
}

export default function ToolHeader({
  title,
  description,
  gradientClassName,
}: ToolHeaderProps): JSX.Element {
  return (
    <header className="mx-auto max-w-7xl pt-2 text-center">
      <div
        className={classNames(
          "mx-auto mb-5 w-18 h-18 rounded-full bg-gradient-to-br",
          gradientClassName
        )}
      />
      <h1 className="font-display font-extrabold text-2xl md:text-4xl leading-heading">
        {title}
      </h1>
      <small className="mx-auto mt-5 block max-w-md text-base md:text-lg text-gray-300">
        {description}
      </small>
    </header>
  );
}
