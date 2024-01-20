import React from "react";
import { RadioGroup } from "@headlessui/react";

import { Button, ButtonVariant } from "../../../../components/button";
import type { Form as FormType } from "./types";
import { categories } from "./config";

export interface FormProps {
  form: FormType;
}

export default function Form({ form }: FormProps): JSX.Element {
  return (
    <div
      className="max-w-2xl mx-auto pt-20 text-center relative z-10 px-4"
      id="idea"
    >
      <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-yellow bg-opacity-10 ri-treasure-map-line text-yellow ri-2x" />
      <h2 className="font-display mt-10 font-extrabold text-2xl md:text-4xl leading-heading">
        Influence our roadmap
      </h2>
      <small className="mt-4 block text-base md:text-lg text-gray-100">
        Have an idea, integration suggesiton, or see something that can be
        improved? Let us know below! You can also email us at{" "}
        <a className="text-teal font-medium" href="mailto:hello@maybe.co">
          hello@maybe.co
        </a>
      </small>

      <form
        className="text-left mx-auto max-w-lg space-y-6 mt-8"
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
          <label className="block text-white mb-3" htmlFor="name">
            What’s your suggestion around?{" "}
            <small className="text-gray-100 text-base">(Pick one)</small>
          </label>

          <RadioGroup value={form.category} onChange={form.onCategoryChange}>
            {categories.map(({ icon, label, value }) => (
              <RadioGroup.Option
                value={value}
                key={value}
                className={({ checked, active }) => `
                    px-3 py-2 rounded-lg outline-none border-none mr-3 mb-3 inline-block cursor-pointer text-sm
                    ${checked ? "bg-gray-700" : "bg-gray-900"}
                    ${
                      active
                        ? "focus:border-red focus:ring-red focus:ring-2"
                        : ""
                    }
                  `}
              >
                <small className="mr-2">{icon}</small> {label}
              </RadioGroup.Option>
            ))}
          </RadioGroup>

          <textarea
            required
            className="bg-gray-900 outline-none border-none focus:border-red focus:ring-red focus:ring-2 w-full h-32 p-4 mt-2 resize-none rounded-xl placeholder-gray focus-visible"
            id="description"
            spellCheck="false"
            placeholder="Describe your suggestion or idea here"
            value={form.description}
            onChange={(event) => form.onDescriptionChange(event.target.value)}
          />
        </div>

        <Button type="submit" variant={ButtonVariant.Red}>
          Submit
        </Button>
      </form>
    </div>
  );
}
