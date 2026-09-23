/** Replaced at build time from package.json. */
const version = __APRIL_VERSION__;

const FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0..1,0&display=swap";

/**
 * Vite plugin for April.
 *
 * Injects the stylesheet and the Inter + Material Symbols faces the components expect.
 *
 * ```js
 * import { aprilUi } from "april-ui/vite";
 *
 * export default defineConfig({
 *   plugins: [react(), aprilUi()],
 * });
 * ```
 *
 * @param {{ injectStyles?: boolean, injectFonts?: boolean }} [options]
 */
export function aprilUi(options = {}) {
  const injectStyles = options.injectStyles !== false;
  const injectFonts = options.injectFonts !== false;

  return {
    name: "april-ui",
    enforce: "pre",
    transformIndexHtml: {
      order: "pre",
      handler() {
        /** @type {import("vite").HtmlTagDescriptor[]} */
        const tags = [
          {
            tag: "meta",
            injectTo: "head-prepend",
            attrs: { name: "april-ui-version", content: version },
          },
        ];

        if (injectFonts) {
          tags.push(
            {
              tag: "link",
              injectTo: "head-prepend",
              attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" },
            },
            {
              tag: "link",
              injectTo: "head-prepend",
              attrs: { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
            },
            {
              tag: "link",
              injectTo: "head-prepend",
              attrs: { rel: "stylesheet", href: FONT_STYLESHEET },
            },
          );
        }

        if (injectStyles) {
          tags.push({
            tag: "script",
            injectTo: "head-prepend",
            attrs: { type: "module" },
            children: 'import "april-ui/styles.css";',
          });
        }

        return tags;
      },
    },
  };
}
