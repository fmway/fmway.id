import { getRandomEmoji } from "$functions/emoji.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
interface Data {
  random?: boolean,
}

export const handler: Handlers<Data> = {
  GET(_req, ctx) {
    const params = ctx.url.searchParams;
    return ctx.render({
      random: params.has('random'),
    });
  },
};

export default function Home(props: PageProps<Data>) {
  return (
  <div class="w-screen h-screen flex items-center justify-center text-8xl">
    <p>{ props.data.random ? getRandomEmoji() : '😘' }</p>
  </div>
  );
}
