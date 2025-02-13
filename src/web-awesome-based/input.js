import './main.js';
import { html, css } from './utils.js';

const inputTp = html`
    <wa-input></wa-input>
`

const inputCss = css`
    :host {
        width: 100%;
    }

    wa-input::part(base) {
        box-sizing: border-box;
        line-height: 28px;
        border-radius: 12px;
        padding: 1em;
        margin-top: 1em;
        border: 1px solid var(--lightgreen);
        background: var(--extra-light-green);
        font-family: Outfit, sans-serif;
    }
    wa-input::part(base):focus {
        outline: 2px solid var(--green);
    }
`

export class InputVirto extends HTMLElement {
  static TAG = 'virto-input'

  static get observedAttributes() {
    return [
      "type",
      "value",
      "size",
      "appearance",
      "pill",
      "label",
      "hint",
      "clearable",
      "placeholder",
      "readonly",
      "password-toggle",
      "password-visible",
      "no-spin-buttons",
      "form",
      "required",
      "pattern",
      "minlength",
      "maxlength",
      "min",
      "max",
      "step",
      "autocapitalize",
      "autocorrect",
      "autocomplete",
      "autofocus",
      "enterkeyhint",
      "spellcheck",
      "inputmode",
    ]
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(inputTp.content.cloneNode(true));

    const style = document.createElement('style');
    style.textContent = inputCss;
    shadow.appendChild(style);

    this.waInput = shadow.querySelector("wa-input")
  }

  connectedCallback() {
    this.updateWaInputAttributes()
    this.setupEventForwarding()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateWaInputAttributes()
    }
  }

  updateWaInputAttributes() {
    if (this.waInput) {
      Array.from(this.attributes).forEach((attr) => {
        if (InputVirto.observedAttributes.includes(attr.name)) {
          this.waInput.setAttribute(attr.name, attr.value)
        }
      })
    }
  }

  setupEventForwarding() {
    const events = ["input", "change", "blur", "focus", "wa-clear", "wa-invalid"]
    events.forEach((eventName) => {
      this.waInput.addEventListener(eventName, (event) => {
        this.dispatchEvent(new CustomEvent(eventName, { detail: event.detail, bubbles: true, composed: true }))
      })
    })
  }

  focus(options) {
    this.waInput.focus(options)
  }

  blur() {
    this.waInput.blur()
  }

  select() {
    this.waInput.select()
  }

  setSelectionRange(selectionStart, selectionEnd, selectionDirection) {
    this.waInput.setSelectionRange(selectionStart, selectionEnd, selectionDirection)
  }

  setRangeText(replacement, start, end, selectMode) {
    this.waInput.setRangeText(replacement, start, end, selectMode)
  }

  showPicker() {
    this.waInput.showPicker()
  }

  stepUp() {
    this.waInput.stepUp()
  }

  stepDown() {
    this.waInput.stepDown()
  }
}

if (!customElements.get(InputVirto.TAG)) {
  customElements.define(InputVirto.TAG, InputVirto);
}