/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/stories/**/*.stories.@(js|jsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    config.server ??= {};
    config.server.watch ??= {};
    const ignored = config.server.watch.ignored;
    const extra = ["**/examples/**", "**/dist/**"];
    config.server.watch.ignored = Array.isArray(ignored) ? [...ignored, ...extra] : extra;
    return config;
  },
};

export default config;
