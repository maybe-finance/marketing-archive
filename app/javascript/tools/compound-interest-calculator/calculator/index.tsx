import React, { useState } from "react";
import Result from "./result";
import Form from "./form";
import config from "./config";
import type { Form as FormType } from "./types";

export default function Calculator(): JSX.Element {
  const [form, setForm] = useState<FormType>(config.INITIAL_FORM_VALUES);

  const handleFormSubmit = (form: FormType) => {
    setForm(form);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 p-4 sm:p-12 bg-gray-900 rounded-2xl z-10 relative">
      <Form onSubmit={handleFormSubmit} form={form} />
      <Result form={form} />
    </div>
  );
}
