import { useState, useRef } from 'react';
import cn from 'clsx';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import type { ChangeEvent } from 'react';

export function SearchBar(): JSX.Element {
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setInputValue(value);

  const clearInputValue = (): void => {
    inputRef.current?.focus();
    setInputValue('');
  };

  return (
    <form className='sticky top-0 z-10 -my-2 bg-black py-2'>
      <label
        className='group flex items-center justify-between gap-4 rounded-full
                   bg-search-background px-4 py-3 transition focus-within:bg-black
                   focus-within:ring-2 focus-within:ring-search-close-background'
      >
        <i>
          <HeroIcon
            className='h-5 w-5 text-secondary transition-colors group-focus-within:text-search-close-background'
            iconName='MagnifyingGlassIcon'
          />
        </i>
        <input
          className='flex-1 bg-transparent outline-none placeholder:text-secondary'
          type='text'
          placeholder='Search Twitter'
          value={inputValue}
          onChange={handleChange}
          ref={inputRef}
        />
        <Button
          className={cn(
            'scale-50 bg-search-close-background p-1 opacity-0 hover:brightness-90',
            inputValue && 'scale-100 opacity-100'
          )}
          onClick={clearInputValue}
          disabled={!inputValue}
        >
          <HeroIcon className='h-4 w-4 stroke-black' iconName='XMarkIcon' />
        </Button>
      </label>
    </form>
  );
}
