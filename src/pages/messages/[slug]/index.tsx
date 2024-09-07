import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import {
  addDoc,
  doc,
  getDoc,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore';
import cn from 'clsx';
import { useEffect, useState, type ReactElement, type ReactNode } from 'react';
import {
  conversationsCollection,
  messagesCollection,
  usersCollection
} from '@lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import { useAuth } from '@lib/context/auth-context';
import { Message } from '@lib/types/message';
import {
  TrendsLayout,
  ProtectedLayout
} from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { HeroIcon } from '@components/ui/hero-icon';
import { CustomIcon } from '@components/ui/custom-icon';
import type {
  Conversation,
  ConversationWithUser
} from '@lib/types/conversation';
import type { WithFieldValue } from 'firebase/firestore';
import { Loading } from '@components/ui/loading';

export default function MessagePage(): JSX.Element {
  const [conversation, setConversation] = useState<ConversationWithUser>();
  const { user } = useAuth();
  const { back } = useRouter();
  const { slug } = useParams();

  const [inputValue, setInputValue] = useState('');

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

  const handleSendMessage = async (): Promise<void> => {
    setInputValue('');

    await addDoc(messagesCollection, {
      conversationId: slug as string,
      text: inputValue,
      userId: user?.id,
      createdAt: serverTimestamp(),
      updatedAt: null
    } as WithFieldValue<Omit<Message, 'id'>>);
  };

  return (
    <main
      className={cn(
        'hover-animation flex min-h-[90vh] w-full max-w-xl flex-col xl:min-h-screen'
      )}
    >
      <SEO title='Mensagens / Fofoca.me' />
      <MainHeader
        useActionButton
        title={`Panelinha ${
          conversation?.user.name ? `com ${conversation.user.name}` : ''
        }`}
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

      {loading ? (
        <Loading />
      ) : (
        <div className='flex h-full w-full flex-col justify-end pb-4'>
          <div className='mb-2 flex h-full w-full flex-col justify-end gap-2 overflow-auto pb-2'>
            {data
              ?.sort((a, b) => (a.createdAt as any) - (b.createdAt as any))
              .map((message) => (
                <div
                  className={`flex w-full ${
                    message.userId === user?.id
                      ? 'justify-end'
                      : ' justify-start'
                  }`}
                  key={message.id}
                >
                  <div
                    className={`rounded-md px-2 py-1 ${
                      message.userId === user?.id
                        ? 'bg-main-accent'
                        : 'border-[1px] border-main-accent bg-main-secondary'
                    }
                  `}
                  >
                    <span>{message.text}</span>
                  </div>
                </div>
              ))}
          </div>

          <div className='bg-red flex w-full flex-col items-center px-4'>
            <textarea
              className='decoration-none min-h-4 mb-2 w-full resize-none rounded-md border-[1px] border-gray-400 bg-transparent p-2 outline-none'
              placeholder='Digite aqui sua fofoca'
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />

            <Button
              className='w-full bg-main-accent text-lg font-bold
                       text-white outline-none transition hover:brightness-90 active:brightness-75 xs:static
                       xs:translate-y-0 xs:hover:bg-main-accent/90 xs:active:bg-main-accent/75'
              onClick={handleSendMessage}
            >
              <p className='block'>Enviar</p>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}

MessagePage.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <TrendsLayout>{page}</TrendsLayout>
    </MainLayout>
  </ProtectedLayout>
);
