import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { preventBubbling } from '@lib/event';
import { NextImage } from '@components/ui/next-image';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { Loading } from '@components/ui/loading';
import { variant } from './trends';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className='rounded-2xl bg-sidebar-background'>
      {loading ? (
        <Loading className='flex h-52 items-center justify-center p-4' />
      ) : (
        <motion.div className='inner:px-4 inner:py-3' {...variant}>
          <h2 className='text-xl font-bold'>Who to follow</h2>
          {placeholderProfiles.map(({ name, username, image, verified }) => (
            <Link href={`/${username}`} key={username}>
              <a className='smooth-tab flex items-center justify-between hover:bg-white/[0.03]'>
                <div className='flex items-center gap-3'>
                  <NextImage
                    className='transition duration-200 hover:brightness-90'
                    imgClassName='rounded-full object-cover'
                    width={48}
                    height={48}
                    src={image}
                    alt={name}
                    useSkeleton
                  />
                  <div className='leading-5'>
                    <div className='flex items-center gap-1'>
                      <p className='custom-underline font-bold'>{name}</p>
                      {verified && (
                        <i>
                          <HeroIcon
                            className='h-5 w-5'
                            iconName='CheckBadgeIcon'
                            solid
                          />
                        </i>
                      )}
                    </div>
                    <p className='text-secondary'>@{username}</p>
                  </div>
                </div>
                <Button
                  className='bg-follow-button-background px-4 py-1 font-bold text-follow-text-color
                               transition duration-200 hover:brightness-90'
                  onClick={preventBubbling(null, true)}
                >
                  Follow
                </Button>
              </a>
            </Link>
          ))}
          <Link href='/people'>
            <a
              className='custom-button smooth-tab block w-full rounded-2xl rounded-t-none
                         text-center text-accent-blue-secondary hover:bg-white/[0.03]'
            >
              Show more
            </a>
          </Link>
        </motion.div>
      )}
    </section>
  );
}
