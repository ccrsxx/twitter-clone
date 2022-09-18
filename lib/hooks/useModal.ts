import { useState } from 'react';

type Modal = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export function useModal(): Modal {
  const [open, setOpen] = useState(false);

  const openModal = (): void => setOpen(true);
  const closeModal = (): void => setOpen(false);

  return { open, openModal, closeModal };
}
