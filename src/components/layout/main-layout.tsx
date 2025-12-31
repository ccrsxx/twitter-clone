import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';
import { fetchJSON } from '@lib/fetch';
import { WindowContextProvider } from '@lib/context/window-context';
import { Sidebar } from '@components/sidebar/sidebar';
import type { DefaultToastOptions } from 'react-hot-toast';
import type { LayoutProps } from './common-layout';

const toastOptions: DefaultToastOptions = {
  style: {
    color: 'white',
    borderRadius: '4px',
    backgroundColor: 'rgb(var(--main-accent))'
  },
  success: { duration: 4000 }
};

export function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <div className='flex w-full justify-center gap-0 lg:gap-4'>
      <WindowContextProvider>
        <Sidebar />
        <SWRConfig value={{ fetcher: fetchJSON }}>
          <div className='flex-grow max-w-2xl'>
            <div className='sticky top-0 z-10 bg-main-background/60 backdrop-blur-md'>
              <div className='flex items-center p-4'>
                <input
                  type='text'
                  placeholder='Search Twitter'
                  className='w-full rounded-full bg-light-secondary px-4 py-2 text-light-primary
                             dark:bg-dark-secondary dark:text-dark-primary'
                />
              </div>
            </div>
            {children}
          </div>
        </SWRConfig>
      </WindowContextProvider>
      <Toaster
        position='bottom-center'
        toastOptions={toastOptions}
        containerClassName='mb-12 xs:mb-0'
      />
    </div>
  );
}
