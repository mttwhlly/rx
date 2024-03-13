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
        display: flex;
        flex-direction: column-reverse;
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
      textarea:disabled ~ label {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `;
  }

  render() {
    return html`
      <textarea
        id="${this.id}"
        placeholder="${this.placeholder}"
        maxlength="${this.maxlength}"
        minlength="${this.minlength}"
        name="${this.id}"
        .value=${this.value}
        @input=${this._updateValue}
        role="textbox"
        tabindex="0"
        aria-label="${this.label}"
        aria-disabled="${this.disabled ? "true" : "false"}"
        data-testid="rx-textarea"
        ?disabled="${this.disabled}"
        isdirty="${this.dirty ? "True" : "False"}"
      ></textarea>
      <label for="${this.id}">${this.label}</label>
    `;
  }

  _updateValue(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new Event("value-changed", { detail: { value: this.value } }),
    );
  }
}

customElements.define("rx-textarea", RxTextArea);
