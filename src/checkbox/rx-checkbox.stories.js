import { userEvent, within, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
// Import the LitElement and html function
import { html } from "lit";

// Import the shadow root helper
import { withinShadowRoot } from "./helpers";

// Import the custom checkbox component
import "./rx-checkbox.js";

// Define the story
export default {
  title: "Checkbox (LitElement)",
  component: "rx-checkbox",
};

export const Default = ({ label, checked }) => {
  return html`
    <rx-checkbox label="${label}" ${checked ? "checked" : ""}></rx-checkbox>
  `;
};
Default.args = {
  label: "Default",
  checked: false,
};

export const Checked = ({ label, checked }) => {
  return html`
    <rx-checkbox
      label="${label}"
      checked="${checked ? "checked" : ""}"
    ></rx-checkbox>
  `;
};
Checked.args = {
  label: "Checked",
  checked: true,
};

/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const Testing = {
  render: () => html` <rx-checkbox label="Testing"></rx-checkbox> `,
  argTypes: {
    checked: false,
    label: "Testing",
  },
  play: async ({ canvasElement }) => {
    const wc = await withinShadowRoot(canvasElement, "rx-checkbox");
    const checkbox = wc.getByTestId("checkbox");

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  },
};
