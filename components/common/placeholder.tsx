import { CustomIcon } from '@components/ui/custom-icon';
import { Loading } from '@components/ui/loading';
import { SEO } from './seo';

export function Placeholder(): JSX.Element {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-8'>
      <SEO
        title='Twitter'
        description='Twitter is the best place to see what’s happening in the world. Follow your interests to get unfiltered news, live updates, and the latest trends.'
        image='/home.png'
      />
      <i>
        <CustomIcon
          className='h-20 w-20 text-icon-color'
          iconName='TwitterIcon'
        />
      </i>
      <div className='flex items-center gap-2'>
        <Loading className='!p-0' />
        <p className='text-lg font-bold'>Verifying session...</p>
      </div>
    </main>
  );
}
