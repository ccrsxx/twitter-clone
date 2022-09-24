import Link from 'next/link';
import { motion } from 'framer-motion';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { preventBubbling } from '@lib/utils';
import { ImagePreview } from '@components/tweet/image-preview';
import { HeroIcon } from '@components/ui/hero-icon';
import { NextImage } from '@components/ui/next-image';
import { PostActions } from './post-actions';
import { PostStats } from './post-stats';
import { PostDate } from './post-date';
import type { Variants } from 'framer-motion';
import type { Post } from '@lib/types/post';
import type { User } from '@lib/types/user';

type ArticleProps = Post & { user: User; viewPost?: boolean };

const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export function Article({
  id: postId,
  text,
  images,
  viewPost,
  userLikes,
  createdBy,
  createdAt,
  userTweets,
  userReplies,
  user: { name, username, verified, photoURL }
}: ArticleProps): JSX.Element {
  const { user } = useAuth();

  const postLink = `/post/${postId}`;

  const userId = user?.uid as string;
  const userLink = `/user/${username}`;

  const isAdmin = user?.username === 'ccrsxx' && user?.verified;
  const isOwner = userId === createdBy;

  return (
    <motion.article layout='position' {...variants}>
      <Link href={postLink}>
        <a
          className={cn(
            `smooth-tab relative grid grid-cols-[auto,1fr] gap-x-3
             border-b border-border-color px-4 py-3 outline-none`,
            viewPost && 'cursor-default'
          )}
          tabIndex={viewPost ? -1 : 0}
          onClick={viewPost ? preventBubbling() : undefined}
        >
          <Link href={userLink}>
            <a className='blur-picture self-start'>
              <NextImage
                imgClassName='rounded-full'
                width={48}
                height={48}
                src={photoURL}
                alt={name}
              />
            </a>
          </Link>
          <div className='flex min-w-0 flex-col gap-1'>
            <div className='flex flex-col'>
              <div className='flex gap-1 text-secondary'>
                <div className='flex gap-1'>
                  <div className='flex items-center gap-1 text-primary'>
                    <Link href={userLink}>
                      <a className='custom-underline font-bold'>{name}</a>
                    </Link>
                    {verified && (
                      <i>
                        <HeroIcon
                          className='h-5 w-5'
                          iconName='CheckBadgeIcon'
                          solid
                        />
                      </i>
                    )}
                  </div>
                  <Link href={userLink}>
                    <a className='outline-none' tabIndex={-1}>
                      @{username}
                    </a>
                  </Link>
                </div>
                {!viewPost && (
                  <PostDate postLink={postLink} createdAt={createdAt} />
                )}
                <PostActions
                  postId={postId}
                  isAdmin={isAdmin}
                  isOwner={isOwner}
                  username={username}
                />
              </div>
              {text && (
                <p className='whitespace-pre-line break-words'>{text}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              {images && (
                <ImagePreview
                  post
                  imagesPreview={images}
                  previewCount={images.length}
                />
              )}
              {!viewPost && (
                <PostStats
                  userId={userId}
                  postId={postId}
                  isOwner={isOwner}
                  userLikes={userLikes}
                  userTweets={userTweets}
                  userReplies={userReplies}
                />
              )}
            </div>
          </div>
          {viewPost && (
            <div
              className='col-span-2 inner:border-b inner:border-border-color
                         [&>*:not(:nth-child(3))]:py-4'
            >
              <PostDate postLink={postLink} createdAt={createdAt} viewPost />
              <PostStats
                viewPost
                userId={userId}
                postId={postId}
                isOwner={isOwner}
                userLikes={userLikes}
                userTweets={userTweets}
                userReplies={userReplies}
              />
            </div>
          )}
        </a>
      </Link>
    </motion.article>
  );
}
