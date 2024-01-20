import React, { useEffect } from "react";

import { useMachine } from "@xstate/react";

import MultiStepFormMachine, {
  MultiStepFormEventType,
  MultiStepFormState,
} from "./machines/multi-step-form";

import ChatAvatar from "../../components/chat-avatar/chat-avatar";

import ScreenInitial from "./components/screen-initial";
import ScreenResults from "./components/screen-results";
import ScreenPersonalInfo from "./components/screen-personal-info";
import ScreenFinancialInfo from "./components/screen-financial-info";
import ScreenConfirm from "./components/screen-confirm";
import ScreenLoading from "./components/screen-loading";
import FeedbackWidget from "../../../../components/feedback-widget/FeedbackWidget";

export default function MultiStepForm(): JSX.Element | null {
  const [state, send, service] = useMachine(MultiStepFormMachine);

  useEffect(() => {
    const listener = () => {
      const querystring = new URL(window.location.href).searchParams.get("r");

      if (!querystring) {
        send(MultiStepFormEventType.RESTART);
      } else {
        send(MultiStepFormEventType.LOAD_RESULTS_FROM_QUERYSTRING);
      }
    };

    window.addEventListener("popstate", listener);

    return () => window.removeEventListener("popstate", listener);
  });

  return (
    <>
      <div className="mb-4">
        <ChatAvatar />
      </div>
      {state.matches(MultiStepFormState.INTRO) ? (
        <ScreenInitial service={service} />
      ) : state.matches(MultiStepFormState.PERSONAL_INFO) ? (
        <ScreenPersonalInfo service={service} />
      ) : state.matches(MultiStepFormState.FINANCIAL_INFO) ? (
        <ScreenFinancialInfo service={service} />
      ) : state.matches(MultiStepFormState.CONFIRM) ? (
        <ScreenConfirm service={service} />
      ) : state.matches(MultiStepFormState.PROCESSING) ? (
        <ScreenLoading service={service} />
      ) : state.matches(MultiStepFormState.RESULTS) ? (
        <>
          <ScreenResults service={service} />
          <FeedbackWidget></FeedbackWidget>
        </>
      ) : null}
    </>
  );
}
