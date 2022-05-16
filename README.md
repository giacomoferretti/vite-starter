# Vite Starter

## Features

-   [pnpm](https://pnpm.io/)
-   [Vite](https://vitejs.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   Fix IE <= 11 and Safari <= 11.1 RGB4 Tailwind 3.0 ([postcss-color-rgb](https://github.com/7studio/postcss-color-rgb))

## Setup

1. `pnpm create vite@latest`
2. `pnpm install`
3. `pnpm install -D tailwindcss postcss autoprefixer @tailwindcss/forms`
4. `pnpx tailwindcss init -p`
5. Edit `tailwind.config.js`

    ```diff
    + const defaultTheme = require("tailwindcss/defaultTheme");

    module.exports = {
        content: [
    +       "./index.html",
    +       "./src/**/*.{vue,js,ts,jsx,tsx}"
        ],
        theme: {
            extend: {
    +           fontFamily: {
    +               sans: ["Inter var", ...defaultTheme.fontFamily.sans],
    +           },
            },
        },
        plugins: [
    +       require("@tailwindcss/forms")
        ],
    }
    ```

6. Edit `src/index.css`

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

7. Create `.editorconfig`

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

8. `pnpm install -D rimraf`
9. Create `.prettierrc`

    ```json
    {
        "bracketSameLine": true
    }
    ```

10. Create `postcss-color-rgb-tailwind` folder.
11. Create `index.js` inside of it:

    ```js
    /**
     * @type {import('postcss').PluginCreator}
     */
    const helpers = require("postcss-message-helpers");
    const reduceFunctionCall = require("reduce-function-call");

    const parseRgbValues = (str) => {
        const values = [];
        let pos = 0;
        let depth = 0;

        str = str.trim();
        str = str.replace(/\s+/g, " ");

        for (let i = 0, length = str.length; i < length; i++) {
            const char = str[i];

            if (char === "(") {
                depth++;
            } else if (char === ")") {
                depth--;
            } else if (!depth && " ,/".indexOf(char) !== -1) {
                if (pos !== i) {
                    values.push(str.substring(pos, i));
                }

                pos = i + 1;
            }
        }

        values.push(str.substring(pos));

        return values;
    };

    module.exports = () => {
        return {
            postcssPlugin: "postcss-color-rgb-tailwind",
            Declaration(decl) {
                if (!decl.value || decl.value.search(/rgb[a]?\(/i) === -1) {
                    return;
                }

                decl.value = helpers.try(() => {
                    return reduceFunctionCall(
                        decl.value,
                        /(rgb[a]?)\(/,
                        (body, fn) => {
                            const values = parseRgbValues(body);

                            if (values.length === 4) {
                                const alpha = values.pop();
                                if (alpha.indexOf("%") === alpha.length - 1) {
                                    alpha = parseFloat(alpha) / 100;
                                }

                                values.push(alpha);

                                fn = "rgba";
                            }

                            return fn + "(" + values.join(", ") + ")";
                        }
                    );
                }, decl.source);
            },
        };
    };

    module.exports.postcss = true;
    ```

12. `pnpm install -D postcss-message-helpers reduce-function-call`
13. Edit `postcss.config.js`

    ```diff
    module.exports = {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
    +       "./postcss-color-rgb-tailwind": {},
        },
    }
    ```

14. Add this to `index.html` in `<head>`

    ```html
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    ```

15. Add custom paths to `tsconfig.json`

    ```diff
    {
        "compilerOptions": {
            "target": "ESNext",
            "useDefineForClassFields": true,
            "lib": ["DOM", "DOM.Iterable", "ESNext"],
            "allowJs": false,
            "skipLibCheck": false,
            "esModuleInterop": false,
            "allowSyntheticDefaultImports": true,
            "strict": true,
            "forceConsistentCasingInFileNames": true,
            "module": "ESNext",
            "moduleResolution": "Node",
            "resolveJsonModule": true,
            "isolatedModules": true,
            "noEmit": true,
            "jsx": "react-jsx"
        },
        "include": ["src"],
        "references": [{ "path": "./tsconfig.node.json" }],
    +   "extends": "./tsconfig.paths.json"
    }
    ```

16. `pnpm install -D vite-tsconfig-paths`

17. Create `tsconfig.paths.json`

    ```json
    {
        "compilerOptions": {
            "baseUrl": ".",
            "paths": {
                "@/*": ["src/*"],
                "@context/*": ["src/context/*"],
                "@components/*": ["src/components/*"],
                "@pages/*": ["src/pages/*"]
            }
        }
    }
    ```

18. Edit `vite.config.ts`

    ```diff
    import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";
    +import tsconfigPaths from "vite-tsconfig-paths";

    // https://vitejs.dev/config/
    export default defineConfig({
    +    plugins: [react(), tsconfigPaths()],
    });
    ```

## Structure

```
src
├── components <--- This is where components used by more than one page or module get placed.
│   ├── ...
│   ├── ...
│   └── ...
├── pages
├── parser
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```

│  
src
| │├── index.js
|│││
├── components/
| ├──── button/
| ├────── index.js
| ├────── elements.(js/css)
| ├── pages/
| ├──── homepage/
| ├──── screens/
| ├────── hero/
| ├────── index.js
| ├────── elements.(js/css)
| ├──── index.js
| ├──── elements.(js/css)
| ├── index.js
| ├── utils/
| ├──── hooks/
| ├────── useLocalStorage.js
| ├──── date.js
| ├── assets/
| ├──── icons/
| └──── images/
