import React from "react";

export interface CloseButtonProps {
  onClick: () => void;
}

export default function CloseButton({
  onClick,
}: CloseButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className="h-6 w-6 max-w-8 max-h-8 outline-none"
      onClick={onClick}
    >
      <i className="ri-close-line ri-lg text-gray-100 leading-4" />
    </button>
  );
}
