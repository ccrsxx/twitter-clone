import Error from 'next/error';
import { SEO } from '@components/common/seo';

export default function NotFound(): JSX.Element {
  return (
    <>
      <SEO />
      <Error statusCode={404} />
    </>
  );
}
