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
    </style>
        <label>
          <input type="checkbox" ${this._checked ? "checked" : ""}>
          <span>${this._label}</span>
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
