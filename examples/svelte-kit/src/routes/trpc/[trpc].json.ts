import * as trpc from '@trpc/server';
import type http from 'http';
import * as z from 'zod';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import { resolveRequest } from '@trpc/server';
// eslint-disable-next-line @typescript-eslint/ban-types
export type Context = {};

const createContext = ({
  req,
  res,
}: trpc.CreateHttpContextOptions): Context => {
  return {};
};

function createRouter() {
  return trpc.router<Context>();
}
// Important: only use this export with SSR/SSG
export const appRouter = createRouter()
  // Create procedure at path 'hello'
  .query('hello', {
    // using zod schema to validate and infer input values
    input: z
      .object({
        text: z.string().optional(),
      })
      .optional(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  });

// Exporting type _type_ AppRouter only exposes types that can be used for inference
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
export type AppRouter = typeof appRouter;

const handler = trpc.createHttpHandler({
  router: appRouter,
  createContext,
  path: '/trpc',
});

export const get: RequestHandler<Locals> = async (req) => {
  const res = await resolveRequest({
    req,
    res: null,
    router: appRouter,
    path: req.params.trpc,
    createContext() {
      return {};
    },
  });
  return res;
};
