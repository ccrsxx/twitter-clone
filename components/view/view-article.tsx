import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@lib/context/auth-context';
import { ImagePreview } from '@components/tweet/image-preview';
import { HeroIcon } from '@components/ui/hero-icon';
import { NextImage } from '@components/ui/next-image';
import { variants } from '@components/post/article';
import { PostActions } from '@components/post/post-actions';
import { PostStats } from '@components/post/post-stats';
import { PostDate } from '@components/post/post-date';
import { Tweet } from '@components/tweet/tweet';
import type { User } from '@lib/types/user';
import type { Post } from '@lib/types/post';

type ViewArticleProps = Post & { user: User };

export function ViewArticle({
  id: postId,
  text,
  images,
  userLikes,
  createdBy,
  createdAt,
  userTweets,
  userReplies,
  user: { name, username, verified, photoURL }
}: ViewArticleProps): JSX.Element {
  const { user } = useAuth();

  const postLink = `/post/${postId}`;

  const userId = user?.uid as string;
  const userLink = `/user/${username}`;

  const isAdmin = user?.username === 'ccrsxx' && user?.verified;
  const isOwner = userId === createdBy;

  return (
    <motion.article
      className='smooth-tab relative flex cursor-default flex-col gap-4
                 border-b border-border-color px-4 py-3 outline-none'
      layout='position'
      {...variants}
    >
      <div className='grid grid-cols-[auto,1fr] gap-3'>
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
            <div className='-mb-1 flex items-center gap-1'>
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
              <a className='text-secondary outline-none' tabIndex={-1}>
                @{username}
              </a>
            </Link>
          </div>
          <PostActions
            postId={postId}
            isAdmin={isAdmin}
            isOwner={isOwner}
            username={username}
          />
        </div>
      </div>
      <div>
        {text && (
          <p className='whitespace-pre-line break-words text-2xl'>{text}</p>
        )}
        {images && (
          <ImagePreview
            post
            imagesPreview={images}
            previewCount={images.length}
          />
        )}
        <div className='inner:border-b inner:border-border-color'>
          <PostDate viewPost postLink={postLink} createdAt={createdAt} />
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
        <Tweet comment username={username} />
      </div>
    </motion.article>
  );
}
