import { CustomIcon } from '@components/ui/custom-icon';
import { Loading } from '@components/ui/loading';

export function Placeholder(): JSX.Element {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-8'>
      <i>
        <CustomIcon
          className='h-20 w-20 text-icon-color'
          iconName='TwitterIcon'
        />
      </i>
      <div className='flex items-center gap-1'>
        <Loading className='p-0' />
        <p className='text-lg font-bold'>Verifying session...</p>
      </div>
    </main>
  );
}
