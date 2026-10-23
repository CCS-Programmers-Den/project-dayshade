import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next";

const eslintConfig = defineConfig([
  ...next,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
