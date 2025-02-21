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
        padding: 1em;
        margin-top: 1em;
        border-radius: 12px;
        border: 1px solid var(--lightgreen);
        background: var(--extra-light-green);
        font-family: Outfit, sans-serif;
    }

    wa-input::part(base):focus {
        outline: 2px solid var(--green);
    }

    wa-input[data-invalid]::part(base) {
       outline: 2px solid #ff0000;
    }

    .error-message {
        color: #ff0000;
        font-size: 0.875em;
        margin-top: 0.25em;
    }
`

export class InputVirto extends HTMLElement {
  static TAG = 'virto-input'

  static get observedAttributes() {
    return [
      "type",
      "value",
      "label",
      "hint",
      "disabled",
      "placeholder",
      "readonly",
      "required",
      "pattern",
      "minlength",
      "maxlength",
      "min",
      "max",
      "step",
      "autocomplete",
      "autofocus",
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
    this.errorMessage = document.createElement('div');
    this.errorMessage.className = 'error-message';
    shadow.appendChild(this.errorMessage);
  }

  connectedCallback() {
    this.updateWaInputAttributes();
    this.setupEventForwarding();
    this.waInput.addEventListener('input', this.validateInput.bind(this));
    this.waInput.addEventListener('blur', this.validateInput.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
        if (name === 'disabled') {
            this.waInput.disabled = newValue !== null;
        } else {
            this.waInput.setAttribute(name, newValue);
        }
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
    const events = ["input", "change", "blur", "focus"]
    events.forEach((eventName) => {
      this.waInput.addEventListener(eventName, (event) => {
        this.dispatchEvent(new CustomEvent(eventName, { detail: event.detail, bubbles: true, composed: true }))
      })
    })
  }

  validateInput() {
    const value = this.waInput.value;
    const type = this.getAttribute('type');
    const minLength = this.getAttribute('minlength');
    let isValid = true;
    let errorMessage = '';

    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }

    if (minLength && value.length < parseInt(minLength)) {
        isValid = false;
        errorMessage = `Please enter at least ${minLength} characters.`;
    }

    if (!isValid) {
        this.waInput.setAttribute('data-invalid', '');
        this.errorMessage.textContent = errorMessage;
    } else {
        this.waInput.removeAttribute('data-invalid');
        this.errorMessage.textContent = '';
    }

    this.waInput.setCustomValidity(errorMessage);
  }
}

if (!customElements.get(InputVirto.TAG)) {
  customElements.define(InputVirto.TAG, InputVirto);
}