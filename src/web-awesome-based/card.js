import "./main.js"
import { html, css } from './utils.js';

const cardTp = html`
  <wa-card>
  </wa-card>
`

const cardCss = css`
  :host {
    display: inline-block;
    width: 100%;
  }
  wa-card::part(body) {
    --wa-panel-background: var(--extra-light-green);
    --wa-panel-border-radius: 40px;
    --wa-panel-border-width: 1px;
    --wa-panel-border-color: var(--green);
    --wa-panel-padding: 32px;
    --wa-space: 16px;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 300px;
    transition: all 0.2s ease-out;
    font-family: var(--font-primary);
  }

  wa-card {
  --wa-panel-background: var(--extra-light-green);
    --wa-panel-border-radius: 40px;
    --wa-panel-border-width: 1px;
    --wa-panel-border-color: var(--green);
    --wa-panel-padding: 32px;
    --wa-space: 16px;
  }

  wa-card:hover {
    --wa-panel-background: var(--whitish-green) !important;
    box-shadow: 0px 16px 32px 0px rgba(0, 34, 24, 0.2) !important;
  }

  wa-card::part(header) {
    color: var(--darkslategray);
    font-weight: bold;
    margin-bottom: var(--wa-space);
  }

  wa-card::part(body) {
    color: var(--darkslategray);
    flex-grow: 1;
  }

  wa-card::part(footer) {
    color: var(--green);
    margin-top: var(--wa-space);
  }

  wa-card::part(image) {
    border-radius: 24px;
    overflow: hidden;
    margin-bottom: var(--wa-space);
  }

  :host([size="small"]) wa-card {
    --wa-panel-padding: 24px;
    height: 200px;
  }

  :host([size="large"]) wa-card {
    --wa-panel-padding: 40px;
    height: 400px;
  }
`

export class CardVirto extends HTMLElement {
  static get TAG() {
    return "virto-card"
  }

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(cardTp.content.cloneNode(true))

    const style = document.createElement("style")
    style.textContent = cardCss
    this.shadowRoot.appendChild(style)

    this.waCard = this.shadowRoot.querySelector("wa-card")
    this.updateCard()
  }

  static get observedAttributes() {
    return ["size", "with-header", "with-image", "with-footer"]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateCard()
  }

  updateCard() {
    if (this.waCard) {
      CardVirto.observedAttributes.forEach((attr) => {
        if (this.hasAttribute(attr)) {
          this.waCard.setAttribute(attr, this.getAttribute(attr))
        } else {
          this.waCard.removeAttribute(attr)
        }
      })
    }
    this.waCard.style.setProperty("--wa-panel-background", "var(--extra-light-green)")
  }
}

if (!customElements.get(CardVirto.TAG)) {
  customElements.define(CardVirto.TAG, CardVirto)
}