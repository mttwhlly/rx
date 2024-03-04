import { html } from "lit";
import "./wc-checkbox.js";

export default {
  title: "Checkbox (HTML)",
  component: "custom-checkbox",
};

export const Default = ({ label, checked }) => {
  return html`
    <custom-checkbox
      label="${label}"
      ${checked ? "checked" : ""}
    ></custom-checkbox>
  `;
};
Default.args = {
  label: "Default",
  checked: false,
};

export const Checked = ({ label, checked }) => {
  return html`
    <custom-checkbox
      label="${label}"
      checked="${checked ? "checked" : ""}"
    ></custom-checkbox>
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
  render: () => html` <custom-checkbox label="Testing"></custom-checkbox> `,
  argTypes: {
    checked: false,
    label: "Testing",
  },
  play: async ({ canvasElement }) => {
    const wc = await withinShadowRoot(canvasElement, "custom-checkbox");
    const checkbox = wc.getByTestId("checkbox");

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  },
};
