import { router, publicProcedure } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
  done: z.boolean().optional(),
});

const appRouter = router({
  createTodo: publicProcedure.input(todoInputType).mutation(async (opts) => {
    console.log("hello world");
    const title = opts.input.title;
    const description = opts.input.description;
    return {
      id: "1",
    };
  }),
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const email = opts.input.email;
      const password = opts.input.password;
      const token = "1212121";
      return {
        token,
      };
    }),
});

const server = createHTTPServer({
  router: appRouter,
});
server.listen(3000);
export type AppRouter = typeof appRouter;
