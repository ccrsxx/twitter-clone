import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';
import { fetchJSON } from '@lib/fetch';
import { WindowContextProvider, useWindow } from '@lib/context/window-context';
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

const IndexedLayout = (): JSX.Element => {
  const { isMobile } = useWindow();

  if (!isMobile) return <Sidebar />;

  return <></>;
};

export function MainLayoutWithoutSidebar({
  children
}: LayoutProps): JSX.Element {
  return (
    <div className='flex w-full justify-center gap-0 bg-gray-100 dark:bg-main-background lg:gap-4'>
      <WindowContextProvider>
        <IndexedLayout />
        <SWRConfig value={{ fetcher: fetchJSON }}>{children}</SWRConfig>
      </WindowContextProvider>
      <Toaster
        position='bottom-center'
        toastOptions={toastOptions}
        containerClassName='mb-12 xs:mb-0'
      />
    </div>
  );
}
