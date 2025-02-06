import "./main.js"
import { html, css } from './utils.js';

const switchTp = html`
  <wa-switch>
    <slot></slot>
  </wa-switch>
`

const switchCss = css`
  :host {
    display: inline-block;
  }
  wa-switch {
    --background-color: var(--whitesmoke);
    --background-color-checked: var(--green);
    --border-color: var(--darkslategray);
    --border-color-checked: var(--green);
    --thumb-color: var(--white);
    --thumb-color-checked: var(--white);
    --width: 48px;
    --height: 24px;
    --thumb-size: 20px;
    font-family: var(--font-primary);
  }

  wa-switch::part(base) {
    font-size: 16px;
    color: var(--darkslategray);
  }

  wa-switch::part(control) {
    background-color: var(--background-color);
    border: 2px solid var(--border-color);
    transition: all 0.2s ease;
  }

  wa-switch::part(thumb) {
    background-color: var(--thumb-color);
    border: 2px solid var(--border-color);
    transition: all 0.2s ease;
  }

  wa-switch[checked]::part(control) {
    background-color: var(--background-color-checked);
    border-color: var(--border-color-checked);
  }

  wa-switch[checked]::part(thumb) {
    background-color: var(--thumb-color-checked);
    border-color: var(--border-color-checked);
  }

  wa-switch::part(label) {
    margin-left: 8px;
  }

  wa-switch::part(hint) {
    font-size: 14px;
    color: var(--black);
    margin-top: 4px;
  }

  :host([size="small"]) wa-switch {
    --width: 36px;
    --height: 18px;
    --thumb-size: 14px;
    font-size: 14px;
  }

  :host([size="large"]) wa-switch {
    --width: 60px;
    --height: 30px;
    --thumb-size: 26px;
    font-size: 18px;
  }

  :host([disabled]) wa-switch::part(base) {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export class SwitchVirto extends HTMLElement {
  static get TAG() {
    return "virto-switch"
  }

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(switchTp.content.cloneNode(true))

    const style = document.createElement("style")
    style.textContent = switchCss
    this.shadowRoot.appendChild(style)

    this.waSwitch = this.shadowRoot.querySelector("wa-switch")
    this.updateSwitch()
  }

  static get observedAttributes() {
    return ["checked", "disabled", "size", "hint", "name", "value", "required"]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateSwitch()
  }

  updateSwitch() {
    if (this.waSwitch) {
      SwitchVirto.observedAttributes.forEach((attr) => {
        if (this.hasAttribute(attr)) {
          this.waSwitch.setAttribute(attr, this.getAttribute(attr))
        } else {
          this.waSwitch.removeAttribute(attr)
        }
      })
    }
  }

  connectedCallback() {
    this.waSwitch.addEventListener("change", this.handleChange.bind(this))
  }

  disconnectedCallback() {
    this.waSwitch.removeEventListener("change", this.handleChange.bind(this))
  }

  handleChange(event) {
    this.dispatchEvent(
      new CustomEvent("virto-change", {
        bubbles: true,
        composed: true,
        detail: {
          checked: event.target.checked,
        },
      }),
    )
  }
}

customElements.define(SwitchVirto.TAG, SwitchVirto)

