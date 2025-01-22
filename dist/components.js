// src/web-awesome-based/main.js
import "https://early.webawesome.com/webawesome@3.0.0-alpha.9/dist/components/button/button.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.9/dist/components/dropdown/dropdown.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.9/dist/components/menu/menu.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.9/dist/components/menu-item/menu-item.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.9/dist/components/icon/icon.js";

// src/web-awesome-based/button.js
var tagFn = (fn) => (strings, ...parts) => fn(parts.reduce((tpl, value, i) => `${tpl}${strings[i]}${value}`, "").concat(strings[parts.length]));
var html = tagFn(
  (s) => new DOMParser().parseFromString(`<template>${s}</template>`, "text/html").querySelector("template")
);
var css = tagFn((s) => s);
var buttonTp = html`
  <wa-button>
    <slot></slot>
  </wa-button>
`;
var buttonCss = css`
  :host {
    display: inline-block;
    width: 100%;
  }
  wa-button {
    font-family: Outfit, sans-serif;
    cursor: pointer;
    width: 100%;
    height: 44px;
    min-height: 44px;
    padding: 12px;
    border-radius: 1000px;
    border: 1px solid #1A1A1A1F;
    opacity: 1;
    background-color: var(--green);
    color: var(--whitesmoke);
    transition: background-color 500ms ease, color 500ms ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  wa-button:hover {
    background-color: var(--lightgreen);
    color: var(--darkslategray);
  }

  :host([variant="secondary"]) wa-button {
    background-color: var(--extra-light-green);
    color: var(--darkslategray);
    border: 1px solid var(--lightgreen);
  }
  :host([variant="secondary"]) wa-button:hover,
  :host([variant="secondary"]) wa-button:focus {
    background-color: var(--whitish-green);
  }
`;
var ButtonVirto = class extends HTMLElement {
  static get TAG() {
    return "virto-button";
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(buttonTp.content.cloneNode(true));
    const style = document.createElement("style");
    style.textContent = buttonCss;
    this.shadowRoot.appendChild(style);
    this.waButton = this.shadowRoot.querySelector("wa-button");
  }
  connectedCallback() {
    this.updateButtonAttributes();
  }
  static get observedAttributes() {
    return ["label", "variant"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateButtonAttributes();
    }
  }
  updateButtonAttributes() {
    const label = this.getAttribute("label");
    if (label) {
      this.waButton.textContent = label;
    }
    const variant = this.getAttribute("variant");
    if (variant === "secondary") {
      this.waButton.setAttribute("appearance", "outlined");
    } else {
      this.waButton.removeAttribute("appearance");
    }
  }
};
customElements.define(ButtonVirto.TAG, ButtonVirto);

// src/web-awesome-based/dropdown.js
import "https://early.webawesome.com/webawesome@3.0.0-alpha.5/dist/components/dropdown/dropdown.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.5/dist/components/button/button.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.5/dist/components/menu/menu.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.5/dist/components/menu-item/menu-item.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.5/dist/components/icon/icon.js";
var tagFn2 = (fn) => (strings, ...parts) => fn(parts.reduce((tpl, value, i) => `${tpl}${strings[i]}${value}`, "").concat(strings[parts.length]));
var html2 = tagFn2((s) => new DOMParser().parseFromString(`<template>${s}</template>`, "text/html").querySelector("template"));
var css2 = tagFn2((s) => s);
var dropdownTp = html2`
  <label for="dropdown-button"></label>
  <wa-dropdown>
    <wa-button id="dropdown-button" slot="trigger" caret aria-haspopup="listbox" tabindex="0">
      <span class="placeholder"></span>
    </wa-button>
    <wa-menu role="listbox">
    </wa-menu>
  </wa-dropdown>
`;
var dropdownCss = css2`
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
    color: var(--whitesmoke); //REVISAR!
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
`;
var CustomDropdown = class extends HTMLElement {
  static TAG = "virto-dropdown";
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(dropdownTp.content.cloneNode(true));
    const style = document.createElement("style");
    style.textContent = dropdownCss;
    shadow.appendChild(style);
    this.label = shadow.querySelector("label");
    this.dropdown = shadow.querySelector("wa-dropdown");
    this.button = shadow.querySelector("wa-button");
    this.placeholder = shadow.querySelector(".placeholder");
    this.menu = shadow.querySelector("wa-menu");
    this.setupEventListeners();
  }
  static get observedAttributes() {
    return ["label", "placeholder", "items"];
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
  render() {
    const label = this.getAttribute("label") || "Dropdown";
    const placeholder = this.getAttribute("placeholder") || "Select an option";
    const items = JSON.parse(this.getAttribute("items") || '["Option 1", "Option 2", "Option 3"]');
    this.label.textContent = label;
    this.label.setAttribute("for", "dropdown-button");
    this.placeholder.textContent = placeholder;
    this.menu.innerHTML = items.map((item) => `
      <wa-menu-item role="option" value="${item}">${item}</wa-menu-item>
    `).join("");
  }
  setupEventListeners() {
    this.dropdown.addEventListener("wa-select", this.handleSelect.bind(this));
  }
  handleSelect(event) {
    const selectedItem = event.detail.item;
    const value = selectedItem.getAttribute("value");
    this.setAttribute("value", value);
    this.dispatchEvent(new CustomEvent("change", { detail: { value } }));
    this.placeholder.textContent = value;
  }
  updateTranslations(translate) {
    this.label.textContent = translate("dropdown.label");
    this.placeholder.textContent = this.getAttribute("value") || translate("dropdown.placeholder");
    const items = translate("dropdown.items", []);
    this.menu.innerHTML = items.map((item) => `
      <wa-menu-item role="option" value="${item}">${item}</wa-menu-item>
    `).join("");
  }
};
customElements.define(CustomDropdown.TAG, CustomDropdown);
