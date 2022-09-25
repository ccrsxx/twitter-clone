import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loading } from '@components/ui/loading';
import { variants } from './aside-trends';
import { SuggestionCard } from './suggestion-card';

const placeholderProfiles = [
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
    photoURL: '/placeholder/nanami_touko.jpg'
  },
  {
    name: 'Koito Yuu',
    username: 'koitoyuu',
    verified: false,
    photoURL: '/placeholder/koito_yuu.jpg'
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
        <motion.div className='inner:px-4 inner:py-3' {...variants}>
          <h2 className='text-xl font-bold'>Who to follow</h2>
          {placeholderProfiles.map((profile) => (
            <SuggestionCard {...profile} key={profile.username} />
          ))}
          <Link href='/people'>
            <a
              className='custom-button smooth-tab block w-full rounded-2xl rounded-t-none
                         text-center text-accent-blue hover:bg-white/[0.03]'
            >
              Show more
            </a>
          </Link>
        </motion.div>
      )}
    </section>
  );
}
