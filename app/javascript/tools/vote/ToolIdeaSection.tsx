import React from "react";
import { useModal } from "../../hooks";
import ToolIdeaForm from "./components/ToolIdeaForm";
import ThankYouModal from "./components/ThankYouModal";
import Lines from "./components/Lines";
import useToolIdeaForm from "./useToolIdeaForm";

export default function ToolIdeaSection(): JSX.Element {
  const thankYouModal = useModal();
  const form = useToolIdeaForm({ onSubmit: thankYouModal.openModal });

  const handleCloseModal = () => {
    thankYouModal.closeModal();
    form.resetForm();
  };

  const handleSubmitAnother = () => {
    thankYouModal.closeModal();
    form.resetForm(false);
  };

  return (
    <>
      <div className="relative px-4">
        <Lines.Purple />
        <ToolIdeaForm form={form} />
        <Lines.Yellow />
      </div>
      <ThankYouModal
        isOpen={thankYouModal.isOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitAnother}
      />
    </>
  );
}
