import Link from 'next/link';
import cn from 'clsx';
import { formatDate } from '@lib/format';
import { ToolTip } from '@components/ui/tooltip';
import type { Post } from '@lib/types/post';

type PostDateProps = Pick<Post, 'createdAt'> & {
  viewPost?: boolean;
  postLink: string;
};

export function PostDate({
  viewPost,
  postLink,
  createdAt
}: PostDateProps): JSX.Element {
  return (
    <div className={cn('flex gap-1', viewPost && 'py-4')}>
      {!viewPost && <i>·</i>}
      <div className='group relative'>
        <Link href={postLink}>
          <a
            className={cn(
              'custom-underline peer',
              viewPost && 'text-secondary'
            )}
          >
            {formatDate(createdAt, viewPost ? 'full' : 'post')}
          </a>
        </Link>
        <ToolTip
          className='translate-y-1 peer-focus:opacity-100 peer-focus-visible:visible
                     peer-focus-visible:delay-200'
          tip={formatDate(createdAt, 'full')}
        />
      </div>
    </div>
  );
}
