/**
 * Represents a custom textarea element with additional properties and styling.
 * @class RxTextArea
 * @extends LitElement
 *
 * @property {string} label - The label for the textarea
 * @property {string} value - The value of the textarea
 * @property {string} id - The id of the textarea
 * @property {string} placeholder - The placeholder for the textarea
 * @property {number} maxlength - The maximum length of the textarea
 * @property {number} minlength - The minimum length of the textarea
 * @property {boolean} disabled - Indicates if the textarea is disabled
 * @property {boolean} dirty - Indicates if the textarea has been changed
 *
 */

// Import Lit
import { LitElement, html, css } from "lit-element";

class RxTextArea extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      value: { type: String },
      id: { type: String },
      placeholder: { type: String },
      maxlength: { type: Number },
      minlength: { type: Number },
      disabled: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.label = "";
    this.id = "";
    this.value = "";
    this.placeholder = "";
    this.maxlength = 0;
    this.minlength = 0;
    this.disabled = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        margin-bottom: 16px;
      }
      label {
        display: block;
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: 700;
        color: #737678;
      }
      textarea {
        width: 100%;
        min-height: 60px;
        padding: 8px;
        margin-top: 6px;
        box-sizing: border-box;
        border: 2px solid #e6e6e6;
        color: #000000;
        font-weight: 700;
        font-size: 16px;
        font-family: "Lato", sans-serif;
      }
      textarea:focus {
        outline: none;
        border: 2px solid #0072cd;
      }
      textarea:disabled {
        background-color: #e6e6e6;
        cursor: not-allowed;
      }
      label:has(textarea:disabled) {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `;
  }

  render() {
    return html`
      <label for="${this.id}"
        >${this.label}
        <textarea
          id="${this.id}"
          placeholder="${this.placeholder}"
          maxlength="${this.maxlength}"
          minlength="${this.minlength}"
          name="${this.id}"
          .value=${this.value}
          @input=${this._updateValue}
          @keydown=${this._handleKeyDown}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
          role="textbox"
          tabindex="0"
          aria-label="${this.label}"
          aria-disabled="${this.disabled ? "true" : "false"}"
          data-testid="rx-textarea"
          ?disabled="${this.disabled}"
          isdirty="${this.dirty ? "True" : "False"}"
        ></textarea>
      </label>
    `;
  }

  _updateValue(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new Event("value-changed", { detail: { value: this.value } }),
    );
  }

  _handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this._submitForm();
    }
  }

  _handleFocus() {
    this.setAttribute("focused", "");
  }

  _handleBlur() {
    this.removeAttribute("focused");
  }

  _submitForm() {
    // Handle form submission logic here
  }
}

customElements.define("rx-textarea", RxTextArea);
