import Error from 'next/error';
import { SEO } from '@components/common/seo';
import { Layout } from '@components/common/layout';

export default function NotFound(): JSX.Element {
  return (
    <Layout>
      <SEO />
      <Error statusCode={404} />
    </Layout>
  );
}
