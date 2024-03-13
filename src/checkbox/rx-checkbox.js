// Import Lit and html
import { LitElement, html, css, nothing } from "lit";

// TODO: remove this for use in app (and as soon as possible once alternative dirty approach used)
import { SetFieldDirty } from "./helpers";

/**
 * Represents a checkbox.
 * @class RxCheckbox
 * @extends {LitElement}
 *
 * @property {boolean} checked - Indicates if the checkbox is checked
 * @property {string} id - The id of the checkbox
 * @property {string} name - The name of the checkbox
 * @property {string} label - The label for the checkbox
 * @property {boolean} dirty - Indicates if the checkbox has been changed
 * @property {string} value - The value of the checkbox
 * @property {boolean} disabled - Indicates if the checkbox is disabled
 */

class RxCheckbox extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      padding-left: 24px;
      margin-top: 2px;
      margin-bottom: 8px;
      cursor: pointer;
      user-select: none;
      font-weight: 400;
      font-size: 14px;
      font-family: "Lato", sans-serif;
      line-height: 16px;
      text-align: left;
      letter-spacing: 0.2px;
    }

    /* bold text if input within label is checked using :has() (https://caniuse.com/css-has) */
    :host label:has(input:checked) {
      font-weight: 700;
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
      height: 12px;
      width: 12px;
      background-color: #fff;
      border: 2px solid #0072cd;
      border-radius: 4px;
    }

    :host:hover input ~ span {
      background-color: #fff;
      border: 2px solid #0072cd;
      border-radius: 4px;
    }

    :host input:checked ~ span {
      background-color: #0072cd;
      border: 2px solid #0072cd;
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
      left: 3px;
      top: 0px;
      width: 4px;
      height: 7px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static properties = {
    // attribute reflection: https://lit.dev/docs/components/properties/#reflected-attributes
    checked: { type: Boolean, reflect: true },
    id: { type: String },
    name: { type: String },
    label: { type: String },
    dirty: { type: Boolean },
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.checked = false;
    this.id = "";
    this.name = "";
    this.label = "";
    this.dirty = false;
    this.value = "";
    this.disabled = false;
  }

  render() {
    // nothing: https://lit.dev/docs/api/templates/#nothing
    return html`
      <label id="${this.label}">
        <input
          type="checkbox"
          role="checkbox"
          tabindex="0"
          aria-checked="${this.checked ? "true" : "false"}"
          checked="${this.checked || nothing}"
          id="${this.id}"
          name="${this.name}"
          value="${this.checked}"
          @click="${this.onChange}"
          isdirty="${this.dirty ? "True" : "False"}"
          data-testid="rx-checkbox"
          ?disabled="${this.disabled}"
          aria-disabled="${this.disabled ? "true" : "false"}"
        /><span></span>
        ${this.label}
      </label>
    `;
  }

  /**
   * Handles the click event of the checkbox.
   * @param {Event} e - The click event
   */
  onChange(e) {
    this.checked = e.target.checked;
    this.dirty = true;
    this.value = e.target.checked;
    this.dispatchEvent(
      // bubble since change is not a composed event
      new Event("change", { bubbles: true }),
    );
    // Call the `SetFieldDirty` global jQuery function
    // TODO: determine whether this is the best way to do this and if not, refactor
    SetFieldDirty(this);
  }
}

// Define the new element
customElements.define("rx-checkbox", RxCheckbox);
