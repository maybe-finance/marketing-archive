import React, { useState } from "react";
import { Button, ButtonVariant } from "../../../components/button";
import { Modal, CloseButton } from "../../../components/modal";

export interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  onSubmit,
}: SubscriptionModalProps): JSX.Element {
  const [email, setEmail] = useState("");

  function closeModal() {
    onClose();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(email);
    closeModal();
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="inline-block w-full max-w-xl p-6 sm:p-10 my-8 overflow-hidden text-left align-middle shadow-xl transition-all transform bg-gray-900 rounded-2xl">
        <div className="flex justify-between mb-4 space-x-4">
          <h2 className="text-lg font-display font-semibold leading-none xs:text-2xl">
            Get notified when this tool is released
          </h2>
          <CloseButton onClick={closeModal} />
        </div>

        <p className="mb-6 text-gray-300">
          Enter your email and we’ll let you know once we release this tool and
          others like it.
        </p>
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col sm:flex-row items-stretch justify-between w-full p-1 rounded-xl bg-black focus-within:ring focus-within:ring-teal"
        >
          <input
            autoFocus
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="flex-grow px-4 py-2 mb-1 bg-transparent border-0 appearance-none focus:ring-0 focus:outline-none sm:mb-0"
          />
          <div>
            <Button
              type="submit"
              variant={ButtonVariant.Teal}
              disabled={email.trim().length === 0}
            >
              Join waitlist
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
