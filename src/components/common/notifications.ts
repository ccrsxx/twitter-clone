import type { NotificationWithUser } from '@lib/types/notification';

const placeholder = {
  follower: {
    title: 'Um novo usuário seguiu você!',
    description: 'Agora o #name tá acompanhando tuas fofocas de pertinho'
  }
};

const ReplaceParams = (toReplace: object, replace: object) => {
  const result = { ...toReplace };

  Object.keys(toReplace).forEach((key) => {
    if (typeof toReplace[key] === 'string') {
      result[key] = toReplace[key].replace(
        /#(\w+)/g,
        (_, match) => replace[match] || match
      );
    }
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
