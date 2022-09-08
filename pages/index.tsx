import cn from 'clsx';
import { Button } from '@components/ui/button';
import { CustomIcon } from '@components/ui/custom-icon';
import { NextImage } from '@components/ui/next-image';
import { Footer } from '@components/login/footer';

export default function Login(): JSX.Element {
  return (
    <div className='grid min-h-screen grid-rows-[1fr,auto]'>
      <main className='grid grid-cols-[1fr,45vw]'>
        <div className='relative grid place-items-center'>
          <NextImage
            imgClassName='object-cover'
            src='/assets/twitter-banner.png'
            alt='Twitter banner'
            layout='fill'
            useSkeleton
          />
          <i className='absolute'>
            <CustomIcon
              className='h-96 w-96 text-white'
              iconName='TwitterIcon'
            />
          </i>
        </div>
        <div className='grid content-center gap-6 p-8'>
          <div className='grid gap-16 font-twitter-chirp-extended'>
            <i>
              <CustomIcon className='h-12 w-12' iconName='TwitterIcon' />
            </i>
            <h1 className='text-6xl'>Happening now</h1>
            <h2 className='text-3xl'>Join Twitter today.</h2>
          </div>
          <div className='grid max-w-xs gap-6 [&_button]:py-2'>
            <div className='grid gap-3 font-bold'>
              <Button
                className='flex justify-center gap-2 bg-white text-login-button-color 
                           hover:brightness-90 active:brightness-75'
              >
                <CustomIcon iconName='GoogleIcon' /> Sign up with Google
              </Button>
              <Button
                className='flex justify-center gap-2 bg-white text-login-button-color
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
                className='bg-accent-blue-secondary text-white
                           hover:brightness-90 active:brightness-75'
              >
                Sign up with phone or email
              </Button>
              <p className='text-center text-xs text-secondary'>
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </p>
            </div>
            <div className='grid gap-3'>
              <p className='font-bold'>Already have an account?</p>
              <Button className='border border-border-color-secondary'>
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
