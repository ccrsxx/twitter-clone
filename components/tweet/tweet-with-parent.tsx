import { useState } from 'react';
import { Tweet } from './tweet';
import { TweetParent } from './tweet-parent';
import type { TweetWithUser } from '@lib/types/tweet';

type TweetWithParentProps = {
  data: TweetWithUser[];
};

export type LoadedParents = Record<'parentId' | 'componentId', string>[];

export function TweetWithParent({ data }: TweetWithParentProps): JSX.Element {
  const [loadedParents, setParentIds] = useState<LoadedParents>([]);

  const addParentId = (parentId: string, componentId: string): void =>
    setParentIds((prev) => {
      if (prev.some((item) => item.parentId === parentId)) return prev;
      return [...prev, { parentId, componentId }];
    });

  const filteredData = data.filter(
    (item) => !loadedParents.some((parent) => parent.parentId === item.id)
  );

  return (
    <>
      {filteredData.map((tweet) => (
        <div className='[&>article:nth-child(2)]:-mt-1' key={tweet.id}>
          {tweet.parent && (
            <TweetParent
              parentId={tweet.parent.id}
              loadedParents={loadedParents}
              addParentId={addParentId}
            />
          )}
          <Tweet {...tweet} />
        </div>
      ))}
    </>
  );
}
