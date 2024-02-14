import { FreshContext } from "$fresh/server.ts";
import { getRedirectUrl } from "$functions/social-media.ts";

export function handler(req: Request, ctx: FreshContext): Response | Promise<Response> {
  const sosmed = getRedirectUrl(new URL(req.url).pathname);
  if (sosmed) {
    return Response.redirect(sosmed);
  }
  return new Promise((resolve, reject) => {
    ctx.next()
      .then(res => resolve(res))
      .catch(e => reject(e));
  });
}
