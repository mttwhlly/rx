/**
 * Represents a radio group.
 * @class RxRadioGroup
 * @extends {LitElement}
 *
 * @property {string} label - The label for the radio group
 * @property {Array} options - The options for the radio group
 * @property {string} value - The value of the radio group
 * @property {boolean} disabled - Indicates if the radio group is disabled
 * @property {string} name - The name of the radio group
 * @property {string} id - The id of the radio group
 * @property {boolean} required - Indicates if the radio group is required
 *
 */

// Import Lit
import { LitElement, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";

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

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static properties = {
    label: { type: String },
    options: { type: Array },
    value: { type: String },
    id: { type: String },
    name: { type: String },
  };

  constructor() {
    super();
    this.options = ["Option 1", "Option 2", "Option 3"];
    this.value = "";
  }

  render() {
    return html`
      <label for="${this.label}">${this.label}</label>
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
        newIndex =
          currentIndex > 0 ? currentIndex - 1 : this.options.length - 1;
      } else {
        newIndex =
          currentIndex < this.options.length - 1 ? currentIndex + 1 : 0;
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
