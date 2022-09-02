import Link from 'next/link';
import NextImage from '@components/ui/next-image';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';

const placeholderProfiles = [
  {
    name: 'Emilia',
    username: 'emilia',
    image: '/placeholder/emilia.jpg',
    verified: true
  },
  {
    name: 'Nanami Touko',
    username: 'nanamitouko',
    image: '/placeholder/nanami_touko.jpg',
    verified: false
  },
  {
    name: 'Koito Yuu',
    username: 'koitoyuu',
    image: '/placeholder/koito_yuu.jpg',
    verified: false
  }
];

export function Suggestion(): JSX.Element {
  return (
    <section className='rounded-2xl bg-sidebar-background inner:px-4 inner:py-3'>
      <h2 className='text-xl font-bold'>Who to follow</h2>
      {placeholderProfiles.map(({ name, username, image, verified }) => (
        <Link href={`/${username}`} key={username}>
          <a className='smooth-tab flex items-center justify-between hover:bg-sidebar-hover-color'>
            <div className='flex items-center gap-3'>
              <NextImage
                className='transition duration-200 hover:brightness-90'
                imgClassName='rounded-full'
                width={48}
                height={48}
                src={image}
                alt={name}
              />
              <div className='leading-5'>
                <div className='flex items-center gap-1'>
                  <p className='custom-underline font-bold'>{name}</p>
                  {verified && (
                    <i>
                      <HeroIcon iconName='CheckBadgeIcon' solid />
                    </i>
                  )}
                </div>
                <p className='text-secondary'>@{username}</p>
              </div>
            </div>
            <Button
              className='bg-follow-button-background px-4 py-1 font-bold text-follow-text-color
                         transition duration-200 hover:brightness-90'
            >
              Follow
            </Button>
          </a>
        </Link>
      ))}
      <Button
        className='w-full rounded-2xl rounded-t-none text-center text-accent-blue-secondary 
                   hover:bg-sidebar-hover-color'
      >
        Show more
      </Button>
    </section>
  );
}
