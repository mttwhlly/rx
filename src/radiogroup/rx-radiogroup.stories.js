/**
 * This is a boilerplate file for creating a new storybook story.
 * Replace the placeholders with the appropriate values.
 * Remove the comments and TODOs as you go.
 *
 */

// Import required dependencies
import { html } from "lit";
// TODO: add imports here (uncomment @storybook/test if needed else remove)
// import { userEvent, fn, expect } from "@storybook/test";

// Import the shadow root helper
import { withinShadowRoot } from "../helpers";

// Import the custom checkbox component
// TODO: update to reflect desired component
import "./rx-radiogroup.js";

// Define the story
// TODO: update title, component and other fields as needed
export default {
  title: "Primitives/Radio Group",
  component: "rx-radiogroup",
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

// TODO: update args as needed
export const Default = ({ label }) => {
  return html` <rx-radiogroup label="${label}"></rx-radiogroup> `;
};
Default.args = {
  label: "Radio Group",
};

/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const Testing = ({}) => {
  return html` <rx-radiogroup></rx-radiogroup> `;
};
Testing.args = {
  // TODO: add args here
};
Testing.play = async ({ canvasElement, step }) => {
  const wc = await withinShadowRoot(canvasElement, "rx-radiogroup");

  const component = wc.getByTestId("rx-radiogroup");

  // TODO: add play function here
};
