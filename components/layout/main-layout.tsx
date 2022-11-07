import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';
import { fetchJSON } from '@lib/fetch';
import { Sidebar } from '@components/sidebar/sidebar';
import type { DefaultToastOptions } from 'react-hot-toast';
import type { LayoutProps } from './common-layout';

const toastOptions: DefaultToastOptions = {
  style: {
    backgroundColor: 'rgb(var(--main-accent))',
    borderRadius: '4px',
    color: 'white'
  },
  success: { duration: 4000 }
};

export function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <div className='flex w-full justify-center gap-0 lg:gap-4'>
      <Sidebar />
      <SWRConfig value={{ fetcher: fetchJSON }}>{children}</SWRConfig>
      <Toaster position='bottom-center' toastOptions={toastOptions} />
    </div>
  );
}
