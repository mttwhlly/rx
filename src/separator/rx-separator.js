/**
 * Represents a custom separator element.
 * @class RxSeparator
 * @extends LitElement
 * 
 * @property {boolean} vertical - Indicates if the separator is vertical
 * 
 */

// Import Lit
import { LitElement, html, css, nothing } from "lit";

class RxSeparator extends LitElement {
  static styles = css`
    :host {
      --color: #d8d8d8;
      --width: 1px;
      --spacing: 12px;
    }
    :host(:not([vertical])) {
      display: block;
      border-top: var(--width) solid var(--color);
      margin: var(--spacing) 0;
    }
    :host([vertical]) {
      display: inline-block;
      height: 100%;
      border-left: var(--width) solid var(--color);
      margin: 0 var(--spacing);
    }
  `;

  static properties = {
    vertical: {
      type: Boolean,
      reflect: true,
    },
  };

  constructor() {
    super();
    this.vertical = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "separator");
  }

  render() {
    return html`
      <div
        vertical="${this.vertical || nothing}"
        aria-orientation="${this.vertical ? "vertical" : "horizontal"}"
        role="separator"
        data-testid="rx-separator"
      ></div>
    `;
  }
}

// Define the new element
customElements.define("rx-separator", RxSeparator);
