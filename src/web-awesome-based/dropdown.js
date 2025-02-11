import './main.js';
import { html, css } from './utils.js';

const dropdownTp = html`
  <label for="dropdown-button"></label>
  <wa-dropdown>
    <wa-button id="dropdown-button" slot="trigger" caret aria-haspopup="listbox" tabindex="0">
      <span class="placeholder"></span>
    </wa-button>
    <wa-menu role="listbox">
    </wa-menu>
  </wa-dropdown>
`

const dropdownCss = css`
  :host {
    display: inline-block;
    --dropdown-background: var(--darkseagreen);
    --dropdown-text: var(--darkslategray);
    --dropdown-hover: var(--whitish-green);
    --dropdown-focus: var(--lightgreen);
    font-family: var(--font-primary);
    width: 100%;
  }
  label {
    display: block;
    font-size: 18px;
    font-weight: 500;
    color: var(--dropdown-text);
    margin-bottom: 8px;
  }
  wa-dropdown {
    background: var(--dropdown-background);
    border-radius: 36px;
  }
  wa-button {
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--whitesmoke);
    font-size: 20px;
    font-weight: 500;
    padding: 12px;
  }
  wa-button:focus {
    padding: 12px;
    border-radius: 36px;
    outline: none;
    box-shadow: 0 0 0 2px var(--dropdown-focus);
  }
  wa-menu {
    background: var(--dropdown-background);
    border-radius: 12px;
    padding: 8px 0;
    width: 140%;
    max-height: 300px;
    overflow-y: auto;
  }
  wa-menu-item {
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.2s ease-in;
    color: var(--dropdown-text);
  }
  wa-menu-item:hover,
  wa-menu-item:focus {
    background-color: var(--dropdown-hover);
  }
`

export class DropdownVirto extends HTMLElement {
  static TAG = 'virto-dropdown'

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(dropdownTp.content.cloneNode(true));
    
    const style = document.createElement('style');
    style.textContent = dropdownCss;
    shadow.appendChild(style);

    this.label = shadow.querySelector('label')
    this.dropdown = shadow.querySelector('wa-dropdown')
    this.button = shadow.querySelector('wa-button')
    this.placeholder = shadow.querySelector('.placeholder')
    this.menu = shadow.querySelector('wa-menu')

    this.setupEventListeners()
  }

  static get observedAttributes() {
    return ['label', 'placeholder', 'items']
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render()
    }
  }

  render() {
    const label = this.getAttribute('label') || 'Dropdown'
    const placeholder = this.getAttribute('placeholder') || 'Select an option'
    const items = JSON.parse(this.getAttribute('items') || '["Option 1", "Option 2", "Option 3"]')

    this.label.textContent = label
    this.label.setAttribute('for', 'dropdown-button')
    this.placeholder.textContent = placeholder
    this.menu.innerHTML = items.map(item => `
      <wa-menu-item role="option" value="${item}">${item}</wa-menu-item>
    `).join('')
  }

  setupEventListeners() {
    this.dropdown.addEventListener('wa-select', this.handleSelect.bind(this))
  }

  handleSelect(event) {
    const selectedItem = event.detail.item
    const value = selectedItem.getAttribute('value')
    this.setAttribute('value', value)
    this.dispatchEvent(new CustomEvent('change', { detail: { value } }))
    this.placeholder.textContent = value
  }

  updateTranslations(translate) {
    this.label.textContent = translate('dropdown.label')
    this.placeholder.textContent = this.getAttribute('value') || translate('dropdown.placeholder')
  
    const items = translate('dropdown.items', [])
    this.menu.innerHTML = items.map(item => `
      <wa-menu-item role="option" value="${item}">${item}</wa-menu-item>
    `).join('')
  }
}

if (!customElements.get(DropdownVirto.TAG)) {
  customElements.define(DropdownVirto.TAG, DropdownVirto);
}