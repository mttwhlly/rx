import { expect, waitFor, within } from "@storybook/test";

export async function withinShadowRoot(customElement, selector) {
  const webc = customElement.querySelector(selector);

  await waitFor(
    () => {
      const shadowRootFirstEl = webc.shadowRoot.firstElementChild;
      return expect(shadowRootFirstEl).toContainElement(shadowRootFirstEl);
    },
    { timeout: 1000 },
  );

  // force type HTMLElement to ignore the type checking of the "within" function
  return within(webc.shadowRoot);
}

export function SetFieldDirty(obj) {
  console.warn("Please remove this function as soon as possible.");
}
