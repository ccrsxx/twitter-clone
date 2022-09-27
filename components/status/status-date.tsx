import Link from 'next/link';
import cn from 'clsx';
import { formatDate } from '@lib/format';
import { ToolTip } from '@components/ui/tooltip';
import type { Status } from '@lib/types/status';

type StatusDateProps = Pick<Status, 'createdAt'> & {
  statusLink: string;
  viewStatus?: boolean;
};

export function StatusDate({
  createdAt,
  statusLink,
  viewStatus
}: StatusDateProps): JSX.Element {
  return (
    <div className={cn('flex gap-1', viewStatus && 'py-4')}>
      {!viewStatus && <i>·</i>}
      <div className='group relative'>
        <Link href={statusLink}>
          <a
            className={cn(
              'custom-underline peer',
              viewStatus && 'text-secondary'
            )}
          >
            {formatDate(createdAt, viewStatus ? 'full' : 'status')}
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
