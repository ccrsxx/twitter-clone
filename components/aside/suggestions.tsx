import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loading } from '@components/ui/loading';
import { variants } from './aside-trends';
import { SuggestionCard } from './suggestion-card';
import type { SuggestionCardProps } from './suggestion-card';

const placeholderProfiles: Readonly<SuggestionCardProps[]> = [
  {
    name: 'Emilia',
    username: 'emilia',
    verified: true,
    photoURL: '/placeholder/emilia.jpg'
  },
  {
    name: 'Nanami Touko',
    username: 'nanamitouko',
    verified: false,
    photoURL: '/placeholder/nanami-touko.jpg'
  },
  {
    name: 'Koito Yuu',
    username: 'koitoyuu',
    verified: false,
    photoURL: '/placeholder/koito-yuu.jpg'
  }
];

export function Suggestions(): JSX.Element {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className='hover-animation rounded-2xl bg-main-sidebar-background'>
      {loading ? (
        <Loading className='flex h-52 items-center justify-center p-4' />
      ) : (
        <motion.div className='inner:px-4 inner:py-3' {...variants}>
          <h2 className='text-xl font-bold'>Who to follow</h2>
          {placeholderProfiles.map((profile) => (
            <SuggestionCard {...profile} key={profile.username} />
          ))}
          <Link href='/people'>
            <a
              className='custom-button smooth-tab hover-card block w-full rounded-2xl
                         rounded-t-none text-center text-main-accent'
            >
              Show more
            </a>
          </Link>
        </motion.div>
      )}
    </section>
  );
}
