import { createMachine, assign } from "xstate";

import type { PersonalInfo } from "../../../models/personal-info";
import type { FinancialInfo } from "../../../models/financial-info";
import tips, { Tip } from "../content/tips";

export interface MultiStepFormContext {
  personalInfo: PersonalInfo;
  financialInfo: FinancialInfo;
  relevantTips: Tip[];
}

export enum MultiStepFormState {
  INITIAL = "INITIAL",
  INTRO = "INTRO",
  PERSONAL_INFO = "PERSONAL_INFO",
  FINANCIAL_INFO = "FINANCIAL_INFO",
  CONFIRM = "CONFIRM",
  PROCESSING = "PROCESSING",
  RESULTS = "RESULTS",
}

export enum MultiStepFormEventType {
  NEXT = "NEXT",
  CONFIRM_PERSONAL_INFO = "CONFIRM_PERSONAL_INFO",
  CONFIRM_FINANCIAL_INFO = "CONFIRM_FINANCIAL_INFO",
  RESTART = "RESTART",
  LOAD_RESULTS_FROM_QUERYSTRING = "LOAD_RESULTS_FROM_QUERYSTRING",
}

export type MultiStepFormMachineEvent =
  | { type: MultiStepFormEventType.NEXT }
  | {
      type: MultiStepFormEventType.CONFIRM_PERSONAL_INFO;
      personalInfo: PersonalInfo;
    }
  | {
      type: MultiStepFormEventType.CONFIRM_FINANCIAL_INFO;
      financialInfo: FinancialInfo;
    }
  | { type: MultiStepFormEventType.RESTART }
  | { type: MultiStepFormEventType.LOAD_RESULTS_FROM_QUERYSTRING };

export interface MultiStepFormSchema {
  states: {
    [MultiStepFormState.INITIAL]: Record<string, unknown>;
    [MultiStepFormState.INTRO]: Record<string, unknown>;
    [MultiStepFormState.PERSONAL_INFO]: Record<string, unknown>;
    [MultiStepFormState.FINANCIAL_INFO]: Record<string, unknown>;
    [MultiStepFormState.CONFIRM]: Record<string, unknown>;
    [MultiStepFormState.PROCESSING]: Record<string, unknown>;
    [MultiStepFormState.RESULTS]: Record<string, unknown>;
  };
}

const initialContext: MultiStepFormContext = {
  personalInfo: {
    age: 27,
    maritalStatus: "married",
    dependents: 0,
  },
  financialInfo: {
    income: 10000,
    expenses: 3550,
    debt: 1100,
  },
  relevantTips: [] as Tip[],
};

const multiStepFormMachine = createMachine<
  MultiStepFormContext,
  MultiStepFormMachineEvent
