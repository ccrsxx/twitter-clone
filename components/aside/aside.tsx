import { SearchBar } from './search-bar';
import { Trending } from './trends';
import { Suggestion } from './suggestion';
import { Footer } from './footer';

export function Aside(): JSX.Element {
  return (
    <aside className='flex w-96 flex-col gap-4 px-4 py-3 pt-1'>
      <SearchBar />
      <Trending />
      <Suggestion />
      <Footer />
    </aside>
  );
}
