import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { delayScroll } from '@lib/utils';
import { Modal } from '@components/modal/modal';
import { ReplyTweetModal } from '@components/modal/reply-tweet-modal';
import { ImagePreview } from '@components/input/image-preview';
import { ProfilePicture } from '@components/ui/profile-picture';
import { VerifiedName } from '@components/ui/verified-name';
import { HeroIcon } from '@components/ui/hero-icon';
import { top } from '@components/input/input-form';
import { TweetActions } from './tweet-actions';
import { TweetStats } from './tweet-stats';
import { TweetDate } from './tweet-date';
import type { Variants } from 'framer-motion';
import type { Tweet } from '@lib/types/tweet';
import type { User } from '@lib/types/user';

export type TweetProps = Tweet & {
  user: User;
  reply?: boolean;
  modal?: boolean;
  profile?: Partial<User>;
  parentTweet?: boolean;
};

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export function Tweet(tweet: TweetProps): JSX.Element {
  const {
    id: tweetId,
    text,
    reply,
    modal,
    images,
    parent,
    profile,
    userLikes,
    createdBy,
    createdAt,
    parentTweet,
    userReplies,
    userRetweets,
    user: { name, username, verified, photoURL }
  } = tweet;

  const { user } = useAuth();

  const { open, openModal, closeModal } = useModal();

  const tweetLink = `/tweet/${tweetId}`;

  const userId = user?.id as string;
  const userLink = `/user/${username}`;

  const isOwner = userId === createdBy;

  const { id: parentId, username: parentUsername = username } = parent ?? {};

  const {
    id: profileId,
    name: profileName,
    username: profileUsername
  } = profile ?? {};

  const tweetIsRetweeted = userRetweets.includes(profileId ?? '');

  return (
    <motion.article
      layout='position'
      {...(!modal ? variants : {})}
      animate={{
        ...variants.animate,
        ...(parentTweet && { transition: { duration: 0.2 } })
      }}
    >
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-black rounded-2xl max-w-xl w-full my-8'
        open={open}
        closeModal={closeModal}
      >
        <ReplyTweetModal tweet={tweet} closeModal={closeModal} />
      </Modal>
      <Link href={tweetLink} scroll={!reply}>
        <a
          className={cn(
            'smooth-tab relative flex flex-col gap-4 px-4 py-3 outline-none',
            parentTweet ? 'mt-0.5 pt-2.5 pb-0' : 'border-b border-border-color'
          )}
          onClick={reply ? delayScroll(100) : undefined}
        >
          <div className='grid grid-cols-[auto,1fr] gap-3'>
            <AnimatePresence initial={false}>
              {!modal && tweetIsRetweeted && (
                <motion.div
                  className='col-span-2 grid grid-cols-[48px,1fr] gap-3'
                  {...top}
                >
                  <i className='justify-self-end text-secondary'>
                    <HeroIcon
                      className='h-5 w-5'
                      iconName='ArrowPathRoundedSquareIcon'
                    />
                  </i>
                  <Link href={profileUsername as string}>
                    <a className='custom-underline text-sm font-bold text-secondary'>
                      {userId === profileId ? 'You' : profileName} Retweeted
                    </a>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            <div className='flex flex-col items-center gap-2'>
              <ProfilePicture src={photoURL} alt={name} username={username} />
              {parentTweet && (
                <i className='h-full w-0.5 bg-line-reply-color' />
              )}
            </div>
            <div className='flex min-w-0 flex-col'>
              <div className='text-secondary'>
                <div className='flex gap-1'>
                  <div className='flex items-center gap-1 text-primary'>
                    <VerifiedName verified={verified}>
                      <Link href={userLink}>
                        <a className='custom-underline font-bold'>{name}</a>
                      </Link>
                    </VerifiedName>
                  </div>
                  <Link href={userLink}>
                    <a className='outline-none' tabIndex={-1}>
                      @{username}
                    </a>
                  </Link>
                  <TweetDate tweetLink={tweetLink} createdAt={createdAt} />
                </div>
                {!modal && (
                  <TweetActions
                    isOwner={isOwner}
                    tweetId={tweetId}
                    parentId={parentId}
                    username={username}
                    createdBy={createdBy}
                  />
                )}
              </div>
              {(reply || modal) && (
                <p className={cn('text-secondary', modal && 'order-1 my-2')}>
                  Replying to{' '}
                  <Link href={`/user/${parentUsername}`}>
                    <a className='custom-underline text-accent-blue'>
                      @{parentUsername}
                    </a>
                  </Link>
                </p>
              )}
              {text && (
                <p className='whitespace-pre-line break-words'>{text}</p>
              )}
              <div className='mt-1 flex flex-col gap-2'>
                {images && (
                  <ImagePreview
                    tweet
                    imagesPreview={images}
                    previewCount={images.length}
                  />
                )}
                {!modal && (
                  <TweetStats
                    userId={userId}
                    isOwner={isOwner}
                    tweetId={tweetId}
                    hasParent={!!parent}
                    userLikes={userLikes}
                    userReplies={userReplies}
                    userRetweets={userRetweets}
                    openModal={!parent ? openModal : undefined}
                  />
                )}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </motion.article>
  );
}
