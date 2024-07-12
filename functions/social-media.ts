import me from "me" with { type: "json" };
type ValueType = string | null;
const socialMedia: Record<
  string, ValueType | ValueType[]
> = me["social-media"];

export const getRedirectUrl: (path: string) => string | null = (path) => {
  const r = new RegExp('^(/)?(?<name>[\\w-]+)(/(?<index>\\d+)|/)?$'); // /<social-media>/<index=0>
  const res = r.exec(path);
  if (!res) 
    return null;

  const name: string = res.groups?.name || "";
  const index: number = parseInt(res.groups?.index || '0');

  if (Object.keys(socialMedia).includes(name)) {
    let val = socialMedia[name];

    if (Array.isArray(val)) {
      if (index >= val.length)
        return null;
      val = val[index];
    } else if (index !== 0)
      return null;
    if (val) return val;
  }
  return null;
};
