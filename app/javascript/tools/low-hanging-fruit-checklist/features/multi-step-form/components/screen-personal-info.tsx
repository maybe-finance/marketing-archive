import React, { useState } from "react";

import { useService } from "@xstate/react";
import { Interpreter } from "xstate";

import Button from "../../../components/button/button";
import ChatBubble from "../../../components/chat-bubble/chat-bubble";
import ChatScreen from "../../../components/chat-screen/chat-screen";
import FormGroup from "../../../components/form-group/form-group";
import FormInputNumber from "../../../components/form-input-number/form-input-number";
import FormInputSelect, {
  FormInputSelectOption,
} from "../../../components/form-input-select/form-input-select";

import MaritalStatuses, { MaritalStatus } from "../../../models/marital-status";
import { PersonalInfo } from "../../../models/personal-info";

import {
  MultiStepFormContext,
  MultiStepFormEventType,
  MultiStepFormMachineEvent,
  MultiStepFormSchema,
} from "../machines/multi-step-form";

type MultiStepFormScreenPersonalInfoProps = {
  service: Interpreter<
    MultiStepFormContext,
    MultiStepFormSchema,
    MultiStepFormMachineEvent
  >;
};

export default function MultiStepFormScreenPersonalInfo({
  service,
}: MultiStepFormScreenPersonalInfoProps): JSX.Element {
  const [state, send] = useService(service);

  const maritalStatusOptions: FormInputSelectOption<MaritalStatus>[] =
    Object.entries(MaritalStatuses).map(([key, label]) => ({
      value: key as MaritalStatus,
      label,
    }));

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(
    state.context.personalInfo
  );

  const submit = () => {
    send({
      type: MultiStepFormEventType.CONFIRM_PERSONAL_INFO,
      personalInfo,
    });
  };

  return (
    <ChatScreen>
      <ChatBubble label="Awesome! We just need a few bits of information to get your personalized tips." />

      <form className="space-y-4">
        <FormGroup for="age" label="Your age">
          <FormInputNumber
            id="age"
            value={personalInfo.age}
            min={13}
            max={122}
            append="years old"
            onChange={(age) => setPersonalInfo({ ...personalInfo, age })}
          />
        </FormGroup>

        <FormGroup for="marital-status" label="Marital status">
          <FormInputSelect
            id="marital-status"
            value={personalInfo.maritalStatus}
            options={maritalStatusOptions}
            onChange={(maritalStatus) =>
              setPersonalInfo({ ...personalInfo, maritalStatus })
            }
          />
        </FormGroup>

        <FormGroup for="dependents" label="Dependents">
          <FormInputNumber
            id="dependents"
            value={personalInfo.dependents}
            min={0}
            append={(value) => (value === 1 ? "dependent" : "dependents")}
            onChange={(dependents) =>
              setPersonalInfo({ ...personalInfo, dependents })
            }
          />
        </FormGroup>

        <Button label="That's me!" onClick={() => submit()} />
      </form>
    </ChatScreen>
  );
}
