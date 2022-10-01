import { useState, useRef } from 'react';
import cn from 'clsx';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import type { ChangeEvent, KeyboardEvent } from 'react';

export function SearchBar(): JSX.Element {
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setInputValue(value);

  const clearInputValue = (focus?: boolean) => (): void => {
    if (focus) inputRef.current?.focus();
    else inputRef.current?.blur();

    setInputValue('');
  };

  const handleEscape = ({ key }: KeyboardEvent<HTMLInputElement>): void => {
    if (key === 'Escape') clearInputValue()();
  };

  return (
    <form className='sticky top-0 z-10 -my-2 bg-black py-2'>
      <label
        className='group flex items-center justify-between gap-4 rounded-full
                   bg-search-background px-4 py-2 transition focus-within:bg-black
                   focus-within:ring-2 focus-within:ring-accent-blue'
      >
        <i>
          <HeroIcon
            className='h-5 w-5 text-secondary transition-colors group-focus-within:text-accent-blue'
            iconName='MagnifyingGlassIcon'
          />
        </i>
        <input
          className='peer flex-1 bg-transparent outline-none placeholder:text-secondary'
          type='text'
          placeholder='Search Twitter'
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onKeyUp={handleEscape}
        />
        <Button
          className={cn(
            'scale-50 bg-accent-blue p-1 opacity-0 hover:brightness-90',
            inputValue &&
              'focus:scale-100 focus:opacity-100 peer-focus:scale-100 peer-focus:opacity-100'
          )}
          onClick={clearInputValue(true)}
          disabled={!inputValue}
        >
          <HeroIcon className='h-3 w-3 stroke-black' iconName='XMarkIcon' />
        </Button>
      </label>
    </form>
  );
}
