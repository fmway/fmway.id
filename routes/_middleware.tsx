import { FreshContext } from "$fresh/server.ts";
import { getRedirectUrl } from "$functions/social-media.ts";
import { getRandomEmoji } from "$functions/emoji.ts";

export async function handler(req: Request, ctx: FreshContext): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;
  const sosmed = getRedirectUrl(path);
  if (sosmed) {
    return Response.redirect(sosmed);
  }

  if (path === '/' && url.searchParams.has('image')) {
    const random = url.searchParams.has('random');
    const defaultEmoji = '😘';
    let emoji = defaultEmoji;
    if (random) {
      emoji = getRandomEmoji();
    };
    const res = await fetch('https://twemoji.deno.dev/api?emoji=' + encodeURI(emoji));
    return await fetch(await res.text());
  }

  return await ctx.next();
}
