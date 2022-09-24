import { doc } from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { postsCollection } from '@lib/firebase/collections';
import { useDocument } from '@lib/hooks/useDocument';
import { SEO } from '@components/common/seo';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { Article } from './article';

type ViewPostProps = {
  postId: string;
};

export function ViewPost({ postId }: ViewPostProps): JSX.Element {
  const { user } = useAuth();

  const { data, loading } = useDocument(doc(postsCollection, postId), {
    includeUser: true
  });

  if (loading) return <Loading className='mx-auto mt-5' />;
  if (!data)
    return (
      <>
        <SEO title='Tweet not found / Twitter' />
        <Error message='Tweet not found' />
      </>
    );

  const { text } = data ?? {};

  const pageTitle = data
    ? `${user?.username as string} on Twitter: "${text}" / Twitter`
    : null;

  return (
    <section>
      {pageTitle && <SEO title={pageTitle} />}
      <Article viewPost {...data} />
    </section>
  );
}
