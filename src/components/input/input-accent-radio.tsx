import cn from 'clsx';
import { useTheme } from '@lib/context/theme-context';
import { HeroIcon } from '@components/ui/hero-icon';
import type { Accent } from '@lib/types/theme';

type InputAccentRadioProps = {
  type: Accent;
};

type InputAccentData = Record<Accent, string>;

const InputColors: Readonly<InputAccentData> = {
  orange: 'bg-[#f39438] hover:ring-[#f39438]/10 active:ring-[#f39438]/20',
  pink: 'bg-[#f481dc] hover:ring-[#f481dc]/10 active:ring-[#f481dc]/20',
  green: 'bg-[#c1e899] hover:ring-[#c1e899]/10 active:ring-[#c1e899]/20'
};

export function InputAccentRadio({ type }: InputAccentRadioProps): JSX.Element {
  const { accent, changeAccent } = useTheme();

  const bgColor = InputColors[type];
  const isChecked = type === accent;

  return (
    <label
      className={cn(
        `hover-animation flex h-10 w-10 cursor-pointer items-center justify-center
         rounded-full hover:ring`,
        bgColor
      )}
      htmlFor={type}
    >
      <input
        className='peer absolute h-0 w-0 opacity-0'
        id={type}
        type='radio'
        name='accent'
        value={type}
        checked={isChecked}
        onChange={changeAccent}
      />
      <i className='text-white peer-checked:inner:opacity-100'>
        <HeroIcon
          className='h-6 w-6 opacity-0 transition-opacity duration-200'
          iconName='CheckIcon'
        />
      </i>
    </label>
  );
}
