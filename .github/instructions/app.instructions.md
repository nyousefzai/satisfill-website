---
applyTo: "**"
---

# Import Paths

```
DB => "@/lib/db";
Generated Prisma Stuffs => "@/prisma/*"
Apis => "@/api/*";
Tanstack Generated Api Stuffs => "@/api-query"; (Get queries, mutations and schemas)
```

# Making Api (`/api`)

- Make necessary changes in prisma schema and run `yarn db:push` to generate prisma client
- Create schema: `api/[name]/[name].schema.ts` => zod schemas and types
- Create service: `api/[name]/[name].service.ts` => business logic
- Create route: `api/[name]/route.ts` => using next-rest-framework
- For different path of route use, `api/[name]/[subpath]/route.ts`

# Making Pages (`/(ui)/...`)

- Create page: `app/(ui)/[page]/page.tsx`
- Page-local components/hooks: `app/(ui)/[page]/[component].tsx`
- Shared grouped components: `app/components/[group]/`
- Global components/hooks/utils/providers: `app/components/`, `app/hooks/`, `app/utils/`, `app/store/`
- use tailwindcss + shadcn/ui for styling
- use react-hook-form + zod for forms and validation

# Snippets

- API

```ts
// /api/todos/todo.schema.ts
export const todoSchema = z.object({
  id: z.number(),
  name: z.string(),
  completed: z.boolean(),
});

// api/todos/route.ts
import { TypedNextResponse, route, routeOperation } from "next-rest-framework";
import { z } from "zod";

const MOCK_TODOS = [
  {
    id: 1,
    name: "TODO 1",
    completed: false,
  },
  // ...
];

export const { GET, POST } = route({
  getTodos: routeOperation({
    method: "GET",
  })
    .outputs([
      {
        status: 200,
        contentType: "application/json",
        body: z.array(todoSchema),
      },
    ])
    .handler(() => {
      return TypedNextResponse.json(MOCK_TODOS, {
        status: 200,
      });
    }),

  createTodo: routeOperation({
    method: "POST",
  })
    .input({
      contentType: "application/json",
      body: z.object({
        name: z.string(),
      }),
    })
    .outputs([
      {
        status: 201,
        contentType: "application/json",
        body: z.string(),
      },
      {
        status: 401,
        contentType: "application/json",
        body: z.string(),
      },
    ])
    // Optional middleware logic executed before request validation.
    .middleware((req) => {
      if (!req.headers.get("very-secure")) {
        return TypedNextResponse.json("Unauthorized", {
          status: 401,
        });
      }
    })
    .handler(async (req) => {
      const { name } = await req.json();

      return TypedNextResponse.json(`New TODO created: ${name}`, {
        status: 201,
      });
    }),
});

// Creates /api/todos with GET and POST methods
```
