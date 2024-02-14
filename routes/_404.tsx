import { Head } from "$fresh/runtime.ts";
import { getRandomEmoji } from "$functions/emoji.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div class="h-screen w-screen flex flex-col items-center justify-center">
        {/* <h1 class="text-5xl font-extrabold">404</h1> */}
        <p class="text-6xl">{ getRandomEmoji('angry') }</p>
        <p class="text-xl font-bold">What The Fuck are you doing!!!</p>
      </div>
    </>
  );
}
