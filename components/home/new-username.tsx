/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { checkUsernameAvailability, updateUsername } from '@lib/firebase/utils';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { UsernameModal } from '@components/modal/username-modal';
import type { FormEvent, ChangeEvent } from 'react';

export function NewUsername(): null | JSX.Element {
  const { user } = useAuth();

  const [available, setAvailable] = useState(false);
  const [visited, setVisited] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { open, openModal, closeModal } = useModal();

  useEffect(() => {
    const checkValidity = (value: string): string | null => {
      if (value.length < 4) return 'Username must be at least 4 characters';
      if (value.length > 15) return 'Username must be less than 15 characters';
      if (!/^\w+$/i.test(value))
        return 'Username can only contain letters, numbers and _';
      if (!/[a-z]/i.test(value))
        return 'Username must include at least one letter';
      if (value === user?.username) return 'This is your current username';

      return null;
    };

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

      const error = checkValidity(inputValue);

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
    await updateUsername(user?.uid as string, inputValue);
    closeModal();
  };

  const cancelUpdateUsername = (): void => {
    closeModal();
    void updateUsername(user?.uid as string);
  };

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setInputValue(value);

  return (
    <Modal
      modalClassName='flex flex-col gap-6 max-w-xl bg-black w-full p-8 rounded-2xl h-[576px]'
      open={open}
      closeModal={cancelUpdateUsername}
    >
      <UsernameModal
        available={available}
        inputValue={inputValue}
        errorMessage={errorMessage}
        handleChange={handleChange}
        changeUsername={changeUsername}
        cancelUpdateUsername={cancelUpdateUsername}
      />
    </Modal>
  );
}
