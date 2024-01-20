import React from "react";
import { Button, ButtonVariant } from "../../../components/button";
import CopyLink from "../../../components/copy-link/CopyLink";
import { Modal } from "../../../components/modal";

export interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({
  isOpen,
  onClose,
}: WaitlistModalProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="inline-block w-full max-w-xl p-6 sm:p-10 my-8 overflow-hidden text-left align-middle shadow-xl transition-all transform bg-gray-900 rounded-2xl">
        <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center bg-teal bg-opacity-10 ri-check-line text-teal ri-2x mb-6" />

        <h2 className="text-lg font-display font-black leading-none xs:text-2xl mb-4 text-center">
          You’re on the waitlist!
        </h2>

        <p className="mb-4 text-gray-300 text-center">
          We’ve added your email address to the waitlist. In the meantime why
          not share this page to get more votes for your tool of choice?
        </p>
        <div className="mb-6">
          <CopyLink>maybe.co/vote</CopyLink>
        </div>

        <div className="flex justify-center">
          <div>
            <Button variant={ButtonVariant.Gray} onClick={onClose}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
