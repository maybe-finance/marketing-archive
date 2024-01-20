import { useState } from "react";
import api from "./api";

export type ToolIdeaFormType = {
  email: string;
  onEmailChange: (email: string) => void;
  name: string;
  onNameChange: (name: string) => void;
  description: string;
  onDescriptionChange: (description: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetForm: (resetEmail?: boolean) => void;
};

export interface useToolIdeaFormProps {
  onSubmit: () => void;
}

export default function useToolIdeaForm({
  onSubmit,
}: useToolIdeaFormProps): ToolIdeaFormType {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = (resetEmail = true) => {
    resetEmail && setEmail("");
    setName("");
    setDescription("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.submitToolIdea({ email, name, description });
    onSubmit();
  };

  return {
    email,
    name,
    description,
    onEmailChange: setEmail,
    onNameChange: setName,
    onDescriptionChange: setDescription,
    onSubmit: handleSubmit,
    resetForm,
  };
}
