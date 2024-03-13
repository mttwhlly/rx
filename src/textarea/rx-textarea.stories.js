// Import required dependencies
import { userEvent, fn, expect } from "@storybook/test";
import { html, nothing } from "lit";

// Import the shadow root helper
import { withinShadowRoot } from "../helpers";

// Import the custom checkbox component
import "./rx-textarea.js";

// Define the story
export default {
  title: "Primitives/Textarea",
  component: "rx-textarea",
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

export const Default = ({
  label,
  id,
  placeholder,
  disabled,
  minlength,
  maxlength,
}) => {
  return html`
    <rx-textarea
      label="${label}"
      id="${id}"
      placeholder="${placeholder}"
      disabled="${disabled ? "disabled" : nothing}"
      minlength="${minlength}"
      maxlength="${maxlength}"
    ></rx-textarea>
  `;
};
Default.args = {
  label: "This is a Label",
  id: "default",
  placeholder: "This is a placeholder",
  disabled: false,
  minlength: 0,
  maxlength: 10,
};

export const Disabled = ({
  label,
  id,
  placeholder,
  disabled,
  minlength,
  maxlength,
}) => {
  return html`
    <rx-textarea
      label="${label}"
      placeholder="${placeholder}"
      disabled="${disabled ? "disabled" : nothing}"
      minlength="${minlength}"
      maxlength="${maxlength}"
    ></rx-textarea>
  `;
};
Disabled.args = {
  label: "This is a Label",
  id: "disabled",
  placeholder: "This is a placeholder",
  disabled: true,
  minlength: 0,
  maxlength: 10,
};

/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const Testing = ({
  label,
  id,
  placeholder,
  disabled,
  minlength,
  maxlength,
}) => {
  return html`
    <rx-textarea
      label="${label}"
      placeholder="${placeholder}"
      disabled="${disabled ? "disabled" : nothing}"
      minlength="${minlength}"
      maxlength="${maxlength}"
      id="${id}"
    ></rx-textarea>
  `;
};
Testing.args = {
  label: "Testing",
  id: "Testing",
  placeholder: "",
  disabled: false,
  minlength: 0,
  maxlength: 10,
};
Testing.play = async ({ canvasElement }) => {
  const wc = await withinShadowRoot(canvasElement, "rx-textarea");
  const textarea = wc.getByTestId("rx-textarea");

  await userEvent.click(textarea);
  await userEvent.type(textarea, "Test");

  await expect(textarea).toHaveValue("Test");
};
