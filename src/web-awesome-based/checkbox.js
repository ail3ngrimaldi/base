import './main.js';
import { html, css } from './utils.js';

const checkboxTpl = html`
  <label for="checkbox-input">
    <wa-checkbox id="checkbox-input">
      <span class="checkbox-label"></span>
    </wa-checkbox>
  </label>
`

const checkboxCss = css`
  :host {
    display: block;
    width: 100%;
    --wa-form-control-value-color: var(--green);
    --background-color-checked: var(--darkseagreen);
    --background-color: var(--darkseagreen);
    font-family: var(--font-primary);

  }
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  wa-checkbox {
    --background-color: var(--darkseagreen);
  }

  wa-checkbox label:part(base) {
    border: 2px solid blue;
  }

    wa-checkbox span {
    border: 2px solid blue;
  }

    wa-checkbox:is(:checked) {
    --background-color: red !important;

    }
    wa-checkbox label {
    border: 2px solid blue;
    }

    input[type='checkbox']:where(:not(:host *)), :host [part~='control'] {
    outline: 2px solid red !important;
    border: 2px solid red !important;
    }

  .checkbox-label {
    color: var(--darkslategray);
    font-size: 16px;
  }

  input[type='checkbox']:where(:not(:host *)), :host [part~='control'] {
      --primary-color: currentColor;
    --primary-opacity: 1;
    border: 2px solid red;
    background-color: var(--darkseagreen);
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;
    display: inline-flex;
    box-sizing: content-box !important;
    width: auto;
    border-radius: 12px;
    padding: 8px;
    height: 1em;
}
`

export class CustomCheckbox extends HTMLElement {
  static TAG = "virto-checkbox"

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })
    shadow.append(checkboxTpl.content.cloneNode(true))

    const style = document.createElement("style")
    style.textContent = checkboxCss
    shadow.appendChild(style)

    this.checkbox = shadow.querySelector("wa-checkbox")
    this.labelSpan = shadow.querySelector(".checkbox-label")

    this.setupEventListeners()
  }

  static get observedAttributes() {
    return ["label", "checked", "disabled", "indeterminate", "size"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render()
    }
  }

  render() {
    const label = this.getAttribute("label") || "Checkbox"
    const checked = this.hasAttribute("checked")
    const disabled = this.hasAttribute("disabled")
    const indeterminate = this.hasAttribute("indeterminate")
    const size = this.getAttribute("size") || "medium"

    this.labelSpan.textContent = label
    this.checkbox.checked = checked
    this.checkbox.disabled = disabled
    this.checkbox.indeterminate = indeterminate
    this.checkbox.size = size
  }

  setupEventListeners() {
    this.checkbox.addEventListener("change", this.handleChange.bind(this))
  }

  handleChange(event) {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { checked: (event.target).checked },
        bubbles: true,
        composed: true,
      }),
    )
    if (this.checkbox.checked) {
      this.setAttribute("checked", "")
    } else {
      this.removeAttribute("checked")
    }
  }

  check() {
    this.checkbox.checked = true
    this.setAttribute("checked", "")
  }

  uncheck() {
    this.checkbox.checked = false
    this.removeAttribute("checked")
  }

  toggle() {
    this.checkbox.checked = !this.checkbox.checked
    this.handleChange({ target: this.checkbox })
  }

  get checked() {
    return this.checkbox.checked
  }

  set checked(value) {
    this.checkbox.checked = value
    this.handleChange({ target: this.checkbox })
  }

  get disabled() {
    return this.checkbox.disabled
  }

  set disabled(value) {
    this.checkbox.disabled = value
    if (value) {
      this.setAttribute("disabled", "")
    } else {
      this.removeAttribute("disabled")
    }
  }

  get indeterminate() {
    return this.checkbox.indeterminate
  }

  set indeterminate(value) {
    this.checkbox.indeterminate = value
    if (value) {
      this.setAttribute("indeterminate", "")
    } else {
      this.removeAttribute("indeterminate")
    }
  }

  get size() {
    return this.checkbox.size
  }

  set size(value) {
    // "small" | "medium" | "large"
    this.checkbox.size = value
    this.setAttribute("size", value)
  }
}

if (!customElements.get(CustomCheckbox.TAG)) {
  customElements.define(CustomCheckbox.TAG, CustomCheckbox)
}