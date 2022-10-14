import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useModal } from '@lib/hooks/useModal';
import { useUser } from '@lib/context/user-context';
import { updateUserData } from '@lib/firebase/utils';
import { Modal } from '@components/modal/modal';
import { EditProfileModal } from '@components/modal/edit-profile-modal';
import { Button } from '@components/ui/button';
import { InputField } from '@components/input/input-field';
import type { ChangeEvent } from 'react';
import type { User, EditableData, EditableUserData } from '@lib/types/user';

export function UserEditProfile(): JSX.Element {
  const { user } = useUser();
  const { open, openModal, closeModal } = useModal();

  const { bio, name, website, location, photoURL, coverPhotoURL } =
    user as User;

  const [editUserData, setEditUserData] = useState<EditableUserData>({
    bio,
    name,
    website,
    location
  });

  const updateData = async (): Promise<void> => {
    const newUserData = {
      ...editUserData,
      bio: editUserData.bio?.trim() ?? null
    };

    await updateUserData(user?.id as string, newUserData);
    closeModal();

    setEditUserData(newUserData);
    toast.success('Profile updated successfully');
  };

  const handleChange =
    (key: EditableData) =>
    ({
      target: { value }
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setEditUserData((prev) => ({ ...prev, [key]: value }));

  const inputFields: [string, EditableData, string | null][] = [
    ['Name', 'name', editUserData.name],
    ['Bio', 'bio', editUserData.bio],
    ['Location', 'location', editUserData.location],
    ['Website', 'website', editUserData.website]
  ];

  return (
    <>
      <Modal
        modalClassName='relative bg-black rounded-2xl max-w-xl w-full 
                        h-[672px] overflow-hidden rounded-t-2xl'
        open={open}
        closeModal={closeModal}
      >
        <EditProfileModal
          name={name}
          photoURL={photoURL}
          coverPhotoURL={coverPhotoURL}
          closeModal={closeModal}
          updateData={updateData}
        >
          {inputFields.map(([label, inputId, inputValue], index) => (
            <InputField
              {...(index === 1 ? { useTextArea: true } : {})}
              key={inputId}
              label={label}
              inputId={inputId}
              inputValue={inputValue ?? ''}
              handleChange={handleChange(inputId)}
            />
          ))}
        </EditProfileModal>
      </Modal>
      <Button
        className='self-start border border-border-color-secondary px-4 py-1
                   font-bold hover:bg-follow-button-background/10'
        onClick={openModal}
      >
        Edit profile
      </Button>
    </>
  );
}
