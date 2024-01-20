import { useState } from "react";

import api from "./api";
import { Category, Form } from "./types";

export interface useFormProps {
  onSubmit: () => void;
}

export default function useForm({ onSubmit }: useFormProps): Form {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(Category.IMPROVEMENT);
  const [description, setDescription] = useState("");

  const resetForm = (resetEmail = true) => {
    resetEmail && setEmail("");
    setCategory(Category.IMPROVEMENT);
    setDescription("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.submitRoadmapIdea({ email, category, description });
    onSubmit();
  };

  return {
    email,
    category,
    description,
    onEmailChange: setEmail,
    onCategoryChange: setCategory,
    onDescriptionChange: setDescription,
    onSubmit: handleSubmit,
    resetForm,
  };
}
