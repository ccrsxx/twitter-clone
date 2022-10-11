import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { manageFollow } from '@lib/firebase/utils';
import { preventBubbling } from '@lib/utils';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { Button } from '@components/ui/button';

type UserFollowButtonProps = {
  userTargetId: string;
  userTargetUsername: string;
};

export function UserFollowButton({
  userTargetId,
  userTargetUsername
}: UserFollowButtonProps): JSX.Element {
  const { user } = useAuth();
  const { open, openModal, closeModal } = useModal();

  const { id: userId, following } = user ?? {};

  const handleFollow = (): Promise<void> =>
    manageFollow('follow', userId as string, userTargetId);

  const handleUnfollow = async (): Promise<void> => {
    await manageFollow('unfollow', userId as string, userTargetId);
    closeModal();
  };

  const userIsFollowed = !!following?.includes(userTargetId ?? '');

  return (
    <>
      <Modal
        modalClassName='flex flex-col gap-6 max-w-xs bg-black w-full p-8 rounded-2xl'
        open={open}
        closeModal={closeModal}
      >
        <ActionModal
          title={`Unfollow @${userTargetUsername}?`}
          description='Their Tweets will no longer show up in your home timeline. You can still view their profile, unless their Tweets are protected.'
          mainBtnLabel='Unfollow'
          action={handleUnfollow}
          closeModal={closeModal}
        />
      </Modal>
      {userIsFollowed ? (
        <Button
          className='min-w-[106px] self-start border border-border-color-secondary
                     px-4 py-1.5 font-bold hover:border-accent-red hover:bg-accent-red/10
                     hover:text-accent-red hover:before:content-["Unfollow"] [&>span]:hover:hidden'
          onClick={preventBubbling(openModal)}
        >
          <span>Following</span>
        </Button>
      ) : (
        <Button
          className='self-start border border-border-color-secondary bg-follow-button-background
                     px-4 py-1.5 font-bold text-follow-text-color hover:bg-follow-button-background/90 
                     active:bg-follow-button-background/75'
          onClick={preventBubbling(handleFollow)}
        >
          Follow
        </Button>
      )}
    </>
  );
}
