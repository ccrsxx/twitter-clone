import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { orderBy, query } from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { useCollection } from '@lib/hooks/useCollection';
import { useArrayDocument } from '@lib/hooks/useArrayDocument';
import { clearAllBookmarks } from '@lib/firebase/utils';
import {
  tweetsCollection,
  userBookmarksCollection
} from '@lib/firebase/collections';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { Tweet } from '@components/tweet/tweet';
import { StatsEmpty } from '@components/tweet/stats-empty';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { HeroIcon } from '@components/ui/hero-icon';
import { Loading } from '@components/ui/loading';
import type { ReactElement, ReactNode } from 'react';

export default function Bookmarks(): JSX.Element {
  const { user } = useAuth();

  const { open, openModal, closeModal } = useModal();

  const userId = user?.id as string;

  const { data: bookmarksRef, loading: bookmarksRefLoading } = useCollection(
    query(userBookmarksCollection(userId), orderBy('createdAt', 'desc')),
    { allowNull: true }
  );

  const tweetIds = useMemo(
    () => bookmarksRef?.map(({ id }) => id) ?? [],
    [bookmarksRef]
  );

  const { data: tweetData, loading: tweetLoading } = useArrayDocument(
    tweetIds,
    tweetsCollection,
    { includeUser: true }
  );

  const handleClear = async (): Promise<void> => {
    await clearAllBookmarks(userId);
    closeModal();
    toast.success('Todos os favoritos foram limpos com sucesso');
  };

  return (
    <MainContainer>
      <SEO title='Babados / Fofoca.me' />
      <Modal
        modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
        open={open}
        closeModal={closeModal}
      >
        <ActionModal
          title='Limpar todos os favoritos?'
          description='Isso não pode ser desfeito e você removerá todas as Fofocas adicionadas aos seus Favoritos.'
          mainBtnClassName='bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75 accent-tab 
                            focus-visible:bg-accent-red/90'
          mainBtnLabel='Limpar'
          action={handleClear}
          closeModal={closeModal}
        />
      </Modal>
      <MainHeader className='flex items-center justify-between'>
        <div className='-mb-1 flex flex-col'>
          <h2 className='-mt-1 text-xl font-bold'>Babado</h2>
          <p className='text-xs text-light-secondary dark:text-dark-secondary'>
            @{user?.username}
          </p>
        </div>
        <Button
          className='dark-bg-tab group relative p-2 hover:bg-light-primary/10
                     active:bg-light-primary/20 dark:hover:bg-dark-primary/10 
                     dark:active:bg-dark-primary/20'
          onClick={openModal}
        >
          <HeroIcon className='h-5 w-5' iconName='ArchiveBoxXMarkIcon' />
          <ToolTip
            className='!-translate-x-20 translate-y-3 md:-translate-x-1/2'
            tip='Clear bookmarks'
          />
        </Button>
      </MainHeader>
      <section className='mt-0.5'>
        {bookmarksRefLoading || tweetLoading ? (
          <Loading className='mt-5' />
        ) : !bookmarksRef ? (
          <StatsEmpty
            title='Salvar fofoquinhas para mais tarde'
            description='Não perca os bons momentos! Salve suas Fofocas para encontrá-las facilmente no futuro.'
            imageData={{ src: '/assets/no-bookmarks.png', alt: 'No bookmarks' }}
          />
        ) : (
          <AnimatePresence mode='popLayout'>
            {tweetData?.map((tweet) => (
              <Tweet {...tweet} key={tweet.id} />
            ))}
          </AnimatePresence>
        )}
      </section>
    </MainContainer>
  );
}

Bookmarks.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
