import { useRouter } from 'next/router';
import Head from 'next/head';

type MainLayoutProps = {
  title?: string;
  image?: string;
  product?: boolean;
  className?: string;
  description?: string;
};

// ! This is a site placeholder, replace with your own url
const siteUrl = 'https://twitter-clone-ccrsxx.vercel.app';

export function SEO({
  title,
  image,
  description
}: MainLayoutProps): JSX.Element {
  const { asPath } = useRouter();

  const siteTitle = title;
  const siteDescription = description;
  const siteImage = image;

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name='og:title' content={siteTitle} />
      <meta name='description' content={siteDescription} />
      <meta name='og:description' content={siteDescription} />
      <meta property='og:image' content={siteImage} />
      <meta
        name='og:url'
        content={`${siteUrl}${asPath === '/' ? '' : asPath}`}
      />
    </Head>
  );
}
