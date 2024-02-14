import { z } from "zod";

export interface Result<T,E> {
  unwrap(): T | never;
  unwrapOr(val: T): T;
  unwrapOrElse(fn: (e: E) => T): T;
  isOk(): boolean;
  isErr(): boolean;
}

class ResultOk<T,E> implements Result<T,E> {
  private val: T;
  constructor(val: T) {
    this.val = val;
  }
  unwrap(): T {
    return this.val;
  }
  unwrapOr(_val: T): T {
    return this.val;
  }
  unwrapOrElse(_fn: (e: E) => T): T {
    return this.val;
  }
  isOk(): boolean {
    return true;
  }
  isErr(): boolean {
    return false;
  }
}

class ResultErr<T,E> implements Result<T,E> {
  private err: E;
  constructor(err: E) {
    this.err = err;
  }
  unwrap(): never {
    throw this.err;
  }
  unwrapOr(val: T): T {
    return val;
  }
  unwrapOrElse(fn: (e: E) => T): T {
    return fn(this.err);
  }
  isOk(): boolean {
    return false;
  }
  isErr(): boolean {
    return true;
  }
}

export function Ok<T,E>(val: T): Result<T,E> {
  return new ResultOk(val);
}

export function Err<T,E>(err: E): Result<T,E> {
  return new ResultErr(err);
}

const urlSortener = z.object({
  short: z.string().min(3, { message: "Minimum character is 3" }).max(50, { message: "maximum character is 50" }),
  dest: z.string().url({ message: "The destination should be an url" }),
});

export type UrlSortener = z.infer<typeof urlSortener>;

export class Model {
  static shortUrl: (short: string, dest: string) => Result<UrlSortener, string[]> = (short, dest) => {
    const data: UrlSortener = {
      short, dest
    };
    const parsed = urlSortener.safeParse(data);
    if (parsed.success)
      return Ok(data);
    const formatError = parsed.error.format();
    const err: string[] = [...formatError._errors];
    if (formatError.dest) err.push(...formatError.dest._errors);
    if (formatError.short) err.push(...formatError.short._errors);
    return Err(err);
  }
}

const ko = Model.shortUrl("kobjir", "bjir");
console.log(ko.unwrap());











