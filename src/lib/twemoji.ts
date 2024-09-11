export function twemojiParse(input: string): string {
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

  let result = '';

  Array.from(input).forEach(char => {
    if (emojiRegex.test(char)) {
      const codePoints = Array.from(char)
        .map(c => c.codePointAt(0)?.toString(16))
        .filter(Boolean)
        .join('-');

      const imgUrl = `https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72/${codePoints}.png`;

      result += `<img style="height: 1em; width: 1em; margin: 0 .05em 0 .1em; vertical-align: -.1em; display: inline-block;" src="${imgUrl}" alt="${char}" style="height: 1em; width: 1em; margin: 0 .05em 0 .1em; vertical-align: -.1em; display: inline-block;" />`;
    } else result += char;
  });

  return result;
}
