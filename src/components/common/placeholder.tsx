import Image from 'next/image';
import { SEO } from './seo';

export function Placeholder(): JSX.Element {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <SEO
        title='Fofoca-me'
        description='Desde os nossos memes aos debates políticos, tudo você encontra aqui.'
        image='/home.jpg'
      />
      <i>
        <Image
          src={'/logo512.png'}
          alt='Logo da Fofoca-me'
          width={144}
          height={144}
        />
      </i>
    </main>
  );
}
