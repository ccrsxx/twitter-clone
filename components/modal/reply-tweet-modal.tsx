import { Tweet } from '@components/tweet/tweet';
import { StatusReply } from '@components/status/status-reply';
import type { User } from '@lib/types/user';
import type { Status } from '@lib/types/status';

type ReplyTweetModalProps = {
  user: Pick<User, 'name' | 'username' | 'verified' | 'photoURL'>;
  status: Pick<Status, 'text' | 'images' | 'createdAt'>;
  statusId: string;
  closeModal: () => void;
};

export function ReplyTweetModal({
  user,
  status,
  statusId,
  closeModal
}: ReplyTweetModalProps): JSX.Element {
  return (
    <Tweet
      modal
      replyTweet
      parent={{ id: statusId, username: user.username }}
      closeModal={closeModal}
    >
      <StatusReply user={user} status={status} statusId={statusId} />
    </Tweet>
  );
}
