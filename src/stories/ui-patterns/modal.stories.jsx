import { Modal, ModalPlayground } from "../../april/components/Modal.jsx";
import { MODAL_MD_CONTENT, MODAL_SIZES } from "../../april/renderers/modal.js";

const mdDescription =
  "A secondary description line which is optional, but can be used to add a contextual help text.";

export default {
  title: "UI Patterns/Modal",
  tags: ["autodocs"],
  component: Modal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Modal UI pattern (Figma 456:6660). sm — confirmation (400px). md/lg — content slots. Filter, change status, and change plan use lg (600px).",
      },
    },
  },
  argTypes: {
    size: { control: { type: "inline-radio" }, options: MODAL_SIZES, table: { category: "Properties" } },
    mdContent: {
      name: "modal-container",
      control: { type: "inline-radio" },
      options: MODAL_MD_CONTENT,
      table: { category: "Properties" },
      if: { arg: "size", neq: "sm" },
    },
    showConfirmInput: {
      name: "show confirm-input",
      control: "boolean",
      table: { category: "Properties" },
      if: { arg: "size", eq: "sm" },
    },
    title: { name: "modal title", control: "text", table: { category: "Properties" } },
    icon: { control: "text", table: { category: "Properties" } },
    showDescription: { name: "show description", control: "boolean", table: { category: "Properties" } },
    description: { control: "text", table: { category: "Properties" }, if: { arg: "showDescription" } },
    cancel: { name: "cancel label", control: "text", table: { category: "Properties" } },
    confirm: { name: "confirm label", control: "text", table: { category: "Properties" } },
    confirmPlaceholder: {
      name: "confirm placeholder",
      control: "text",
      table: { category: "Properties" },
      if: { arg: "showConfirmInput" },
    },
    showReset: {
      name: "show reset",
      control: "boolean",
      table: { category: "Properties" },
      if: { arg: "size", neq: "sm" },
    },
    resetLabel: {
      name: "reset label",
      control: "text",
      table: { category: "Properties" },
      if: { arg: "showReset" },
    },
  },
};

export const Playground = {
  args: {
    size: "sm",
    mdContent: "empty",
    showConfirmInput: true,
    title: "Modal Title?",
    icon: "delete",
    showDescription: true,
    description: mdDescription,
    cancel: "Cancel",
    confirm: "Delete",
    confirmPlaceholder: "Confirm",
    showReset: true,
    resetLabel: "Reset All",
  },
  render: (args) => <ModalPlayground {...args} />,
};

export const MdEmpty = {
  name: "md · Empty slot (400px)",
  args: { size: "md", mdContent: "empty", showDescription: true, description: mdDescription },
  render: (args) => <ModalPlayground {...args} />,
};

export const LgFilter = {
  name: "lg · Filter (600px)",
  args: { size: "lg", mdContent: "filter", showDescription: true, description: mdDescription },
  render: (args) => <ModalPlayground {...args} />,
};

export const LgChangeStatus = {
  name: "lg · Change status (600px)",
  args: {
    size: "lg",
    mdContent: "change-status",
    showDescription: true,
    description: "Choose a new status.",
    title: "Change Status",
    icon: "info",
    confirm: "Update Status",
    showReset: false,
  },
  render: (args) => <ModalPlayground {...args} />,
};

export const LgChangePlan = {
  name: "lg · Change plan (600px)",
  args: {
    size: "lg",
    mdContent: "change-plan",
    showDescription: true,
    description: "Choose a new plan.",
    title: "Change Plan",
    icon: "credit_card",
    confirm: "Update Plan",
    showReset: false,
  },
  render: (args) => <ModalPlayground {...args} />,
};
