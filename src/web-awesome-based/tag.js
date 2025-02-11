import "./main.js"
import { html, css } from './utils.js';

const tagTp = html`
  <wa-tag>
    <slot></slot>
  </wa-tag>
`

const tagCss = css`
  :host {
    display: inline-block;
  }
  wa-tag {
    display: flex;
    height: 28px;
    min-height: 28px;
    padding: 0px 12px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border-radius: 8px;
    background: var(--extra-light-green);
    font-family: var(--font-primary);
    transition: all 0.2s ease-out;
  }

  wa-tag::part(base) {
    background: transparent;
  }

  wa-tag::part(content) {
    color: var(--darkslategray);
    font-weight: 500;
    font-size: 14px;
  }

  :host([variant="brand"]) wa-tag {
    background: var(--green);
  }

  :host([variant="brand"]) wa-tag::part(content) {
    color: var(--white);
  }

  :host([variant="success"]) wa-tag {
    background: var(--lightgreen);
  }

  :host([variant="warning"]) wa-tag {
    background: var(--darkseagreen);
  }

  :host([variant="danger"]) wa-tag {
    background: #FFCCCB;
  }

  :host([appearance="outlined"]) wa-tag {
    background: transparent;
    border: 1px solid var(--green);
  }

  :host([appearance="outlined"]) wa-tag::part(content) {
    color: var(--green);
  }

  :host([size="small"]) wa-tag {
    height: 24px;
    min-height: 24px;
    padding: 0px 8px;
  }

  :host([size="large"]) wa-tag {
    height: 32px;
    min-height: 32px;
    padding: 0px 16px;
  }

  :host([pill]) wa-tag {
    border-radius: 14px;
  }

  :host([removable]) wa-tag::part(remove-button) {
    color: var(--darkslategray);
    opacity: 0.7;
  }

  :host([removable]) wa-tag::part(remove-button):hover {
    opacity: 1;
  }

  :host(.editing) wa-tag {
    opacity: 0.4;
  }
`

export class TagVirto extends HTMLElement {
  static get TAG() {
    return "virto-tag"
  }

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(tagTp.content.cloneNode(true))

    const style = document.createElement("style")
    style.textContent = tagCss
    this.shadowRoot.appendChild(style)

    this.waTag = this.shadowRoot.querySelector("wa-tag")
    this.updateTag()
  }

  static get observedAttributes() {
    return ["variant", "appearance", "size", "pill", "removable"]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateTag()
  }

  updateTag() {
    if (this.waTag) {
      TagVirto.observedAttributes.forEach((attr) => {
        if (this.hasAttribute(attr)) {
          this.waTag.setAttribute(attr, this.getAttribute(attr))
        } else {
          this.waTag.removeAttribute(attr)
        }
      })
    }
  }

  connectedCallback() {
    this.waTag.addEventListener("wa-remove", this.handleRemove.bind(this))
  }

  disconnectedCallback() {
    this.waTag.removeEventListener("wa-remove", this.handleRemove.bind(this))
  }

  handleRemove(event) {
    this.dispatchEvent(
      new CustomEvent("virto-remove", {
        bubbles: true,
        composed: true,
      }),
    )
  }
}

if (!customElements.get(TagVirto.TAG)) {
  customElements.define(TagVirto.TAG, TagVirto);
}