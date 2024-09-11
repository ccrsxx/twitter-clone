import { useRouter } from 'next/router';
import Head from 'next/head';
import { siteURL } from '@lib/env';

type MainLayoutProps = {
  title: string;
  description?: string;
  color?: string;
};

export function SEO({
  title,
  description,
  color
}: MainLayoutProps): JSX.Element {
  const { asPath } = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name='og:title' content={title} />
      {description && <meta name='description' content={description} />}
      {description && <meta name='og:description' content={description} />}
      <meta
        name='og:url'
        content={`${siteURL}${asPath === '/' ? '' : asPath}`}
      />
      <meta name='theme-color' content={color ?? '#1da1f2'} />
    </Head>
  );
}
