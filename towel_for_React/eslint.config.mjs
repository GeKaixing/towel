import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import eslintConfigPrettier from "eslint-config-prettier";
import typescriptplugin from '@typescript-eslint/eslint-plugin'
import typescriptparser from  "@typescript-eslint/parser"
export default [
  { files: ["**/*.{js,mjs,cjs,jsx,tsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReactConfig,
  eslintConfigPrettier,// 添加 Prettier 的 ESLint 配置
  typescriptplugin,
  typescriptparser
];
