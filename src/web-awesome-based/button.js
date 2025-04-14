import './main.js';
import { html, css } from './utils.js';

const buttonTp = html`
  <wa-button part="base">
    <span class="label" part="label">
      <slot></slot> </span>
    <div class="spinner" part="spinner" style="display: none;"></div>
  </wa-button>
`

const buttonCss = css`
  :host {
    display: inline-block;
    width: 100%;
  }
  wa-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 44px;
  }
  wa-button::part(base) {
    font-family: Outfit, sans-serif;
    cursor: pointer;
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
    display: flex;
    align-items: center;
    justify-content: center;
  }

  wa-button::part(base):hover {
    background-color: var(--lightgreen);
    color: var(--darkslategray);
  }

  wa-button::part(base):focus {
    outline: 2px solid var(--darkslategray);
  }

  :host([variant="secondary"]) > wa-button::part(base) {
    background-color: var(--extra-light-green);
    color: var(--darkslategray);
    border: 1px solid var(--lightgreen);
  }
   :host([variant="secondary"]) > wa-button::part(base):focus {
    outline: 2px solid var(--green);
  }
  :host([variant="secondary"]) > wa-button::part(base):hover,
  :host([variant="secondary"]) > wa-button::part(base):focus {
    background-color: var(--whitish-green);
  }

  .label {
    display: inline-block;
  }

  .spinner {
    width: 1.2em;
    height: 1.2em;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: button-virto-spin 0.8s linear infinite;
  }

  @keyframes button-virto-spin {
    to {
      transform: rotate(360deg);
    }
  }

  :host([loading]) .label {
    display: none;
  }
  :host([loading]) .spinner {
    display: inline-block;
  }

  :host([loading]) wa-button::part(base) {
     cursor: default;
  }
`;

export class ButtonVirto extends HTMLElement {
  static TAG = "virto-button";
  static observedAttributes = ["label", "variant", "loading"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(buttonTp.content.cloneNode(true));

    const style = document.createElement("style");
    style.textContent = buttonCss;
    this.shadowRoot.appendChild(style);

    this.waButton = this.shadowRoot.querySelector("wa-button");
    this.labelSpan = this.shadowRoot.querySelector(".label");
    this.spinnerDiv = this.shadowRoot.querySelector(".spinner");

    this._updateLabel(this.getAttribute("label") || "Button");
    this._updateLoadingState();
  }

  get loading() {
    return this.hasAttribute('loading');
  }

  set loading(value) {
    const isLoading = Boolean(value);
    if (isLoading) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
  }

  get label() {
      return this.getAttribute('label') || '';
  }

  set label(value) {
      this.setAttribute('label', value);
  }

  _updateLabel(newLabel) {
      const slot = this.shadowRoot.querySelector('slot');
      if (slot) {
          slot.textContent = newLabel || "Button";
      } else {
           this.labelSpan.textContent = newLabel || "Button";
      }
  }

  _updateLoadingState() {
      const isLoading = this.loading;
      if (this.waButton) {
          this.waButton.disabled = isLoading;
      }
      if (this.labelSpan) {
          this.labelSpan.style.display = isLoading ? 'none' : '';
      }
      if (this.spinnerDiv) {
          this.spinnerDiv.style.display = isLoading ? 'inline-block' : 'none';
      }
  }


  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'label') {
       this._updateLabel(newValue);
    } else if (name === 'loading') {
       this._updateLoadingState();
    }
  }

  // Optional: Connect click listener to the inner button if needed,
  // or rely on the event bubbling from wa-button.
  // connectedCallback() {
  //   if (!this.waButton) return;
  //   this.waButton.addEventListener('click', (e) => {
  //      if (this.loading) { // Prevent clicks when loading
  //          e.stopImmediatePropagation();
  //          e.preventDefault();
  //      }
  //   });
  // }
}

if (!customElements.get(ButtonVirto.TAG)) {
  customElements.define(ButtonVirto.TAG, ButtonVirto)
}