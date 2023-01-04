/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { checkUsernameAvailability, updateUsername } from '@lib/firebase/utils';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { isValidUsername } from '@lib/validation';
import { sleep } from '@lib/utils';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { Modal } from '@components/modal/modal';
import { UsernameModal } from '@components/modal/username-modal';
import { InputField } from '@components/input/input-field';
import type { FormEvent, ChangeEvent } from 'react';

export function UpdateUsername(): JSX.Element {
  const [alreadySet, setAlreadySet] = useState(false);
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
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
        setErrorMessage('This username has been taken. Please choose another.');
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
    else setAlreadySet(true);
  }, []);

  const changeUsername = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!available) return;

    setLoading(true);

    await sleep(500);

    await updateUsername(user?.id as string, inputValue);

    closeModal();

    setLoading(false);

    setInputValue('');
    setVisited(false);
    setAvailable(false);

    toast.success('Username updated successfully');
  };

  const cancelUpdateUsername = (): void => {
    closeModal();
    if (!alreadySet) void updateUsername(user?.id as string);
  };

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
    setInputValue(value);

  return (
    <>
      <Modal
        modalClassName='flex flex-col gap-6 max-w-xl bg-main-background w-full p-8 rounded-2xl h-[576px]'
        open={open}
        closeModal={cancelUpdateUsername}
      >
        <UsernameModal
          loading={loading}
          available={available}
          alreadySet={alreadySet}
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
      <Button
        className='dark-bg-tab group relative p-2 hover:bg-light-primary/10
                   active:bg-light-primary/20 dark:hover:bg-dark-primary/10 
                   dark:active:bg-dark-primary/20'
        onClick={openModal}
      >
        <HeroIcon className='h-5 w-5' iconName='SparklesIcon' />
        <ToolTip tip='Top tweets' />
      </Button>
    </>
  );
}
