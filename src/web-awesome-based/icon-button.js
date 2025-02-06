import "./main.js"
import { html, css } from './utils.js';

const iconButtonTp = html`
  <wa-icon-button>
  </wa-icon-button>
`

const iconButtonCss = css`
  :host {
    display: inline-block;
  }
  wa-icon-button::part(base) {
    font-family: var(--font-primary);
    cursor: pointer;
    width: 44px;
    height: 44px;
    min-height: 44px;
    padding: 10px;
    border-radius: 50%;
    border: 1px solid var(--black);
    opacity: 1;
    background-color: var(--green);
    color: var(--whitesmoke);
    transition: background-color 500ms ease, color 500ms ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  wa-icon-button::part(base):hover {
    background-color: var(--lightgreen);
    color: var(--darkslategray);
  }

  :host([variant="secondary"]) > wa-icon-button::part(base) {
    background-color: var(--extra-light-green);
    color: var(--darkslategray);
    border: 1px solid var(--lightgreen);
  }

  :host([variant="secondary"]) > wa-icon-button::part(base):hover,
  :host([variant="secondary"]) > wa-icon-button::part(base):focus {
    background-color: var(--whitish-green);
  }
`

export class IconButtonVirto extends HTMLElement {
  static get TAG() {
    return "virto-icon-button"
  }

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(iconButtonTp.content.cloneNode(true))

    const style = document.createElement("style")
    style.textContent = iconButtonCss
    this.shadowRoot.appendChild(style)

    this.waIconButton = this.shadowRoot.querySelector("wa-icon-button")
    this.updateIconButton()
  }

  static get observedAttributes() {
    return ["name", "label", "variant", "disabled"]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateIconButton()
  }

  updateIconButton() {
    if (this.waIconButton) {
      this.waIconButton.name = this.getAttribute("name") || ""
      this.waIconButton.label = this.getAttribute("label") || ""
      this.waIconButton.disabled = this.hasAttribute("disabled") || ""
    }
  }
}

customElements.define(IconButtonVirto.TAG, IconButtonVirto)