>(
  {
    id: "multi-step-form",
    context: initialContext,
    initial: MultiStepFormState.INITIAL,
    states: {
      [MultiStepFormState.INITIAL]: {
        always: [
          {
            target: MultiStepFormState.RESULTS,
            actions: ["loadResultsFromQuerystring"],
            cond: () => {
              if (typeof window === "undefined") {
                return false;
              }

              const querystring = new URL(
                window.location.href
              ).searchParams.get("r");

              if (!querystring) {
                return false;
              }

              try {
                return !!atob(querystring);
              } catch (e) {
                return false;
              }
            },
          },
          {
            target: MultiStepFormState.INTRO,
          },
        ],
      },
      [MultiStepFormState.INTRO]: {
        on: {
          [MultiStepFormEventType.NEXT]: MultiStepFormState.PERSONAL_INFO,
          [MultiStepFormEventType.LOAD_RESULTS_FROM_QUERYSTRING]: {
            target: MultiStepFormState.RESULTS,
            actions: ["loadResultsFromQuerystring"],
          },
        },
      },
      [MultiStepFormState.PERSONAL_INFO]: {
        on: {
          [MultiStepFormEventType.CONFIRM_PERSONAL_INFO]: {
            target: [MultiStepFormState.FINANCIAL_INFO],
            actions: ["assignPersonalInfoToContext"],
          },
          [MultiStepFormEventType.RESTART]: {
            target: MultiStepFormState.INTRO,
            actions: ["resetContext"],
          },
          [MultiStepFormEventType.LOAD_RESULTS_FROM_QUERYSTRING]: {
            target: MultiStepFormState.RESULTS,
            actions: ["loadResultsFromQuerystring"],
          },
        },
      },
      [MultiStepFormState.FINANCIAL_INFO]: {
        on: {
          [MultiStepFormEventType.CONFIRM_FINANCIAL_INFO]: {
            target: MultiStepFormState.CONFIRM,
            actions: ["assignFinancialInfoToContext"],
          },
          [MultiStepFormEventType.RESTART]: {
            target: MultiStepFormState.INTRO,
            actions: ["resetContext"],
          },
          [MultiStepFormEventType.LOAD_RESULTS_FROM_QUERYSTRING]: {
            target: MultiStepFormState.RESULTS,
            actions: ["loadResultsFromQuerystring"],
          },
        },
      },
      [MultiStepFormState.CONFIRM]: {
        on: {
          [MultiStepFormEventType.NEXT]: {
            target: MultiStepFormState.PROCESSING,
            actions: ["assignRelevantTips"],
          },
          [MultiStepFormEventType.RESTART]: {
            target: MultiStepFormState.INTRO,
            actions: ["resetContext"],
          },
          [MultiStepFormEventType.LOAD_RESULTS_FROM_QUERYSTRING]: {
            target: MultiStepFormState.RESULTS,
            actions: ["loadResultsFromQuerystring"],
          },
        },
      },
      [MultiStepFormState.PROCESSING]: {
        on: {
          [MultiStepFormEventType.NEXT]: [MultiStepFormState.RESULTS],
          [MultiStepFormEventType.RESTART]: {
            target: MultiStepFormState.INTRO,
            actions: ["resetContext"],
          },
          [MultiStepFormEventType.LOAD_RESULTS_FROM_QUERYSTRING]: {
            target: MultiStepFormState.RESULTS,
            actions: ["loadResultsFromQuerystring"],
          },
        },
      },
      [MultiStepFormState.RESULTS]: {
        on: {
          [MultiStepFormEventType.RESTART]: {
            target: MultiStepFormState.INTRO,
            actions: ["resetContext"],
          },
          [MultiStepFormEventType.LOAD_RESULTS_FROM_QUERYSTRING]: {
            target: MultiStepFormState.RESULTS,
            actions: ["loadResultsFromQuerystring"],
          },
        },
      },
    },
  },
  {
    actions: {
      // eslint-disable-next-line
      loadResultsFromQuerystring: assign((context, event) => {
        const querystring = new URL(window.location.href).searchParams.get("r");

        if (!querystring) {
          return { relevantTips: [] as Tip[] };
        }

        const tipsFromQuerystring = atob(querystring).split(",");

        return {
          relevantTips: tips.filter(({ id }) =>
            tipsFromQuerystring.some(
              (idFromQuerystring) => id === idFromQuerystring
            )
          ) as Tip[],
        };
      }),
      assignPersonalInfoToContext: assign((context, event) => {
        if (event.type !== MultiStepFormEventType.CONFIRM_PERSONAL_INFO) {
          return {};
        }

        return { personalInfo: event.personalInfo };
      }),
      assignFinancialInfoToContext: assign((context, event) => {
        if (event.type !== MultiStepFormEventType.CONFIRM_FINANCIAL_INFO) {
          return {};
        }

        return { financialInfo: event.financialInfo };
      }),
      assignRelevantTips: assign((context) => {
        return {
          relevantTips: tips.filter(({ isRelevant }) => isRelevant(context)),
        };
      }),
      resetContext: assign(() => {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );

        return initialContext;
      }),
    },
  }
);

export default multiStepFormMachine;
