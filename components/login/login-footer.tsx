const footerLinks = [
  ['About', 'https://about.twitter.com'],
  ['Help Center', 'https://help.twitter.com'],
  ['Privacy Policy', 'https://twitter.com/tos'],
  ['Cookie Policy', 'https://support.twitter.com/articles/20170514'],
  ['Accessibility', 'https://help.twitter.com/resources/accessibility'],
  [
    'Ads Info',
    'https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html'
  ],
  ['Blog', 'https://blog.twitter.com'],
  ['Status', 'https://status.twitterstat.us'],
  ['Careers', 'https://careers.twitter.com'],
  ['Brand Resources', 'https://about.twitter.com/press/brand-assets'],
  ['Advertising', 'https://ads.twitter.com/?ref=gl-tw-tw-twitter-advertise'],
  ['Marketing', 'https://marketing.twitter.com'],
  ['Twitter for Business', 'https://business.twitter.com'],
  ['Developers', 'https://developer.twitter.com'],
  ['Directory', 'https://twitter.com/i/directory/profiles'],
  ['Settings', 'https://twitter.com/settings']
];

export function LoginFooter(): JSX.Element {
  return (
    <footer className='flex justify-center p-4 text-sm text-secondary'>
      <nav className='flex flex-wrap justify-center gap-4'>
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
        <p>© 2022 Twitter, Inc.</p>
      </nav>
    </footer>
  );
}
