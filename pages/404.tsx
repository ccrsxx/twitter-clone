import Error from 'next/error';
import { SEO } from '@components/common/seo';

export default function NotFound(): JSX.Element {
  return (
    <>
      <SEO
        title='Twitter / Not Found'
        description='Sorry we couldn’t find the page you were looking for.'
        image='/404.png'
      />
      <Error statusCode={404} />
    </>
  );
}
