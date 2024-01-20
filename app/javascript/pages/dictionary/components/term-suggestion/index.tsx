import React from "react";
import { useModal } from "../../../../hooks";
import Form from "./form";
import Modal from "./modal";
import useForm from "./useForm";

export default function TermSuggestion(): JSX.Element {
  const modal = useModal();
  const form = useForm({ onSubmit: modal.openModal });

  const handleCloseModal = () => {
    modal.closeModal();
    form.resetForm();
  };

  const handleSubmitAnother = () => {
    modal.closeModal();
    form.resetForm(false);
  };

  return (
    <>
      <Form form={form} />
      <Modal
        isOpen={modal.isOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitAnother}
      />
    </>
  );
}
