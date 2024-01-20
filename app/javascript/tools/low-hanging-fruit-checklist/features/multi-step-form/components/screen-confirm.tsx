import React from "react";

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
import { Interpreter } from "xstate";

type MultiStepFormScreenConfirmProps = {
  service: Interpreter<
    MultiStepFormContext,
    MultiStepFormSchema,
    MultiStepFormMachineEvent
  >;
};

export default function MultiStepFormScreenConfirm({
  service,
}: MultiStepFormScreenConfirmProps): JSX.Element {
  const [, send] = useService(service);

  return (
    <ChatScreen>
      <ChatBubble label="Perfect—looks like thats all we need." />
      <Button
        label="Show me my tips!"
        onClick={() => send(MultiStepFormEventType.NEXT)}
      />
    </ChatScreen>
  );
}
