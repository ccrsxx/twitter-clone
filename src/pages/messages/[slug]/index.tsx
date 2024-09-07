import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import { doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import {
  conversationsCollection,
  messagesCollection,
  usersCollection
} from '@lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import {
  TrendsLayout,
  ProtectedLayout
} from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { HeroIcon } from '@components/ui/hero-icon';
import { useEffect, useState, type ReactElement, type ReactNode } from 'react';
import { Conversation, ConversationWithUser } from '@lib/types/conversation';
import { useAuth } from '@lib/context/auth-context';

export default function Message(): JSX.Element {
  const [conversation, setConversation] = useState<ConversationWithUser>();
  const { user } = useAuth();
  const { back } = useRouter();
  const { slug } = useParams();

  const { data, loading } = useCollection(
    query(messagesCollection, where('conversationId', '==', slug))
  );

  useEffect(() => {
    void (async () => {
      const conversationData = (
        await getDoc(doc(conversationsCollection, slug as string))
      ).data();

      const userData = (
        await getDoc(
          doc(
            usersCollection,
            (conversationData?.targetUserId === user?.id
              ? conversationData?.userId
              : conversationData?.targetUserId) as string
          )
        )
      ).data();

      if (userData)
        setConversation({
          ...(conversationData as Conversation),
          user: userData
        });
    })();
  }, [data, slug, user]);

  return (
    <MainContainer>
      <SEO title='Mensagens / Fofoca.me' />
      <MainHeader
        useActionButton
        title={conversation?.user.name ?? 'Panelinha'}
        action={back}
      >
        <Button
          className='dark-bg-tab group relative ml-auto cursor-not-allowed p-2 hover:bg-light-primary/10
                     active:bg-light-primary/20 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
        >
          <HeroIcon className='h-5 w-5' iconName='Cog8ToothIcon' />
          <ToolTip tip='Settings' />
        </Button>
      </MainHeader>
    </MainContainer>
  );
}

Message.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <TrendsLayout>{page}</TrendsLayout>
    </MainLayout>
  </ProtectedLayout>
);
