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
      height: 25px;
      width: 25px;
      background-color: #eee;
    }

    :host:hover input ~ span {
      background-color: #ccc;
    }

    :host input:checked ~ span {
      background-color: #2196f3;
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
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  `;

  render() {
    return html`
      <label>
        <input type="checkbox" @change="${this._onChange}" />
        <span></span>
      </label>
    `;
  }

  _onChange(e) {
    this.dispatchEvent(new CustomEvent("change", { detail: e.target.checked }));
  }
}

// Define the new element
customElements.define("rx-checkbox", RxCheckbox);
