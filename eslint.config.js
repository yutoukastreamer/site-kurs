import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

/* Локальное правило jsx-uses-vars.
   Базовое no-unused-vars не засчитывает использование переменной в JSX-теге
   вида <motion.div> (JSXMemberExpression), из-за чего импорт motion ошибочно
   помечается как неиспользуемый. Правило проходит по каждому JSX-тегу и
   помечает его корневой идентификатор как использованный. */
const localPlugin = {
  rules: {
    'jsx-uses-vars': {
      create(context) {
        return {
          JSXOpeningElement(node) {
            let name = node.name
            while (name && name.type === 'JSXMemberExpression') {
              name = name.object
            }
            if (name && name.type === 'JSXIdentifier') {
              context.sourceCode.markVariableAsUsed(name.name, name)
            }
          },
        }
      },
    },
  },
}

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      local: localPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'local/jsx-uses-vars': 'error',
    },
  },
  /* Конфиги Vite выполняются в Node — нужны его глобалы (process и т.п.) */
  {
    files: ['vite.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
])
