/*
  * This is a boilerplate for creating a new Lit component.
  * Replace the placeholders with the appropriate values.
  * Remove the comments and TODOs as you go.
*/

// Import Lit
import { LitElement, html, css } from "lit";
// TODO: add imports here

// TODO: rename this component
class RxComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    // TODO: add styles here
  `;

  // TODO: uncomment if delegatesFocus is needed
  //   static shadowRootOptions = {
  //     ...LitElement.shadowRootOptions,
  //     delegatesFocus: true,
  //   };

  static properties = {
    // TODO: add properties here
  };

  constructor() {
    super();
    // TODO: add properties here
  }

  render() {
    return html`
      // TODO: add component markup here
      <div>
        <slot></slot>
      </div>
    `;
  }
}

// Define the new element
// TODO: define the new element
customElements.define("rx-component", RxComponent);
