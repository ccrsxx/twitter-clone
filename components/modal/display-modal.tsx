import { ProfilePicture } from '@components/ui/profile-picture';
import { VerifiedName } from '@components/ui/verified-name';
import { InputThemeRadio } from '@components/input/input-theme-radio';
import { Button } from '@components/ui/button';
import { InputAccentRadio } from '@components/input/input-accent-radio';
import type { Theme, Accent } from '@lib/context/theme-context';

type DisplayModalProps = {
  closeModal: () => void;
};

const themes: [Theme, string][] = [
  ['light', 'Default'],
  ['dim', 'Dim'],
  ['dark', 'Lights out']
];

const accentsColor: Accent[] = [
  'blue',
  'yellow',
  'pink',
  'purple',
  'orange',
  'green'
];

export function DisplayModal({ closeModal }: DisplayModalProps): JSX.Element {
  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='flex flex-col gap-3 text-center'>
        <h2 className='text-2xl font-bold'>Customize your view</h2>
        <p className='text-light-secondary dark:text-dark-secondary'>
          These settings affect all the Twitter accounts on this browser.
        </p>
      </div>
      <article className='mx-8 rounded-2xl border border-dark-border px-4 py-3'>
        <div className='grid grid-cols-[auto,1fr] gap-3'>
          <ProfilePicture
            src='/assets/twitter-profile.jpg'
            alt='Twitter'
            username='#'
            disableLink
          />
          <div>
            <div className='flex gap-1'>
              <VerifiedName verified>
                <p className='font-bold'>Twitter</p>
              </VerifiedName>
              <p className='text-light-secondary dark:text-dark-secondary'>
                @twitter
              </p>
              <div className='flex gap-1 text-light-secondary dark:text-dark-secondary'>
                <i>·</i>
                <p>26m</p>
              </div>
            </div>
            <p className='whitespace-pre-line break-words'>
              At the heart of Twitter are short messages called Tweets — just
              like this one — which can include photos, videos, links, text,
              hashtags, and mentions like{' '}
              <span className='text-main-accent'>@twitter</span>.
            </p>
          </div>
        </div>
      </article>
      <div className='flex w-full flex-col gap-1'>
        <p className='text-sm font-bold text-light-secondary dark:text-dark-secondary'>
          Color
        </p>
        <div className='hover-animation flex justify-around rounded-2xl bg-main-sidebar-background py-3'>
          {accentsColor.map((accentColor) => (
            <InputAccentRadio type={accentColor} key={accentColor} />
          ))}
        </div>
      </div>
      <div className='flex w-full flex-col gap-1'>
        <p className='text-sm font-bold text-light-secondary dark:text-dark-secondary'>
          Background
        </p>
        <div
          className='hover-animation grid grid-cols-3 gap-3 rounded-2xl
                     bg-main-sidebar-background px-4 py-3'
        >
          {themes.map(([themeType, label]) => (
            <InputThemeRadio type={themeType} label={label} key={themeType} />
          ))}
        </div>
      </div>
      <Button
        className='bg-main-accent px-4 py-1.5 font-bold
                   text-white hover:bg-main-accent/90 active:bg-main-accent/75'
        onClick={closeModal}
      >
        Done
      </Button>
    </div>
  );
}
