import { FreshContext } from "$fresh/server.ts";
import { getRedirectUrl } from "$functions/social-media.ts";
import { getRandomEmoji } from "$functions/emoji.ts";
import { nestingRequest } from "@fmway/url-shortener";

export async function handler(req: Request, ctx: FreshContext): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;
  const sosmed = getRedirectUrl(path);
  if (sosmed) {
    return Response.redirect(sosmed);
  }

  if (path.slice(0, 3) == '/s/') {
    return nestingRequest("/s/").fetch(req);
  }

  if (path === '/' && url.searchParams.has('image')) {
    const random = url.searchParams.has('random');
    const defaultEmoji = '😘';
    let emoji = defaultEmoji;
    if (random) {
      emoji = getRandomEmoji();
    };
    const res = await fetch('https://twemoji.deno.dev/api?emoji=' + encodeURI(emoji));
    const request = "https://raw.githubusercontent.com/aranja/emoji-to-png/master/static/emoji-data/img-apple-64/" + (await res.text()).split('/').reverse().at(0) || '';
    return await fetch(request);
  }

  return await ctx.next();
}
