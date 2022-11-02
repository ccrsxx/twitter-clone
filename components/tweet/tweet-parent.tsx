/* eslint-disable react-hooks/exhaustive-deps */

import { useMemo, useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { useDocument } from '@lib/hooks/useDocument';
import { tweetsCollection } from '@lib/firebase/collections';
import { getRandomId } from '@lib/random';
import { Tweet } from './tweet';
import type { LoadedParents } from './tweet-with-parent';

type TweetParentProps = {
  parentId: string;
  loadedParents: LoadedParents;
  addParentId: (parentId: string, componentId: string) => void;
};

export function TweetParent({
  parentId,
  loadedParents,
  addParentId
}: TweetParentProps): JSX.Element | null {
  const componentId = useMemo(getRandomId, []);

  const isParentAlreadyLoaded = loadedParents.some(
    (child) => child.childId === componentId
  );

  const { data, loading } = useDocument(doc(tweetsCollection, parentId), {
    includeUser: true,
    allowNull: true,
    disabled: isParentAlreadyLoaded
  });

  useEffect(() => {
    addParentId(parentId, componentId);
  }, []);

  if (loading || !isParentAlreadyLoaded || !data) return null;

  return <Tweet parentTweet {...data} />;
}
