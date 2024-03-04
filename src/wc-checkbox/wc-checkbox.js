class CustomCheckbox extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._checked = false;
    this._label = "";
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = `
      <style>
      :host {
        display: block;
        position: relative;
        padding-left: 24px;
        margin-bottom: 12px;
        cursor: pointer;
        user-select: none;
        font-weight: 600;
        font-size: 14px;
        font-family: "Lato", sans-serif;
        line-height: 16px;
        text-align: left;
        letter-spacing: 0.2px;
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
        top: 1px;
        width: 3px;
        height: 6px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
      }

      :host([disabled]) {
        cursor: not-allowed;
        opacity: 0.5;  
      }
      </style>
      <label>
        <input type="checkbox" ${
          this._checked ? "checked" : ""
        } data-testid="checkbox">
        <span></span>
        ${this._label}
      </label>
      `;

    this._checkbox = this._shadowRoot.querySelector("input");
    this._checkbox.addEventListener("change", (e) => this._onChange(e));
  }

  get checked() {
    return this._checked;
  }

  set checked(val) {
    this._checked = Boolean(val);
    if (this._checkbox) this._checkbox.checked = this._checked;
  }

  get label() {
    return this._label;
  }

  set label(val) {
    this._label = val;
    if (this._shadowRoot)
      this._shadowRoot.querySelector("span").textContent = this._label;
  }

  _onChange(e) {
    this._checked = e.target.checked;
    this.dispatchEvent(
      new CustomEvent("change", { detail: { checked: this._checked } })
    );
  }
}

customElements.define("custom-checkbox", CustomCheckbox);
