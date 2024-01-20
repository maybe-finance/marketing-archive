import { useState } from "react";

import { useModal } from "../../hooks";
import api from "./api";

type useSubscriptionModalProps = {
  onSubmit: () => void;
};

export default function useSubscriptionModal({
  onSubmit,
}: useSubscriptionModalProps): {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  submit: (email: string) => void;
} {
  const modal = useModal();
  const [wasOpened, setWasOpened] = useState(false);

  const openModal = () => {
    if (wasOpened) return;

    modal.openModal();
    setWasOpened(true);
  };

  const submit = (email: string) => {
    api.subscribeToWaitlist(email);
    modal.closeModal();
    setTimeout(onSubmit, 300);
  };

  return {
    ...modal,
    openModal,
    submit,
  };
}
