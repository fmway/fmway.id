import { getRandomEmoji } from "$functions/emoji.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
  emoji: string,
}

const defaultEmoji = '😘';

export const handler: Handlers<Data> = {
  GET(_req, ctx) {
    const params = ctx.url.searchParams;
    const emoji = params.has('random') ? getRandomEmoji() : defaultEmoji;
    return ctx.render({
      emoji,
    });
  },
};


export default function Home({ data }: PageProps<Data>) {
  return (
  <div class="w-screen h-screen flex items-center justify-center text-8xl">
    <p>{ data.emoji }</p>
  </div>
  );
}
