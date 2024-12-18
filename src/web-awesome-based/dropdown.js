import 'https://early.webawesome.com/webawesome@3.0.0-alpha.5/dist/components/dropdown/dropdown.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.5/dist/components/button/button.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.5/dist/components/menu/menu.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.5/dist/components/menu-item/menu-item.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.5/dist/components/icon/icon.js';

const tagFn = fn => (strings, ...parts) => fn(parts.reduce((tpl, value, i) => `${tpl}${strings[i]}${value}`, '').concat(strings[parts.length]))
const html = tagFn(s => new DOMParser().parseFromString(`<template>${s}</template>`, 'text/html').querySelector('template'))
const css = tagFn(s => s)

const dropdownTp = html`
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
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
    --dropdown-background: var(--custom-dropdown-background, #f5f5f5);
    --dropdown-text: var(--custom-dropdown-text, #000);
    --dropdown-hover: var(--custom-dropdown-hover, #e0e0e0);
    --dropdown-focus: var(--custom-dropdown-focus, #4A90E2);
    font-family: var(--custom-dropdown-font, Outfit, sans-serif);
    width: 100%;
  }
  label {
    display: block;
    font-size: 18px;
    font-weight: 500;
    color: var(--custom-dropdown-label);
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
    color: var(--dropdown-text);
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

export class CustomDropdown extends HTMLElement {
  static TAG = 'custom-dropdown'

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.append(dropdownTp.content.cloneNode(true))
    
    const style = document.createElement('style')
    style.textContent = dropdownCss
    shadow.appendChild(style)

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

  attributeChangedCallback(name, oldValue, newValue) {
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

customElements.define(CustomDropdown.TAG, CustomDropdown)

