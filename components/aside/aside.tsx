import { SearchBar } from './search-bar';
import { AsideTrends } from './aside-trends';
import { Suggestion } from './suggestion';
import { AsideFooter } from './aside-footer';

export function Aside(): JSX.Element {
  return (
    <aside className='flex w-96 flex-col gap-4 px-4 py-3 pt-1'>
      <SearchBar />
      <AsideTrends />
      <Suggestion />
      <AsideFooter />
    </aside>
  );
}
