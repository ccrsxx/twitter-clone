import { useRouter } from 'next/router';
import Head from 'next/head';
import { siteURL } from '@lib/env';

type MainLayoutProps = {
  title: string;
  image?: string;
  description?: string;
};

export function SEO({
  title,
  image,
  description
}: MainLayoutProps): JSX.Element {
  const { asPath } = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name='og:title' content={title} />
      {description && <meta name='description' content={description} />}
      {description && <meta name='og:description' content={description} />}
      {image && <meta property='og:image' content={image} />}
      <meta
        name='og:url'
        content={`${siteURL}${asPath === '/' ? '' : asPath}`}
      />
    </Head>
  );
}
