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
    let emoji = '😘';
    if (random) {
      emoji = getRandomEmoji();
    };
    return await fetch('https://emoji.aranja.com/' + emoji);
  }

  return await ctx.next();
}
