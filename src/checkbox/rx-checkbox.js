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

// Import Lit
import { LitElement, html, css, nothing } from "lit";

// TODO: remove this for use in app (and as soon as possible once alternative dirty approach used)
import { SetFieldDirty } from "../helpers";


class RxCheckbox extends LitElement {
  static styles = css`
    /* styles omitted for brevity */
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
          @keydown="${this.onKeyDown}"
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

  /**
   * Handles the keydown event of the checkbox.
   * @param {KeyboardEvent} e - The keydown event
   */
  onKeyDown(e) {
    if (e.key === "Enter" || e.key === "Space") {
      e.preventDefault();
      this.checked = !this.checked;
      this.dirty = true;
      this.value = this.checked;
      this.dispatchEvent(
        // bubble since change is not a composed event
        new Event("change", { bubbles: true }),
      );
      // Call the `SetFieldDirty` global jQuery function
      // TODO: determine whether this is the best way to do this and if not, refactor
      SetFieldDirty(this);
    }
  }
}

// Define the new element
customElements.define("rx-checkbox", RxCheckbox);
