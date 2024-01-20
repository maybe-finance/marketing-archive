import React from "react";
import classNames from "classnames";
import { VoteableTool } from "../types";
import gradients from "../../../util/gradients";
import CardIcon from "./CardIcon";

export interface CardProps {
  tool: VoteableTool;
}

export default function Card({ tool }: CardProps): JSX.Element {
  const gradientClassName = gradients.getStableGradient(tool.id);
  const buttonClassName = tool.voted
    ? "border-teal text-teal bg-teal bg-opacity-5"
    : "border-black";

  return (
    <div className="flex space-x-4 sm:space-x-8 p-4 sm:p-6 text-white bg-gray-900 rounded-2xl items-center sm:items-start">
      <div className="flex-grow flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <div>
          <div
            className={classNames(
              "w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br",
              gradientClassName
            )}
          />
        </div>
        <div className="flex-grow ">
          <h2 className="text-base font-medium mb-1">{tool.name}</h2>
          <p className="opacity-60 text-sm mb-4">{tool.description}</p>

          <div className="flex items-center opacity-40 text-xs space-x-2">
            <span>{tool.topic}</span>
            {!!tool.subTopic && <span>·</span>}
            <span>{tool.subTopic}</span>
          </div>
        </div>
      </div>
      <button className="bg-black rounded-md" onClick={tool.vote}>
        <div
          className={`transition-all items-center rounded-md font-medium w-16 h-20 flex flex-col justify-center border-2 ${buttonClassName}`}
        >
          <CardIcon active={tool.voted} />
          <div className="text-xl text-white">{tool.votes}</div>
        </div>
      </button>
    </div>
  );
}
