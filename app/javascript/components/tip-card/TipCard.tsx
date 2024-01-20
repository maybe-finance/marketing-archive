import React from "react";
import classNames from "classnames";

export interface TipCardProps {
  title: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactElement;
  className?: string;
}

export default function TipCard({
  title,
  icon,
  children,
  className,
}: TipCardProps): JSX.Element {
  return (
    <div
      className={classNames("flex flex-col", className)}
      data-testid="tip-card"
    >
      <div className="flex-grow p-5 rounded-lg bg-gray-900">
        <div className="flex items-center gap-x-4">
          {icon && (
            <div className="self-start flex-shrink-0 w-9 h-9">
              {React.cloneElement(icon, {
                className: classNames(
                  "flex items-center justify-center w-full h-full rounded-md bg-opacity-10",
                  icon.props.className
                ),
                size: icon.props.size ?? 20,
              })}
            </div>
          )}
          <h2 className="font-semibold">{title}</h2>
        </div>
        <p className="mt-4 text-gray-200 text-sm">{children}</p>
      </div>
    </div>
  );
}
