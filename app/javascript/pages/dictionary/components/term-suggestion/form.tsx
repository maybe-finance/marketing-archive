import React from "react";

import { Button, ButtonVariant } from "../../../../components/button";
import type { Form as FormType } from "./types";

export interface FormProps {
  form: FormType;
}

export default function Form({ form }: FormProps): JSX.Element {
  return (
    <div
      className="max-w-xl mx-auto pt-20 text-center relative z-10"
      id="term-suggestion"
    >
      <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-yellow bg-opacity-10 ri-book-mark-line text-yellow ri-2x" />
      <h2 className="font-display mt-10 font-extrabold text-2xl md:text-3xl leading-heading">
        Not seeing a term?
      </h2>
      <small className="mt-4 block text-base md:text-lg text-gray-100">
        Know a term that we’re missing in this dictionary? Let us know below!
        You can also email us at{" "}
        <a
          href="mailto:hello@maybe.co"
          className="font-medium underline text-teal"
        >
          hello@maybe.co
        </a>
      </small>

      <form
        className="text-left mx-auto max-w-xl space-y-6 mt-8"
        onSubmit={form.onSubmit}
      >
        <div>
          <label className="block text-white mb-2" htmlFor="email">
            Email address
          </label>
          <input
            required
            placeholder="Enter your email"
            className="bg-gray-900 outline-none border-none focus:border-red focus:ring-red focus:ring-2 w-full h-14 px-4 rounded-xl placeholder-gray"
            type="email"
            id="email"
            value={form.email}
            onChange={(event) => form.onEmailChange(event.target.value)}
          />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="name">
            What’s the term?
          </label>
          <input
            required
            placeholder="Enter the term here"
            className="bg-gray-900 outline-none border-none focus:border-red focus:ring-red focus:ring-2 w-full h-14 px-4 rounded-xl placeholder-gray"
            id="term"
            value={form.term}
            onChange={(event) => form.onTermChange(event.target.value)}
          />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="definition">
            How would you define it in your own words?{" "}
            <small className="text-gray-100 text-base">(Optional)</small>
          </label>
          <textarea
            className="bg-gray-900 outline-none border-none focus:border-red focus:ring-red focus:ring-2 w-full h-32 p-4 resize-none rounded-xl placeholder-gray focus-visible"
            id="definition"
            spellCheck="false"
            placeholder="Define the term here"
            value={form.definition}
            onChange={(event) => form.onDefinitionChange(event.target.value)}
          />
        </div>

        <Button type="submit" variant={ButtonVariant.Red}>
          Submit
        </Button>
      </form>
    </div>
  );
}
