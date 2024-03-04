// Import the LitElement and html function
import { html } from "lit";

// Import the custom checkbox component
import "./rx-checkbox.js";

// Define the story
export default {
  title: "Checkbox",
};

export const Default = {
  render: () => html` <rx-checkbox></rx-checkbox> `,
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
};
