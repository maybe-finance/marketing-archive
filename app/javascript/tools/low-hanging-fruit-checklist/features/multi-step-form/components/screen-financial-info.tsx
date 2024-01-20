import React from "react";

import { Interpreter } from "xstate";
import { useService } from "@xstate/react";

import Button from "../../../components/button/button";
import ChatBubble from "../../../components/chat-bubble/chat-bubble";
import ChatScreen from "../../../components/chat-screen/chat-screen";
import FormGroup from "../../../components/form-group/form-group";
import FormInputMoney from "../../../components/form-input-money/form-input-money";

import {
  MultiStepFormContext,
  MultiStepFormEventType,
  MultiStepFormMachineEvent,
  MultiStepFormSchema,
} from "../machines/multi-step-form";
import { FinancialInfo } from "../../../models/financial-info";
import { useState } from "react";

type MultiStepFormScreenFinancialInfoProps = {
  service: Interpreter<
    MultiStepFormContext,
    MultiStepFormSchema,
    MultiStepFormMachineEvent
  >;
};

export default function MultiStepFormScreenFinancialInfo({
  service,
}: MultiStepFormScreenFinancialInfoProps): JSX.Element {
  const [state, send] = useService(service);

  const [financialInfo, setFinancialInfo] = useState<FinancialInfo>(
    state.context.financialInfo
  );

  const submit = () => {
    send({
      type: MultiStepFormEventType.CONFIRM_FINANCIAL_INFO,
      financialInfo,
    });
  };
  return (
    <ChatScreen>
      <ChatBubble label="Alright! Now, how do your financials look?" />

      <form className="space-y-4">
        <FormGroup for="income" label="Monthly income">
          <FormInputMoney
            id="income"
            value={financialInfo.income}
            onChange={(income) =>
              setFinancialInfo({ ...financialInfo, income })
            }
          />
        </FormGroup>

        <FormGroup for="expenses" label="Monthly expenses (incl. debt)">
          <FormInputMoney
            id="expenses"
            value={financialInfo.expenses}
            onChange={(expenses) =>
              setFinancialInfo({ ...financialInfo, expenses })
            }
          />
        </FormGroup>

        <FormGroup for="debt" label="Monthly debt payments">
          <FormInputMoney
            id="debt"
            value={financialInfo.debt}
            onChange={(debt) => setFinancialInfo({ ...financialInfo, debt })}
          />
        </FormGroup>

        <Button
          label="That's all about the money, money, money"
          onClick={() => submit()}
        />
      </form>
    </ChatScreen>
  );
}
