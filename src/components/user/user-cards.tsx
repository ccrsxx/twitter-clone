import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { StatsEmpty } from '@components/tweet/stats-empty';
import { Loading } from '@components/ui/loading';
import { variants } from '@components/user/user-header';
import { UserCard } from './user-card';
import type { User } from '@lib/types/user';
import type { StatsType } from '@components/view/view-tweet-stats';
import type { StatsEmptyProps } from '@components/tweet/stats-empty';

type FollowType = 'following' | 'followers';

type CombinedTypes = StatsType | FollowType;

type UserCardsProps = {
  data: User[] | null;
  type: CombinedTypes;
  follow?: boolean;
  loading: boolean;
};

type NoStatsData = Record<CombinedTypes, StatsEmptyProps>;

const allNoStatsData: Readonly<NoStatsData> = {
  retweets: {
    title: 'Amplifique os tweets que você gosta',
    imageData: { src: '/assets/no-retweets.png', alt: 'Sem refofocas' },
    description:
      'Compartilhe o Tweet de outra pessoa em sua linha do tempo, refofocando-o. Quando você fizer isso, ele aparecerá aqui.'
  },
  likes: {
    title: 'Ainda não há curtidas no Tweet',
    imageData: { src: '/assets/no-likes.png', alt: 'Sem curtidas' },
    description: 'Quando você curtir um Tweet, ele aparecerá aqui.'
  },
  following: {
    title: 'Fique por dentro',
    description:
      'Seguir contas é uma maneira fácil de organizar sua linha do tempo e saber o que está acontecendo com os tópicos e pessoas de seu interesse.'
  },
  followers: {
    title: 'Procurando por seguidores?',
    imageData: { src: '/assets/no-followers.png', alt: 'Sem seguidores' },
    description:
      'Quando alguém segue esta conta, ele aparecerá aqui. Fofocar e interagir com outras pessoas ajuda a aumentar os seguidores.'
  }
};

export function UserCards({
  data,
  type,
  follow,
  loading
}: UserCardsProps): JSX.Element {
  const noStatsData = allNoStatsData[type];
  const modal = ['retweets', 'likes'].includes(type);

  return (
    <section
      className={cn(
        modal && 'h-full overflow-y-auto [&>div:first-child>a]:mt-[52px]',
        loading && 'flex items-center justify-center'
      )}
    >
      {loading ? (
        <Loading className={modal ? 'mt-[52px]' : 'mt-5'} />
      ) : (
        <AnimatePresence mode='popLayout'>
          {data?.length ? (
            data.map((userData) => (
              <motion.div layout='position' key={userData.id} {...variants}>
                <UserCard {...userData} follow={follow} modal={modal} />
              </motion.div>
            ))
          ) : (
            <StatsEmpty {...noStatsData} modal={modal} />
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
