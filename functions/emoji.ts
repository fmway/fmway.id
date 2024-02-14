import * as emoji from "emoji";

type Emoji = 'angry' | 'happy';

export const emojies: Record<Emoji, string[]> = {
  angry: [
    emoji.get('enraged'),
    emoji.get('anger'),
    emoji.get('swearing'),
    emoji.get('middle_finger'),
  ],
  happy: [
    emoji.get('smiling_face'),
  ],
} 

// TODO
export const getRandomEmoji: (alias?: Emoji) => string = (alias?) => {
  if (!alias) return emoji.random().emoji;
  const em = emojies[alias];
  const idx = Math.floor(Math.random() * em.length);
  return em[idx];
}
