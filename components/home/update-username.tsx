/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { checkUsernameAvailability, updateUsername } from '@lib/firebase/utils';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { isValidUsername } from '@lib/validation';
import { Modal } from '@components/modal/modal';
import { UsernameModal } from '@components/modal/username-modal';
import { InputField } from '@components/input/input-field';
import type { FormEvent, ChangeEvent } from 'react';

export function UpdateUsername(): JSX.Element {
  const [available, setAvailable] = useState(false);
  const [visited, setVisited] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useAuth();
  const { open, openModal, closeModal } = useModal();

  useEffect(() => {
    const checkAvailability = async (value: string): Promise<void> => {
      const empty = await checkUsernameAvailability(value);

      if (empty) setAvailable(true);
      else {
        setAvailable(false);
        setErrorMessage('Username is already taken');
      }
    };

    if (!visited && inputValue.length > 0) setVisited(true);

    if (visited) {
      if (errorMessage) setErrorMessage('');

      const error = isValidUsername(user?.username as string, inputValue);

      if (error) {
        setAvailable(false);
        setErrorMessage(error);
      } else void checkAvailability(inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    if (!user?.updatedAt) openModal();
  }, []);

  const changeUsername = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!available) return;

    await updateUsername(user?.id as string, inputValue);

    closeModal();

    toast.success('Username updated successfully');
  };

  const cancelUpdateUsername = (): void => {
    closeModal();
    void updateUsername(user?.id as string);
  };

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
    setInputValue(value);

  return (
    <Modal
      modalClassName='flex flex-col gap-6 max-w-xl bg-main-background w-full p-8 rounded-2xl h-[576px]'
      open={open}
      closeModal={cancelUpdateUsername}
    >
      <UsernameModal
        available={available}
        changeUsername={changeUsername}
        cancelUpdateUsername={cancelUpdateUsername}
      >
        <InputField
          label='Username'
          inputId='username'
          inputValue={inputValue}
          errorMessage={errorMessage}
          handleChange={handleChange}
        />
      </UsernameModal>
    </Modal>
  );
}
