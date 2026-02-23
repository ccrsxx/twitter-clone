/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { NotificationWithUser } from '@lib/types/notification';

const placeholder = {
  follower: {
    title: 'Um novo fofoqueiro seguiu você!',
    description: 'Agora #name tá acompanhando(a) tuas fofocas de pertinho'
  },
  liked: {
    title: 'Alguém curtiu sua fofoca.',
    description: '#name tá adorando o que tu tá falando'
  }
};

const ReplaceParams = (
  toReplace: Record<string, string>,
  replace: object
): unknown => {
  const result: Record<string, string> = { ...toReplace };

  Object.keys(toReplace).forEach((key) => {
    if (typeof toReplace[key as keyof typeof toReplace] === 'string')
      result[key as keyof typeof result] = (
        toReplace[key as keyof typeof toReplace] as string
      ).replace(
        /#(\w+)/g,
        (_, match) => replace[match as keyof typeof replace] || match
      );
  });

  return result;
};

export const NotificationTypes = (notification: NotificationWithUser) => {
  const placeholderProp =
    placeholder[notification.type as keyof typeof placeholder];

  const userInfo = ReplaceParams(placeholderProp, {
    name: notification.user.name
  }) as typeof placeholderProp;

  return {
    ...userInfo,
    image_url: notification.user.photoURL,
    url: `/user/${notification.user.username}`
  };
};
