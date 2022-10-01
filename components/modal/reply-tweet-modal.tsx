import { Tweet } from '@components/tweet/tweet';
import { Status } from '@components/status/status';
import type { StatusProps } from '@components/status/status';

type ReplyTweetModalProps = {
  status: StatusProps;
  closeModal: () => void;
};

export function ReplyTweetModal({
  status,
  closeModal
}: ReplyTweetModalProps): JSX.Element {
  return (
    <Tweet
      modal
      replyModal
      parent={{ id: status.id, username: status.user.username }}
      closeModal={closeModal}
    >
      <Status modal parentTweet {...status} />
    </Tweet>
  );
}
