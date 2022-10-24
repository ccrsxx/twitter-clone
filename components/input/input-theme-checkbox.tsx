import cn from 'clsx';
import { HeroIcon } from '@components/ui/hero-icon';

type InputTheme = 'light' | 'dim' | 'dark';

type InputThemeCheckboxProps = {
  type: InputTheme;
  label: string;
};

type InputThemeData = Record<
  InputTheme,
  {
    textColor: string;
    backgroundColor: string;
    iconBorderColor: string;
    hoverBackgroundColor: string;
  }
>;

const inputThemeData: InputThemeData = {
  light: {
    textColor: 'text-black',
    backgroundColor: 'bg-white',
    iconBorderColor: 'border-[#B9CAD3]',
    hoverBackgroundColor:
      '[&:hover>div]:bg-secondary/10 [&:active>div]:bg-secondary/20'
  },
  dim: {
    textColor: 'text-[#F7F9F9]',
    backgroundColor: 'bg-[#15202B]',
    iconBorderColor: 'border-[#5C6E7E]',
    hoverBackgroundColor:
      '[&:hover>div]:bg-border-color-secondary/10 [&:active>div]:bg-border-color-secondary/20'
  },
  dark: {
    textColor: 'text-primary',
    backgroundColor: 'bg-black',
    iconBorderColor: 'border-[#3E4144]',
    hoverBackgroundColor:
      '[&:hover>div]:bg-accent-blue/10 [&:active>div]:bg-accent-blue/20'
  }
};

export function InputThemeCheckbox({
  type,
  label
}: InputThemeCheckboxProps): JSX.Element {
  const { textColor, backgroundColor, iconBorderColor, hoverBackgroundColor } =
    inputThemeData[type];

  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded p-3 font-bold',
        textColor,
        backgroundColor,
        hoverBackgroundColor
      )}
      htmlFor={type}
    >
      <div className='hover-animation flex h-10 w-10 items-center justify-center rounded-full'>
        <input
          className='peer absolute h-0 w-0 opacity-0'
          id={type}
          type='radio'
          name='theme'
        />
        <i
          className={cn(
            `flex h-5 w-5 items-center justify-center rounded-full 
             border-2 border-[#B9CAD3] transition duration-200
             peer-checked:border-transparent peer-checked:bg-accent-blue
             peer-checked:text-white peer-checked:inner:opacity-100`,
            iconBorderColor
          )}
        >
          <HeroIcon
            className='h-full w-full p-0.5 opacity-0 transition-opacity duration-200'
            iconName='CheckIcon'
          />
        </i>
      </div>
      {label}
    </label>
  );
}
