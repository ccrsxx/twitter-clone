const footerLinks = [
  ['About', 'https://'],
  ['Help Center', 'https://'],
  ['Privacy Policy', 'https://'],
  ['Cookie Policy', 'https://'],
  ['Accessibility', 'https://'],
  [
    'Ads Info',
    'https://'
  ],
  ['Blog', 'https://'],
  ['Status', 'https://'],
  ['Careers', 'https://'],
  ['Brand Resources', 'https://'],
  ['Advertising', 'https://'],
  ['Marketing', 'https://'],
  ['VOX for Business', 'https://'],
  ['Developers', 'https://'],
  ['Directory', 'https://'],
  ['Settings', 'https://']
] as const;

export function LoginFooter(): JSX.Element {
  return (
    <footer className='hidden justify-center p-4 text-sm text-light-secondary dark:text-dark-secondary lg:flex'>
      <nav className='flex flex-wrap justify-center gap-4 gap-y-2'>
        {footerLinks.map(([linkName, href]) => (
          <a
            className='custom-underline'
            target='_blank'
            rel='noreferrer'
            href={href}
            key={linkName}
          >
            {linkName}
          </a>
        ))}
        <p>© 2025 VOX Social</p>
      </nav>
    </footer>
  );
}
