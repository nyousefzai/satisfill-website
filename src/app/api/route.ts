import { docsRoute } from "next-rest-framework";

export const { GET } = docsRoute({
  openApiObject: {
    info: {
      title: "My API",
      version: "1.0.0",
      description: "My API description.",
    },
    // ...
  },
  docsConfig: {
    provider: "swagger-ui",
    title: "My API",
    description: "My API description.",
  },
});

export const dynamic = "force-dynamic";
