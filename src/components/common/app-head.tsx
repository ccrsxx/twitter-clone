import Head from 'next/head';

export function AppHead(): JSX.Element {
  return (
    <Head>
      <title>VOX</title>
      <meta name='og:title' content='Vox' />
      <link rel='icon' href='/favicon.png' />
      <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
      <meta name='vox:site' content='@vox' />
      <meta name='vox:card' content='summary_large_image' />
    </Head>
  );
}
