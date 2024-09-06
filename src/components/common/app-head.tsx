import Head from 'next/head';

export function AppHead(): JSX.Element {
  return (
    <Head>
      <title>Fofoca-me</title>
      <meta name='og:title' content='Fofoca-me' />
      <meta
        name='description'
        content='Uma rede social Brasileira, vem fofocar'
      />
      <link rel='icon' href='/favicon.ico' />
      <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
      <meta name='fofoca:site' content='@fofoca.me' />
      <meta name='fofoca:card' content='summary_large_image' />
    </Head>
  );
}
