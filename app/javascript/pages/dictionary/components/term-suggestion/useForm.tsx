import { useState } from "react";
import api from "./api";
import type { Form as FormType } from "./types";

export interface useFormProps {
  onSubmit: () => void;
}

export default function useForm({ onSubmit }: useFormProps): FormType {
  const [email, setEmail] = useState("");
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");

  const resetForm = (resetEmail = true) => {
    resetEmail && setEmail("");
    setTerm("");
    setDefinition("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.submitTermSuggestion({ email, term, definition });
    onSubmit();
  };

  return {
    email,
    term,
    definition,
    onEmailChange: setEmail,
    onTermChange: setTerm,
    onDefinitionChange: setDefinition,
    onSubmit: handleSubmit,
    resetForm,
  };
}
