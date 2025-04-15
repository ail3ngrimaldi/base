import './main.js';
import { html, css } from './utils.js';

const buttonTp = html`
  <wa-button>
    <div class="spinner" part="spinner" style="display: none;"></div>
  </wa-button>
`

const buttonCss = css`
  :host {
    display: inline-block;
    width: 100%;
  }
  wa-button::part(base) {
    font-family: Outfit, sans-serif;
    width: 100%;
    height: 44px;
    min-height: 44px;
    padding: 12px;
    border-radius: 1000px;
    border: 1px solid #1A1A1A1F;
    opacity: 1;
    background-color: var(--green);
    color: var(--whitesmoke);
    transition: background-color 500ms ease, color 500ms ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  wa-button::part(base):hover {
    background-color: var(--lightgreen);
    color: var(--darkslategray);
  }

  wa-button::part(base):focus {
    outline: 2px solid var(--darkslategray);
  }

  :host([variant="secondary"]) > wa-button::part(base):focus {
    outline: 2px solid var(--green);
  }

  :host([variant="secondary"]) > wa-button::part(base) {
    background-color: var(--extra-light-green);
    color: var(--darkslategray);
    border: 1px solid var(--lightgreen);
}

  :host([variant="secondary"]) > wa-button::part(base):hover,
  :host([variant="secondary"]) > wa-button::part(base):focus {
  background-color: var(--whitish-green);
}
`;

export class ButtonVirto extends HTMLElement {
  static TAG = "virto-button";
  static observedAttributes = ["label", "variant", "disabled", "type", "loading"];
  static formAssociated = true;
  #internals;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(buttonTp.content.cloneNode(true));

    // TODO: change for this.shadowRoot.adoptedStyleSheets = [globalStyles, buttonCss];
    const style = document.createElement("style");
    style.textContent = buttonCss;
    this.shadowRoot.appendChild(style);

    this.waButton = this.shadowRoot.querySelector("wa-button");
    this.waButton.textContent = this.innerHTML; //Adds the possibility to change the content of the button by adding text between the opening and closing tags.
    this.#internals = this.attachInternals();
    this.#syncAttributes();
  }

  static observedAttributes = ["label", "variant", "disabled", "type", "loading"];

  get loading() { return this.hasAttribute("loading"); } // devuelve true?
  set loading(value) {
    const isLoading = Boolean(value);
    if (isLoading) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
  }

  get disabled() { return this.hasAttribute("disabled"); } // devuelve true?
  set disabled(value) {
    const isDisabled = Boolean(value);
    if (isDisabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get label() { return this.getAttribute('label') || ''; }

  set label(value) { this.setAttribute('label', value); }


  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.waButton) return;
    if (name === "label") {
      this.waButton.textContent = newValue || "Button";
    } else {
      this.#syncAttributes();
    }
  }

  #syncAttributes() {
    const attrs = ["variant", "disabled", "type", "loading"];
    attrs.forEach(attr => {
      const value = this.getAttribute(attr);
      if (value !== null) this.waButton.setAttribute(attr, value);
      else this.waButton.removeAttribute(attr);
    });
    if (this.getAttribute("type") === "submit") {
      this.#internals.setFormValue(this.getAttribute("value") || "submit");
    }
  }
}

if (!customElements.get(ButtonVirto.TAG)) {
  customElements.define(ButtonVirto.TAG, ButtonVirto)
}