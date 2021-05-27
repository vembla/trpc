import * as trpcServer from '../../server/src';
jest.mock('@trpc/server', () => trpcServer);
import * as trpcClient from '../../client/src';
jest.mock('@trpc/client', () => trpcClient);
import * as trpcReact from '../../react/src';
jest.mock('@trpc/react', () => trpcReact);
import * as trpcReact__ssg from '../../react/src/ssg';
jest.mock('@trpc/react/ssg', () => trpcReact__ssg);
import superjson from 'superjson';
import devalue from 'devalue';
import { z } from 'zod';
import { routerToServerAndClient } from './_testHelpers';

test('superjson up and down', async () => {
  const transformer = superjson;

  const date = new Date();
  const fn = jest.fn();
  const { client, close } = routerToServerAndClient(
    trpcServer.router().query('hello', {
      input: z.date(),
      resolve({ input }) {
        fn(input);
        return input;
      },
    }),
    {
      client: { transformer },
      server: { transformer },
    },
  );
  const res = await client.query('hello', date);
  expect(res.getTime()).toBe(date.getTime());
  expect((fn.mock.calls[0][0] as Date).getTime()).toBe(date.getTime());

  close();
});

test('devalue up and down', async () => {
  const transformer: trpcServer.DataTransformer = {
    serialize: (object) => devalue(object),
    deserialize: (object) => eval(`(${object})`),
  };

  const date = new Date();
  const fn = jest.fn();
  const { client, close } = routerToServerAndClient(
    trpcServer.router().query('hello', {
      input: z.date(),
      resolve({ input }) {
        fn(input);
        return input;
      },
    }),
    {
      client: { transformer },
      server: { transformer },
    },
  );
  const res = await client.query('hello', date);
  expect(res.getTime()).toBe(date.getTime());
  expect((fn.mock.calls[0][0] as Date).getTime()).toBe(date.getTime());

  close();
});

test('superjson up and devalue down', async () => {
  const transformer: trpcServer.CombinedDataTransformer = {
    input: superjson,
    output: {
      serialize: (object) => devalue(object),
      deserialize: (object) => eval(`(${object})`),
    },
  };

  const date = new Date();
  const fn = jest.fn();
  const { client, close } = routerToServerAndClient(
    trpcServer.router().query('hello', {
      input: z.date(),
      resolve({ input }) {
        fn(input);
        return input;
      },
    }),
    {
      client: { transformer },
      server: { transformer },
    },
  );
  const res = await client.query('hello', date);
  expect(res.getTime()).toBe(date.getTime());
  expect((fn.mock.calls[0][0] as Date).getTime()).toBe(date.getTime());

  close();
});

test('all transformers running in correct order', async () => {
  const world = 'foo';
  const fn = jest.fn();

  const transformer: trpcServer.CombinedDataTransformer = {
    input: {
      serialize: (object) => {
        fn('client:serialized');
        return object;
      },
      deserialize: (object) => {
        fn('server:deserialized');
        return object;
      },
    },
    output: {
      serialize: (object) => {
        fn('server:serialized');
        return object;
      },
      deserialize: (object) => {
        fn('client:deserialized');
        return object;
      },
    },
  };

  const { client, close } = routerToServerAndClient(
    trpcServer.router().query('hello', {
      input: z.string(),
      resolve({ input }) {
        fn(input);
        return input;
      },
    }),
    {
      client: { transformer },
      server: { transformer },
    },
  );
  const res = await client.query('hello', world);
  expect(res).toBe(world);
  expect(fn.mock.calls[0][0]).toBe('client:serialized');
  expect(fn.mock.calls[1][0]).toBe('server:deserialized');
  expect(fn.mock.calls[2][0]).toBe(world);
  expect(fn.mock.calls[3][0]).toBe('server:serialized');
  expect(fn.mock.calls[4][0]).toBe('client:deserialized');

  close();
});
