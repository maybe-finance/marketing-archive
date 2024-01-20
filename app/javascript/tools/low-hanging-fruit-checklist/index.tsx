import React from "react";

import MultiStepForm from "./features/multi-step-form/multi-step-form";
import { ErrorBoundary } from "../../components/ErrorBoundary";

export default function Home(): JSX.Element {
  return (
    <div className="px-4 pb-24 overflow-hidden text-white bg-black">
      <header className="max-w-sm mx-auto my-12 space-y-4 text-center">
        <h1 className="text-2xl font-black leading-tight text-white font-display">
          Financial Low&#8209;Hanging Fruit Checklist
        </h1>
        <small className="block text-sm text-gray-100">by Maybe Labs</small>
      </header>

      <main className="max-w-xl mx-auto">
        <ErrorBoundary>
          <MultiStepForm />
        </ErrorBoundary>
      </main>
    </div>
  );
}
