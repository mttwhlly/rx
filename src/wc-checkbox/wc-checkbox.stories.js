import { html } from "lit";
import "./wc-checkbox.js";

export default {
  title: "Checkbox (HTML)",
  component: "custom-checkbox",
};

export const Default = {
  render() {
    return html` <custom-checkbox label="Default"></custom-checkbox> `;
  },
};
