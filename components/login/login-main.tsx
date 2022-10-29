import { useAuth } from '@lib/context/auth-context';
import { NextImage } from '@components/ui/next-image';
import { CustomIcon } from '@components/ui/custom-icon';
import { Button } from '@components/ui/button';

export function LoginMain(): JSX.Element {
  const { signInWithGoogle } = useAuth();

  return (
    <main className='grid grid-cols-[1fr,45vw]'>
      <div className='relative flex items-center justify-center'>
        <NextImage
          imgClassName='object-cover'
          blurClassName='bg-accent-blue'
          src='/assets/twitter-banner.png'
          alt='Twitter banner'
          layout='fill'
          useSkeleton
        />
        <i className='absolute'>
          <CustomIcon className='h-96 w-96 text-white' iconName='TwitterIcon' />
        </i>
      </div>
      <div className='flex flex-col justify-center gap-6 p-8'>
        <div className='flex flex-col gap-16 font-twitter-chirp-extended'>
          <i>
            <CustomIcon
              className='h-12 w-12 text-accent-blue dark:text-twitter-icon'
              iconName='TwitterIcon'
            />
          </i>
          <h1 className='text-6xl'>Happening now</h1>
          <h2 className='text-3xl'>Join Twitter today.</h2>
        </div>
        <div className='flex max-w-xs flex-col gap-6 [&_button]:py-2'>
          <div className='grid gap-3 font-bold'>
            <Button
              className='flex justify-center gap-2 border border-light-line-reply font-bold text-light-primary
                         hover:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-none dark:bg-white dark:hover:brightness-90
                         dark:active:brightness-75'
              onClick={signInWithGoogle}
            >
              <CustomIcon iconName='GoogleIcon' /> Sign up with Google
            </Button>
            <Button
              className='flex cursor-not-allowed justify-center gap-2 border border-light-line-reply font-bold
                         text-light-primary hover:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-none dark:bg-white
                         dark:hover:brightness-90 dark:active:brightness-75'
            >
              <CustomIcon iconName='AppleIcon' /> Sign up with Apple
            </Button>
            <div className='grid w-full grid-cols-[1fr,auto,1fr] items-center gap-2'>
              <i className='border-b border-light-border dark:border-dark-border' />
              <p>or</p>
              <i className='border-b border-light-border dark:border-dark-border' />
            </div>
            <Button className='cursor-not-allowed bg-main-accent text-white hover:brightness-90 active:brightness-75'>
              Sign up with phone or email
            </Button>
            <p
              className='inner:custom-underline inner:custom-underline text-center text-xs
                     text-light-secondary inner:text-main-accent dark:text-dark-secondary'
            >
              By signing up, you agree to the{' '}
              <a
                href='https://twitter.com/tos'
                target='_blank'
                rel='noreferrer'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='https://twitter.com/privacy'
                target='_blank'
                rel='noreferrer'
              >
                Privacy Policy
              </a>
              , including{' '}
              <a
                href='https://help.twitter.com/rules-and-policies/twitter-cookies'
                target='_blank'
                rel='noreferrer'
              >
                Cookie Use
              </a>
              .
            </p>
          </div>
          <div className='flex flex-col gap-3'>
            <p className='font-bold'>Already have an account? </p>
            <Button
              className='border border-light-line-reply font-bold text-main-accent 
                         hover:bg-main-accent/10 active:bg-main-accent/20 dark:border-light-secondary'
              onClick={signInWithGoogle}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
