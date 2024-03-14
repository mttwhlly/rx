/*
 * This is a boilerplate for creating a new Lit component.
 * Replace the placeholders with the appropriate values.
 * Remove the comments and TODOs as you go.
 */

// Import Lit
import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined";
import { live } from "lit/directives/live";
import { classMap } from "lit/directives/class-map";
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
              name="${ifDefined(this.label)}"
              value="${option}"
              .checked=${live(this.value === option)}
              @change=${this._updateValue}
              @keydown=${this._handleKeyDown}
              @focus=${this._handleFocus}
              @blur=${this._handleBlur}
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

  _handleKeyDown(e) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const currentIndex = this.options.indexOf(this.value);
      let newIndex;
      if (e.key === "ArrowUp") {
        newIndex = currentIndex > 0 ? currentIndex - 1 : this.options.length - 1;
      } else {
        newIndex = currentIndex < this.options.length - 1 ? currentIndex + 1 : 0;
      }
      this.value = this.options[newIndex];
      this.dispatchEvent(
        new CustomEvent("value-changed", { detail: { value: this.value } }),
      );
    }
  }

  _handleFocus(e) {
    e.target.parentElement.classList.add("focused");
  }

  _handleBlur(e) {
    e.target.parentElement.classList.remove("focused");
  }
}

// Define the new element
// TODO: define the new element
customElements.define("rx-radiogroup", RxRadioGroup);
