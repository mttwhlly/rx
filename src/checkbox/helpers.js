import { expect } from "@storybook/jest";
import { waitFor, within } from "@testing-library/dom";

export async function withinShadowRoot(customElement, selector) {
  const webc = customElement.querySelector(selector);

  await waitFor(
    () => {
      const shadowRootFirstEl = webc.shadowRoot.firstElementChild;
      return expect(shadowRootFirstEl).toContainElement(shadowRootFirstEl);
    },
    { timeout: 1000 }
  );

  // force type HTMLElement to ignore the type checking of the "within" function
  return within(webc.shadowRoot);
}
