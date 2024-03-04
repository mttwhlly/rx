import { userEvent, within, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
// Import the LitElement and html function
import { html } from "lit";

// Import the custom checkbox component
import "./rx-checkbox.js";

// Define the story
export default {
  title: "Checkbox (LitElement)",
  component: "rx-checkbox",
};

export async function withinShadowRoot(customElement, selector) {
  const webc = customElement.querySelector(selector);

  await waitFor(
    () => {
      const shadowRootFirstEl = webc.shadowRoot.firstElementChild;
      return expect(shadowRootFirstEl).toContainElement(shadowRootFirstEl);
    },
    { timeout: 1000 }
  );

  // force type HTMLElement to ignore the type checking of the "within" function
  return within(webc.shadowRoot);
}

export const Default = {
  render: () => html` <rx-checkbox></rx-checkbox> `,
  argTypes: {
    checked: false,
    disabled: false,
    label: "Default",
  },
};
/*
 * See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const Testing = {
  play: async ({ canvasElement }) => {
    const wc = await withinShadowRoot(canvasElement, "rx-checkbox");
    const checkbox = wc.getByTestId("checkbox");

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  },
};
