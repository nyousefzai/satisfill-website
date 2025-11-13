import { defineConfig } from "@openapi-codegen/cli";
import {
  generateReactQueryComponents,
  generateSchemaTypes,
} from "@openapi-codegen/typescript";

export default defineConfig({
  default: {
    from: {
      source: "file",
      relativePath: "./public/openapi.json",
    },
    outputDir: "generated/api",
    to: async (context) => {
      const filenamePrefix = "";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
        useEnums: true,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
