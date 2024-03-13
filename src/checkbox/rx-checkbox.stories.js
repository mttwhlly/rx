/**
 * Storybook stories for the Checkbox component.
 *
 * This file contains stories that demonstrate the different states of the Checkbox,
 * including its default state, its checked state, its disabled state, and a state
 * used for testing.
 */

// Import required dependencies
import { userEvent, fn, expect } from "@storybook/test";
import { html, nothing } from "lit";

// Import the shadow root helper
import { withinShadowRoot } from "./helpers";

// Import the custom checkbox component
import "./rx-checkbox.js";

// Define the story
export default {
  title: "Checkbox",
  component: "rx-checkbox",
  args: {
    // https://storybook.js.org/docs/essentials/actions#action-args
    fn: fn(),
  },
  parameters: {
    // TODO: Add design addon when fix is available (https://github.com/storybookjs/addon-designs/issues/231)
    // design: {
    //   type: "figma",
    //   url: "https://www.figma.com/file/w8Lpk7RAJO79uZWWXZ8YI4/CAQH-DLS-Versions-1.5-%26-2.0?type=design&node-id=175-4080&mode=design&t=i9Mpma3fRtZEkuyz-4",
    // },
  },
  tags: ["autodocs"],
};

export const Default = ({ label, checked, name, id, disabled }) => {
  return html`
    <rx-checkbox
      label="${label}"
      checked="${checked ? "checked" : nothing}"
      name="${name}"
      id="${id}"
      disabled="${disabled ? "disabled" : nothing}"
    ></rx-checkbox>
  `;
};
Default.args = {
  label: "Default",
  checked: false,
  name: "default",
  id: "default",
  disabled: false,
};

export const Checked = ({ label, checked, name, id, disabled }) => {
  return html`
    <rx-checkbox
      label="${label}"
      checked="${checked ? "checked" : nothing}"
      name="${name}"
      id="${id}"
      disabled="${disabled ? "disabled" : nothing}"
    ></rx-checkbox>
  `;
};
Checked.args = {
  label: "Checked",
  checked: true,
  name: "default",
  id: "default",
  disabled: false,
};

export const Disabled = ({ label, checked, name, id, disabled }) => {
  return html`
    <rx-checkbox
      label="${label}"
      checked="${checked ? "checked" : nothing}"
      name="${name}"
      id="${id}"
      disabled="${disabled ? "disabled" : nothing}"
    ></rx-checkbox>
  `;
};
Disabled.args = {
  label: "Disabled",
  checked: false,
  name: "default",
  id: "default",
  disabled: true,
};

/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const Testing = ({ label, checked, name, id }) => {
  return html`
    <rx-checkbox
      label="${label}"
      checked="${checked ? "checked" : nothing}"
      name="${name}"
      id="${id}"
    ></rx-checkbox>
  `;
};
Testing.args = {
  label: "Testing",
  checked: false,
  name: "Testing",
  id: "Testing",
};
Testing.play = async ({ canvasElement }) => {
  const wc = await withinShadowRoot(canvasElement, "rx-checkbox");
  const checkbox = wc.getByTestId("rx-checkbox");

  await userEvent.click(checkbox);

  expect(checkbox).toBeChecked();
};
