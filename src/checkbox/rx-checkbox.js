// Import Lit and html
import { LitElement, html, css } from "lit";

class RxCheckbox extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      padding-left: 35px;
      margin-bottom: 12px;
      cursor: pointer;
      font-size: 22px;
      user-select: none;
    }

    :host input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    :host span {
      position: absolute;
      top: 0;
      left: 0;
      height: 16px;
      width: 16px;
      background-color: #fff;
      border: 2px solid #0027cd;
      border-radius: 4px;
    }

    :host:hover input ~ span {
      background-color: #fff;
      border: 2px solid #0027cd;
      border-radius: 4px;
    }

    :host input:checked ~ span {
      background-color: #0027cd;
      border: 2px solid #0027cd;
      border-radius: 4px;
    }

    /* Style the checkmark/indicator */
    :host span:after {
      content: "";
      position: absolute;
      display: none;
    }

    :host input:checked ~ span:after {
      display: block;
    }

    :host span:after {
      left: 4px;
      top: 0px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  `;

  static get properties() {
    return {
      checked: { type: Boolean },
      label: { type: String },
    };
  }

  constructor() {
    super();
    this.checked = false;
    this.label = "";
  }

  render() {
    return html`
      <label>
        <input
          type="checkbox"
          role="checkbox"
          tabindex="0"
          ?disabled="${this.disabled}"
          aria-label="${this.label}"
          aria-checked="${this.checked}"
          aria-disabled="${this.disabled}"
          ?checked="${this.checked}"
          @change="${this._onChange}"
          data-testid="checkbox"
        /><span> ${this.label} </span>
      </label>
    `;
  }

  _onChange(e) {
    this.checked = e.target.checked;
    this.dispatchEvent(
      new CustomEvent("change", { detail: { checked: this.checked } })
    );
  }
}

// Define the new element
customElements.define("rx-checkbox", RxCheckbox);
