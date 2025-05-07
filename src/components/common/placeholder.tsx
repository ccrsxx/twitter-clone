import { CustomIcon } from '@components/ui/custom-icon';
import { SEO } from './seo';

export function Placeholder(): JSX.Element {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <SEO
        title='VOX'
        description='From breaking news and entertainment to sports and politics, get the full story with all the live commentary.'
        image='/rio-de-janeiro-at-night-pictures-wallpaper-wallpaper-preview.jpg'
      />
      <i>
        <CustomIcon
          className='h-20 w-20 text-[#253f50]'
          iconName='SpinnerIcon'
        />
      </i>
    </main>
  );
}
