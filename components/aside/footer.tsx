const footerLinks = [
  ['Terms of Service', 'https://twitter.com/tos'],
  ['Privacy Policy', 'https://twitter.com/privacy'],
  ['Cookie Policy', 'https://support.twitter.com/articles/20170514'],
  ['Accessibility', 'https://help.twitter.com/resources/accessibility'],
  [
    'Ads Info',
    'https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html'
  ]
];

export function Footer(): JSX.Element {
  return (
    <footer className='flex flex-col gap-3 text-center inner:text-sm inner:text-secondary'>
      <nav className='flex flex-wrap justify-center gap-2'>
        {footerLinks.map(([linkName, href]) => (
          <a
            className='custom-underline outline-none focus-visible:decoration-inherit'
            href={href}
            key={href}
          >
            {linkName}
          </a>
        ))}
      </nav>
      <p>© 2022 Twitter, Inc.</p>
    </footer>
  );
}
