import * as SolidIcons from '@heroicons/react/24/solid';
import * as OutlineIcons from '@heroicons/react/24/outline';

export type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

type HeroIconProps = {
  iconName: IconName;
  className?: string;
  solid?: boolean;
};

export function HeroIcon({
  iconName,
  className,
  solid
}: HeroIconProps): JSX.Element {
  // eslint-disable-next-line import/namespace
  const Icon = solid ? SolidIcons[iconName] : OutlineIcons[iconName];

  return <Icon className={className ?? 'h-6 w-6'} />;
}
