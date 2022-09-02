import { InputBox } from './input-box';
import { Trending } from './trends';
import { Suggestion } from './suggestion';
import { Footer } from './footer';

export function Aside(): JSX.Element {
  return (
    <aside className='flex w-96 flex-col gap-4 px-4 py-3'>
      <InputBox />
      <Trending />
      <Suggestion />
      <Footer />
    </aside>
  );
}
