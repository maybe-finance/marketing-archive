import React, { useEffect, useState } from "react";

import { Interpreter } from "xstate";
import { useService } from "@xstate/react";

import type { TipType } from "../../../features/multi-step-form/content/tips";

import Button from "../../../components/button/button";
import ChatBubble from "../../../components/chat-bubble/chat-bubble";
import ChatScreen from "../../../components/chat-screen/chat-screen";
import IconCard, { IconName } from "../../../components/icon-card/icon-card";
import EarlyAccessFooter from "../../../components/early-access-footer/early-access-footer";

import {
  MultiStepFormContext,
  MultiStepFormEventType,
  MultiStepFormMachineEvent,
  MultiStepFormSchema,
} from "../machines/multi-step-form";

type MultiStepFormScreenResultsProps = {
  service: Interpreter<
    MultiStepFormContext,
    MultiStepFormSchema,
    MultiStepFormMachineEvent
  >;
};

export default function MultiStepFormScreenResults({
  service,
}: MultiStepFormScreenResultsProps): JSX.Element {
  const [state, send] = useService(service);
  const [hasCopied, setHasCopied] = useState(false);

  const tipTypeIconNameMap: Record<TipType, IconName> = {
    credit: "credit",
    debt: "debt",
    education: "education",
    estate: "estate",
    insurance: "insurance",
    medical: "medical",
    retirement: "retirement",
    savings: "savings",
    "social-security": "social-security",
  };

  const relevantTips = state.context.relevantTips.map((tip) => {
    const title =
      typeof tip.title === "function" ? tip.title(state.context) : tip.title;
    const description =
      typeof tip.description === "function"
        ? tip.description(state.context)
        : tip.description;
    const icon: IconName = tipTypeIconNameMap[tip.type];

    return { key: tip.id, title, description, icon };
  });

  const querystring = btoa(
    relevantTips
      .map(({ key }) => key)
      .sort((a, b) => a.localeCompare(b))
      .join(",")
  );

  const url = new URL(window.location.href);
  url.searchParams.set("r", querystring);

  useEffect(() => {
    if (window.location.href !== url.toString()) {
      window.history.pushState(
        { querystring: querystring },
        "",
        url.toString()
      );
    }
  }, [querystring]);

  const copyLink = () => {
    navigator.clipboard.writeText(url.toString());

    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <ChatScreen>
      <ChatBubble label="Based on your answers, we'd suggest the following:" />
      <div className="sm:my-8">
        <div className="mb-4 space-y-4 sm:mb-8">
          {relevantTips.map(({ key, ...iconCardProps }) => {
            return <IconCard {...iconCardProps} key={key} />;
          })}
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <Button
              label="Restart"
              onClick={() => send(MultiStepFormEventType.RESTART)}
            />
          </div>
          {typeof navigator !== "undefined" && navigator.clipboard && (
            <div className="flex-1">
              <Button
                label={hasCopied ? "Copied to clipboard" : "Copy link"}
                onClick={() => copyLink()}
              />
            </div>
          )}
        </div>
      </div>
      <div className="my-8">
        <EarlyAccessFooter />
      </div>
    </ChatScreen>
  );
}
