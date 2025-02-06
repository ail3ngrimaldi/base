import "./main.js"
import { html, css } from './utils.js';

const textareaTp = html`
  <wa-textarea>
  </wa-textarea>
`

const textareaCss = css`
  :host {
    display: inline-block;
    width: 100%;
  }
  wa-textarea::part(base) {
    font-family: var(--font-primary);
    border-radius: 8px;
    border: 1px solid var(--black);
    background-color: var(--whitesmoke);
    color: var(--darkslategray);
    transition: border-color 300ms ease, background-color 300ms ease;
  }

  wa-textarea::part(textarea) {
    padding: 12px;
  }

  wa-textarea::part(base):hover {
    border-color: var(--green);
  }

  wa-textarea::part(base):focus-within {
    border-color: var(--green);
    background-color: var(--extra-light-green);
  }

  wa-textarea::part(label) {
    color: var(--darkslategray);
    font-weight: 500;
  }

  wa-textarea::part(hint) {
    color: var(--black);
  }

  :host([appearance="filled"]) wa-textarea::part(base) {
    background-color: var(--extra-light-green);
  }

  :host([appearance="filled"]) wa-textarea::part(base):hover,
  :host([appearance="filled"]) wa-textarea::part(base):focus-within {
    background-color: var(--whitish-green);
  }
`

export class TextareaVirto extends HTMLElement {
  static get TAG() {
    return "virto-textarea"
  }

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(textareaTp.content.cloneNode(true))

    const style = document.createElement("style")
    style.textContent = textareaCss
    this.shadowRoot.appendChild(style)

    this.waTextarea = this.shadowRoot.querySelector("wa-textarea")
    this.updateTextarea()
  }

  static get observedAttributes() {
    return [
      "label",
      "hint",
      "value",
      "placeholder",
      "rows",
      "resize",
      "disabled",
      "readonly",
      "required",
      "minlength",
      "maxlength",
      "autocomplete",
      "autofocus",
      "size",
      "appearance",
    ]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateTextarea()
  }

  updateTextarea() {
    console.log('hola')
    if (this.waTextarea) {
      TextareaVirto.observedAttributes.forEach((attr) => {
        if (this.hasAttribute(attr)) {
          this.waTextarea.setAttribute(attr, this.getAttribute(attr))
        } else {
          this.waTextarea.removeAttribute(attr)
        }
      })
    }
  }
}

customElements.define(TextareaVirto.TAG, TextareaVirto)

