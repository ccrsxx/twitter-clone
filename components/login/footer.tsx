const footerLinks = [
  ['About', '#'],
  ['Help Center', '#'],
  ['Privacy Policy', '#'],
  ['Cookie Policy', '#'],
  ['Accessibility', '#'],
  ['Ads Info', '#'],
  ['Blog', '#'],
  ['Status', '#'],
  ['Careers', '#'],
  ['Brand Resources', '#'],
  ['Advertising', '#'],
  ['Twitter for Business', '#'],
  ['Developers', '#'],
  ['Directory', '#'],
  ['Settings', '#']
];

export function Footer(): JSX.Element {
  return (
    <footer className='grid gap-2 p-2 text-center text-sm text-secondary'>
      <nav className='flex flex-wrap justify-center gap-4'>
        {footerLinks.map(([linkName, href]) => (
          <a
            className='custom-underline outline-none focus-visible:decoration-inherit'
            target='_blank'
            rel='noreferrer'
            href={href}
            key={linkName}
          >
            {linkName}
          </a>
        ))}
      </nav>
      <p>© 2022 Twitter, Inc.</p>
    </footer>
  );
}
