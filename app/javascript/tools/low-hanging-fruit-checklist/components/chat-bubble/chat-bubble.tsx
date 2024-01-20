import React from "react";

export type ChatBubbleProps = {
  label: string;
  sender?: "us" | "them";
};

export default function ChatBubble({
  label,
  sender = "us",
}: ChatBubbleProps): JSX.Element {
  return (
    <p
      className={`bg-gray-800 rounded-3xl p-4 xs:p-6 tracking-wide ${
        sender === "us" ? "rounded-tl-md" : "rounded-tr-md"
      }`}
    >
      {label}
    </p>
  );
}
