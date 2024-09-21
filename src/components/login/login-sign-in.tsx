import { useState } from 'react';
import { useAuth } from '@lib/context/auth-context';
import { Button } from '@components/ui/button';
import { CustomIcon } from '@components/ui/custom-icon';

type TLoginSingIn = {
  isModalOpen: boolean;
  onCloseModal: (value: boolean) => void;
  title?: string;
  googleProviderTitle?: string;
};

export function LoginSingIn({
  isModalOpen,
  onCloseModal,
  title,
  googleProviderTitle
}: TLoginSingIn): JSX.Element {
  const { signInManual, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void signInManual(email, password);
    // onCloseModal(false);
    // setPassword('');
    // setEmail('');
  };

  return isModalOpen ? (
    <div
      className='fixed top-0 left-0 right-0 bottom-0 z-[1000] flex items-center justify-center bg-[#0000007f] p-4'
      onClick={(): void => onCloseModal(false)}
    >
      <div
        className='relative flex flex-col items-center justify-center rounded-lg bg-light-primary py-4 px-12'
        onClick={(e): void => e.stopPropagation()}
      >
        <div className='flex max-w-[364px] flex-col gap-4'>
          <i className='mb-0 flex justify-center self-center lg:mb-10 lg:self-auto'>
            <CustomIcon
              className='mt-4 h-6 w-6 text-accent-blue lg:h-12 lg:w-12 dark:lg:text-twitter-icon'
              iconName='TwitterIcon'
            />
          </i>

          <h2 className='font-twitter-chirp-extended text-3xl'>{title}</h2>

          <div className='grid gap-3 font-bold'>
            <Button
              className='flex justify-center gap-2 border border-light-line-reply font-bold text-light-primary transition
                         hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-0 dark:bg-white
                         dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
              onClick={signInWithGoogle}
            >
              <CustomIcon iconName='GoogleIcon' /> {googleProviderTitle} with
              Google
            </Button>

            <Button
              className='flex cursor-not-allowed justify-center gap-2 border border-light-line-reply font-bold text-light-primary
                         transition hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-0
                         dark:bg-white dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
            >
              <CustomIcon iconName='AppleIcon' /> {googleProviderTitle} with
              Apple
            </Button>

            <div className='flex items-center justify-center'>
              <hr className='mr-3 mt-1 w-full border-gray-500/20' />
              <span>or</span>
              <hr className='ml-3 mt-1 w-full border-gray-500/20' />
            </div>
          </div>

          <form onSubmit={handleSignIn} className='flex flex-col gap-2'>
            <input
              className='rounded-md border border-gray-500/20 bg-transparent p-4'
              type='email'
              value={email}
              onChange={(e): void => setEmail(e.target.value)}
              placeholder='Email'
              required
            />

            <div className='relative flex w-full items-center justify-between'>
              <input
                className='w-full rounded-md border border-gray-500/20 bg-transparent p-4'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e): void => setPassword(e.target.value)}
                placeholder='Password'
                required
              />

              {showPassword ? (
                <div
                  className='absolute right-4'
                  onClick={(): void => setShowPassword(false)}
                >
                  <CustomIcon
                    iconName='EyeOff'
                    className='h-4 w-auto cursor-pointer'
                  />
                </div>
              ) : (
                <div
                  className='absolute right-4'
                  onClick={(): void => setShowPassword(true)}
                >
                  <CustomIcon
                    iconName='EyeOn'
                    className='h-4 w-auto cursor-pointer'
                  />
                </div>
              )}
            </div>

            <Button
              type='submit'
              className='border border-light-line-reply bg-accent-blue font-bold text-[#FFF] hover:bg-accent-blue/10
                         focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80 active:bg-accent-blue/20
                         dark:border-light-secondary'
            >
              Sign in
            </Button>
          </form>

          <button onClick={(): void => onCloseModal(false)}>Close</button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
