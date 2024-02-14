import { getRandomEmoji } from "$functions/emoji.ts";

export default function Home() {
  return (
  <div class="w-screen h-screen flex items-center justify-center text-8xl">
    <p>{ getRandomEmoji() }</p>
  </div>
  );
}
