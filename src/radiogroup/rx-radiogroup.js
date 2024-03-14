/*
 * This is a boilerplate for creating a new Lit component.
 * Replace the placeholders with the appropriate values.
 * Remove the comments and TODOs as you go.
 */

// Import Lit
import { LitElement, html, css } from "lit";
// TODO: add imports here

// TODO: rename this component
class RxRadioGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 16px;
    }
    label {
      display: block;
      margin-bottom: 4px;
    }
  `;

  // TODO: uncomment if delegatesFocus is needed
  //   static shadowRootOptions = {
  //     ...LitElement.shadowRootOptions,
  //     delegatesFocus: true,
  //   };

  static properties = {
    label: { type: String },
    options: { type: Array },
    value: { type: String },
  };

  constructor() {
    super();
    this.options = ["Option 1", "Option 2", "Option 3"];
    this.value = "";
  }

  render() {
    return html`
      <label>${this.label}</label>
      ${this.options.map(
        (option) => html`
          <label>
            <input
              type="radio"
              name="${this.label}"
              value="${option}"
              .checked=${this.value === option}
              @change=${this._updateValue}
              data-testid="rx-radiogroup"
            />
            ${option}
          </label>
        `,
      )}
    `;
  }
  _updateValue(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent("value-changed", { detail: { value: this.value } }),
    );
  }
}

// Define the new element
// TODO: define the new element
customElements.define("rx-radiogroup", RxRadioGroup);
