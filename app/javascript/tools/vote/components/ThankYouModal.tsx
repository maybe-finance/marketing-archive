import React from "react";
import { Button, ButtonVariant } from "../../../components/button";
import { Modal } from "../../../components/modal";

export interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ThankYouModal({
  isOpen,
  onClose,
  onSubmit,
}: ThankYouModalProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="inline-block w-full max-w-xl p-6 sm:p-10 my-8 overflow-hidden text-left align-middle shadow-xl transition-all transform bg-gray-900 rounded-2xl">
        <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center bg-teal bg-opacity-10 ri-check-line text-teal ri-2x mb-6" />

        <h2 className="text-lg font-display font-black leading-none xs:text-2xl mb-4 text-center">
          Thank you!
        </h2>

        <p className="mb-8 text-gray-300 text-center">
          Your tool idea was successfully submitted, feel free to vote on the
          existing tool suggestions or submit another idea.
        </p>

        <div className="flex flex-col sm:flex-row-reverse space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
          <Button variant={ButtonVariant.Teal} onClick={onSubmit}>
            Submit another
          </Button>
          <Button variant={ButtonVariant.Gray} onClick={onClose}>
            Go Back
          </Button>
        </div>
      </div>
    </Modal>
  );
}
