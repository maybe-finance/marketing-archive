import React from "react";

import { Interpreter } from "xstate";
import { useService } from "@xstate/react";

import {
  MultiStepFormContext,
  MultiStepFormEventType,
  MultiStepFormMachineEvent,
  MultiStepFormSchema,
} from "../machines/multi-step-form";

import Button from "../../../components/button/button";
import ChatBubble from "../../../components/chat-bubble/chat-bubble";
import ChatScreen from "../../../components/chat-screen/chat-screen";

type MultiStepFormScreenInitialProps = {
  service: Interpreter<
    MultiStepFormContext,
    MultiStepFormSchema,
    MultiStepFormMachineEvent
  >;
};

export default function MultiStepFormScreenInitial({
  service,
}: MultiStepFormScreenInitialProps): JSX.Element {
  const [, send] = useService(service);

  return (
    <ChatScreen>
      <ChatBubble label="Hey! Are you interested in a few simple tips to improve your financial health?" />
      <ChatBubble label="Just a heads up, right now we only support giving tips to folks in the United States. More countries are coming soon, though!" />
      <Button
        label="Yes, let's do it!"
        onClick={() => send(MultiStepFormEventType.NEXT)}
      />
    </ChatScreen>
  );
}
