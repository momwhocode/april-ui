import React from "react";
import { MemoryRouter } from "react-router-dom";
import { bindAprilInteractions } from "../src/april/interactions/index.js";
import "../src/styles/april.css";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  decorators: [
    (Story) => {
      React.useEffect(() => {
        return bindAprilInteractions(document);
      }, []);
      return (
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    options: {
      storySort: {
        order: ["April System", "UI Patterns"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
