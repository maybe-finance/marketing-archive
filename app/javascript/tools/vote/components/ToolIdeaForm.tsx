import React from "react";

import { Button, ButtonVariant } from "../../../components/button";
import type { ToolIdeaFormType } from "../useToolIdeaForm";

export interface ToolIdeaFormProps {
  form: ToolIdeaFormType;
}

export default function ToolIdeaForm({ form }: ToolIdeaFormProps): JSX.Element {
  return (
    <div
      className="max-w-2xl mx-auto pt-20 text-center relative z-10"
      id="idea"
    >
      <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-yellow bg-opacity-10 ri-lightbulb-line text-yellow ri-2x" />
      <h2 className="font-display mt-10 font-extrabold text-2xl md:text-3xl leading-heading">
        Got an idea for a tool?
      </h2>
      <small className="mt-4 block text-base md:text-lg text-gray-100">
        If you have an idea for a tool let us know below. We’ll review it and
        post it above for the community to vote on. If we end up building your
        idea we’ll give you a shout out in our newsletter!
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
            What are you calling the tool?
          </label>
          <input
            required
            placeholder="Enter a name"
            className="bg-gray-900 outline-none border-none focus:border-red focus:ring-red focus:ring-2 w-full h-14 px-4 rounded-xl placeholder-gray"
            id="name"
            value={form.name}
            onChange={(event) => form.onNameChange(event.target.value)}
          />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="description">
            What would it do?
          </label>
          <textarea
            required
            className="bg-gray-900 outline-none border-none focus:border-red focus:ring-red focus:ring-2 w-full h-32 p-4 resize-none rounded-xl placeholder-gray focus-visible"
            id="description"
            spellCheck="false"
            placeholder="Describe what the tool would do"
            value={form.description}
            onChange={(event) => form.onDescriptionChange(event.target.value)}
          />
        </div>

        <Button type="submit" variant={ButtonVariant.Red}>
          Submit tool idea
        </Button>
      </form>
    </div>
  );
}
