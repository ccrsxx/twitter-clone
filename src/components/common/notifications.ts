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

const ReplaceParams = (toReplace: object, replace: object) => {
  const result: any = { ...toReplace };

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

  return {
    ...(ReplaceParams(placeholderProp, {
      name: notification.user.name
    }) as typeof placeholderProp),
    image_url: notification.user.photoURL,
    url: `${process.env.NEXT_PUBLIC_URL as string}/user/${
      notification.user.username
    }`
  };
};
