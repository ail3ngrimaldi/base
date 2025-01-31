import './main.js';

const tagFn = (fn) => (strings, ...parts) => fn(parts.reduce((tpl, value, i) => `${tpl}${strings[i]}${value}`, "").concat(strings[parts.length]));
const html = tagFn((s) => new DOMParser().parseFromString(`<template>${s}</template>`, "text/html").querySelector("template"),);
const css = tagFn((s) => s);

const buttonTp = html`
  <wa-button>
  </wa-button>
`

const buttonCss = css`
  :host {
    display: inline-block;
    width: 100%;
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
  }

  wa-button::part(base):hover {
    background-color: var(--lightgreen);
    color: var(--darkslategray);
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
`

export class ButtonVirto extends HTMLElement {
  static get TAG() {
    return "virto-button"
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(buttonTp.content.cloneNode(true));

    const style = document.createElement("style");
    style.textContent = buttonCss;
    this.shadowRoot.appendChild(style);

    this.waButton = this.shadowRoot.querySelector("wa-button");
    this.waButton.textContent = this.getAttribute("label") || "Button";
  }

  connectedCallback() {
    this.updateButtonAttributes()
  }

  static get observedAttributes() {
    return ["label", "variant"]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'label' && this.shadowRoot) {
        const btn = this.shadowRoot.querySelector('wa-button');
        if (btn) {
            btn.textContent = newValue || "Button";
        }
    }
  }
}

customElements.define(ButtonVirto.TAG, ButtonVirto)

