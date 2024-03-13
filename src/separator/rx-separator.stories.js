/**
 * Storybook stories for the Separator component.
 * 
 * This file contains stories that demonstrate the different states of the Separator,
 * including its default state, its vertical state, and a state used for testing. 
 * 
 */

// Import required dependencies
import { html, nothing } from "lit";
// TODO: add imports here (uncomment @storybook/test if needed else remove)
import { userEvent, fn, expect } from "@storybook/test";

// Import the shadow root helper
import { withinShadowRoot } from "../helpers";

// Import the custom checkbox component
// TODO: update to reflect desired component
import "./rx-separator.js";

// Define the story
// TODO: update title, component and other fields as needed
export default {
  title: "Primitives/Separator",
  component: "rx-separator",
  args: {
    // https://storybook.js.org/docs/essentials/actions#action-args
    // fn: fn(),
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

export const Horizontal = ({ vertical }) => {
  return html`
    <!-- Note: <div> added to view the vertical separator in the story and may be removed -->
    <div style="height: 20px;">
      <rx-separator
        vertical="${vertical ? "vertical" : nothing}"
      ></rx-separator>
    </div>
  `;
};
Horizontal.args = {
  vertical: false,
};

export const Vertical = ({ vertical }) => {
  return html`
    <!-- Note: <div> added to view the vertical separator in the story and may be removed -->
    <div style="height: 20px;">
      <rx-separator
        vertical="${vertical ? "vertical" : nothing}"
      ></rx-separator>
    </div>
  `;
};
Vertical.args = {
  vertical: true,
};

/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const Testing = ({}) => {
  return html`
    <!-- Note: <div> added to view the vertical separator in the story and may be removed -->
    <div style="height: 20px;"><rx-separator></rx-separator></div>
  `;
};
Testing.args = {
  // TODO: add args here
};
Testing.play = async ({ canvasElement, step }) => {
  const wc = await withinShadowRoot(canvasElement, "rx-separator");

  const separator = wc.getByTestId("rx-separator");

  await expect(separator).toBeTruthy();
};
