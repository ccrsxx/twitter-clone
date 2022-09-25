import { useAuth } from '@lib/context/auth-context';
import { Button } from '@components/ui/button';
import { CustomIcon } from '@components/ui/custom-icon';

export function LoginControls(): JSX.Element {
  const { signInWithGoogle } = useAuth();

  return (
    <div className='flex max-w-xs flex-col gap-6 [&_button]:py-2'>
      <div className='grid gap-3 font-bold'>
        <Button
          className='flex justify-center gap-2 bg-white text-follow-text-color 
                     hover:brightness-90 active:brightness-75'
        >
          <CustomIcon iconName='GoogleIcon' /> Sign up with Google
        </Button>
        <Button
          className='flex justify-center gap-2 bg-white text-follow-text-color
                     hover:brightness-90 active:brightness-75'
        >
          <CustomIcon iconName='AppleIcon' /> Sign up with Apple
        </Button>
        <div className='grid w-full grid-cols-[1fr,auto,1fr] items-center gap-2'>
          <i className='border-b border-border-color' />
          <p>or</p>
          <i className='border-b border-border-color' />
        </div>
        <Button
          className='bg-accent-blue text-white
                     hover:brightness-90 active:brightness-75'
        >
          Sign up with phone or email
        </Button>
        <p
          className='inner:custom-underline inner:custom-underline text-center text-xs
                     text-secondary inner:text-accent-blue'
        >
          By signing up, you agree to the{' '}
          <a href='https://twitter.com/tos' target='_blank' rel='noreferrer'>
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
          className='border border-border-color-secondary font-bold text-accent-blue
                     hover:bg-accent-blue/10 active:bg-accent-blue/20'
          onClick={signInWithGoogle}
        >
          Sign in
        </Button>
        <span className='text-center font-bold text-red-400'>
          (dev) use button ⬆️ for now!
        </span>
      </div>
    </div>
  );
}
