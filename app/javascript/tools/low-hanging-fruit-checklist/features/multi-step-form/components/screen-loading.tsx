import React, { useEffect } from "react";

import { Interpreter } from "xstate";
import { useService } from "@xstate/react";

import {
  MultiStepFormContext,
  MultiStepFormEventType,
  MultiStepFormMachineEvent,
  MultiStepFormSchema,
} from "../machines/multi-step-form";

import ChatBubble from "../../../components/chat-bubble/chat-bubble";
import ChatScreen from "../../../components/chat-screen/chat-screen";

type MultiStepFormScreenLoadingProps = {
  service: Interpreter<
    MultiStepFormContext,
    MultiStepFormSchema,
    MultiStepFormMachineEvent
  >;
};

export default function MultiStepFormScreenLoading({
  service,
}: MultiStepFormScreenLoadingProps): JSX.Element {
  const [, send] = useService(service);

  useEffect(() => {
    const timer: number = window.setTimeout(() => {
      send(MultiStepFormEventType.NEXT);
    }, 2000);

    return () => clearTimeout(timer);
  });

  return (
    <ChatScreen>
      <ChatBubble label="One moment while we're working our magic" />
    </ChatScreen>
  );
}
