# Vite React Starter

## Features

-   [Vite](https://vitejs.dev/)
-   [React](https://reactjs.org/)
-   [TypeScript]https://www.typescriptlang.org/
-   [pnpm](https://pnpm.io/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io/)

## Setup

1. `pnpm create vite@latest`
2. `pnpm install`
3. `pnpm install -D rimraf npm-run-all`
4. `pnpm install -D tailwindcss postcss autoprefixer @tailwindcss/forms`
5. `pnpm install -D giacomoferretti/postcss-color-rgb-tailwind`
6. `pnpm exec tailwindcss init -p`
7. Add this to `index.html` in `<head>`

    ```html
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    ```

8. Edit `tailwind.config.js`

    ```diff
    /** @type {import("tailwindcss").Config} */

    +const defaultTheme = require("tailwindcss/defaultTheme");

    module.exports = {
    +   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
        theme: {
            extend: {
    +           fontFamily: {
    +               sans: ["Inter var", ...defaultTheme.fontFamily.sans],
    +           },
            },
        },
    +   plugins: [require("@tailwindcss/forms")],
    };
    ```

9. Edit `src/index.css`

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer base {
        html,
        body,
        #root {
            @apply h-full;
        }
    }
    ```

10. Add `postcss-color-rgb-tailwind` to `postcss.config.js`

    ```js
    module.exports = {
        plugins: {
            "tailwindcss": {},
            "autoprefixer": {},
            "postcss-color-rgb-tailwind": {},
        },
    };
    ```

11. `pnpm install -D prettier @trivago/prettier-plugin-sort-imports prettier-plugin-tailwindcss`
12. Create `.editorconfig`

    ```ini
    root = true

    [*]
    indent_style = space
    indent_size = 2
    end_of_line = lf
    charset = utf-8
    trim_trailing_whitespace = true
    insert_final_newline = true

    [*.{md,txt}]
    indent_size = 4
    trim_trailing_whitespace = false
    ```

13. Create `prettier.config.cjs`

    ```js
    module.exports = {
        plugins: [require("./plugins/prettier-tailwind-sort-fix/index.cjs")],
        bracketSameLine: true,
        quoteProps: "consistent",
        importOrder: ["^@/(.*)$", "^[./]"],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true,
    };
    ```

14. `pnpm install -D vite-tsconfig-paths`
15. Add custom paths to `tsconfig.json`

    ```diff
        "references": [{ "path": "./tsconfig.node.json" }],
    +   "extends": "./tsconfig.paths.json"
    }
    ```

16. Create `tsconfig.paths.json`

    ```json
    {
        "compilerOptions": {
            "baseUrl": ".",
            "paths": {
                "@/*": ["src/*"]
            }
        }
    }
    ```

17. Edit `vite.config.ts`

    ```diff
    import react from "@vitejs/plugin-react";
    import { defineConfig } from "vite";
    +import tsconfigPaths from "vite-tsconfig-paths";

    // https://vitejs.dev/config/
    export default defineConfig({
    +    plugins: [react(), tsconfigPaths()],
    });
    ```
