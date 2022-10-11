import { MainHeader } from '@components/home/main-header';
import type { ReactNode } from 'react';
import type { StatsType } from '@components/view/view-tweet-stats';

type TweetStatsModalProps = {
  children: ReactNode;
  statsType: StatsType | null;
  handleClose: () => void;
};

export function TweetStatsModal({
  children,
  statsType,
  handleClose
}: TweetStatsModalProps): JSX.Element {
  return (
    <>
      <MainHeader
        useActionButton
        disableSticky
        tip='Close'
        iconName='XMarkIcon'
        className='fixed flex w-[560px] items-center gap-6 rounded-t-2xl'
        title={`${statsType === 'likes' ? 'Liked' : 'Retweeted'} by`}
        action={handleClose}
      />
      {children}
    </>
  );
}
