import { HeroIcon } from '@components/ui/hero-icon'; // Ícone da lupa
import type { ChangeEvent, FormEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function UserSearchBar({
  value,
  onChange
}: SearchBarProps): JSX.Element {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <form className='hover-animation' onSubmit={handleSubmit}>
      <label
        className='group flex items-center justify-between gap-4 rounded-md border
                   border-gray-200 bg-white px-4 py-2 shadow-md
                   transition focus-within:bg-main-background focus-within:ring-2 focus-within:ring-main-accent dark:border-main-background dark:bg-zinc-900'
      >
        <i>
          <HeroIcon
            className='h-5 w-5 text-light-secondary transition-colors 
                       group-focus-within:text-main-accent dark:text-dark-secondary'
            iconName='MagnifyingGlassIcon'
          />
        </i>
        <input
          className='peer flex-1 bg-transparent outline-none 
                     placeholder:text-light-secondary dark:placeholder:text-dark-secondary'
          type='text'
          placeholder='Search Twitter'
          value={value}
          onChange={onChange}
        />
      </label>
    </form>
  );
}
