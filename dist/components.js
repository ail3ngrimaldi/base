// src/web-awesome-based/main.js
import "https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/button/button.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/dropdown/dropdown.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/menu/menu.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/menu-item/menu-item.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/icon/icon.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/input/input.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/checkbox/checkbox.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/icon-button/icon-button.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/textarea/textarea.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/card/card.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/dialog/dialog.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/tag/tag.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/switch/switch.js";
import "https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/avatar/avatar.js";

// src/web-awesome-based/utils.js
var tagFn = (fn) => (strings, ...parts) => fn(parts.reduce((tpl, value, i) => `${tpl}${strings[i]}${value}`, "").concat(strings[parts.length]));
var html = tagFn((s) => new DOMParser().parseFromString(`<template>${s}</template>`, "text/html").querySelector("template"));
var css = tagFn((s) => s);

// src/web-awesome-based/button.js
var buttonTp = html`
  <wa-button>
  </wa-button>
`;
var buttonCss = css`
  :host {
    display: inline-block;
    width: 100%;
  }
  wa-button::part(base) {
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

  wa-button::part(base):hover {
    background-color: var(--lightgreen);
    color: var(--darkslategray);
  }

  :host([variant="secondary"]) > wa-button::part(base) {
    background-color: var(--extra-light-green);
    color: var(--darkslategray);
    border: 1px solid var(--lightgreen);
}

  :host([variant="secondary"]) > wa-button::part(base):hover,
  :host([variant="secondary"]) > wa-button::part(base):focus {
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
    this.waButton.textContent = this.getAttribute("label") || "Button";
  }
  static get observedAttributes() {
    return ["label", "variant"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "label" && this.shadowRoot) {
      const btn = this.shadowRoot.querySelector("wa-button");
      if (btn) {
        btn.textContent = newValue || "Button";
      }
    }
  }
};
customElements.define(ButtonVirto.TAG, ButtonVirto);

// src/web-awesome-based/dropdown.js
var dropdownTp = html`
  <label for="dropdown-button"></label>
  <wa-dropdown>
    <wa-button id="dropdown-button" slot="trigger" caret aria-haspopup="listbox" tabindex="0">
      <span class="placeholder"></span>
    </wa-button>
    <wa-menu role="listbox">
    </wa-menu>
  </wa-dropdown>
`;
var dropdownCss = css`
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
  attributeChangedCallback(oldValue, newValue) {
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
if (!customElements.get(CustomDropdown.TAG)) {
  customElements.define(CustomDropdown.TAG, CustomDropdown);
}

// src/web-awesome-based/input.js
var inputTp = html`
    <wa-input></wa-input>
`;
var inputCss = css`
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
`;
var Input = class extends HTMLElement {
  static TAG = "virto-input";
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(inputTp.content.cloneNode(true));
    const style = document.createElement("style");
    style.textContent = inputCss;
    shadow.appendChild(style);
  }
};
customElements.define(Input.TAG, Input);

// src/web-awesome-based/checkbox.js
var checkboxTpl = html`
  <label for="checkbox-input">
    <wa-checkbox id="checkbox-input">
      <span class="checkbox-label"></span>
    </wa-checkbox>
  </label>
`;
var checkboxCss = css`
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
`;
var CustomCheckbox = class extends HTMLElement {
  static TAG = "virto-checkbox";
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(checkboxTpl.content.cloneNode(true));
    const style = document.createElement("style");
    style.textContent = checkboxCss;
    shadow.appendChild(style);
    this.checkbox = shadow.querySelector("wa-checkbox");
    this.labelSpan = shadow.querySelector(".checkbox-label");
    this.setupEventListeners();
  }
  static get observedAttributes() {
    return ["label", "checked", "disabled", "indeterminate", "size"];
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
    const label = this.getAttribute("label") || "Checkbox";
    const checked = this.hasAttribute("checked");
    const disabled = this.hasAttribute("disabled");
    const indeterminate = this.hasAttribute("indeterminate");
    const size = this.getAttribute("size") || "medium";
    this.labelSpan.textContent = label;
    this.checkbox.checked = checked;
    this.checkbox.disabled = disabled;
    this.checkbox.indeterminate = indeterminate;
    this.checkbox.size = size;
  }
  setupEventListeners() {
    this.checkbox.addEventListener("change", this.handleChange.bind(this));
  }
  handleChange(event) {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { checked: event.target.checked },
        bubbles: true,
        composed: true
      })
    );
    if (this.checkbox.checked) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }
  check() {
    this.checkbox.checked = true;
    this.setAttribute("checked", "");
  }
  uncheck() {
    this.checkbox.checked = false;
    this.removeAttribute("checked");
  }
  toggle() {
    this.checkbox.checked = !this.checkbox.checked;
    this.handleChange({ target: this.checkbox });
  }
  get checked() {
    return this.checkbox.checked;
  }
  set checked(value) {
    this.checkbox.checked = value;
    this.handleChange({ target: this.checkbox });
  }
  get disabled() {
    return this.checkbox.disabled;
  }
  set disabled(value) {
    this.checkbox.disabled = value;
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
  get indeterminate() {
    return this.checkbox.indeterminate;
  }
  set indeterminate(value) {
    this.checkbox.indeterminate = value;
    if (value) {
      this.setAttribute("indeterminate", "");
    } else {
      this.removeAttribute("indeterminate");
    }
  }
  get size() {
    return this.checkbox.size;
  }
  set size(value) {
    this.checkbox.size = value;
    this.setAttribute("size", value);
  }
};
if (!customElements.get(CustomCheckbox.TAG)) {
  customElements.define(CustomCheckbox.TAG, CustomCheckbox);
}

// src/web-awesome-based/icon-button.js
var iconButtonTp = html`
  <wa-icon-button>
  </wa-icon-button>
`;
var iconButtonCss = css`
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
`;
var IconButtonVirto = class extends HTMLElement {
  static get TAG() {
    return "virto-icon-button";
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(iconButtonTp.content.cloneNode(true));
    const style = document.createElement("style");
    style.textContent = iconButtonCss;
    this.shadowRoot.appendChild(style);
    this.waIconButton = this.shadowRoot.querySelector("wa-icon-button");
    this.updateIconButton();
  }
  static get observedAttributes() {
    return ["name", "label", "variant", "disabled"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.updateIconButton();
  }
  updateIconButton() {
    if (this.waIconButton) {
      this.waIconButton.name = this.getAttribute("name") || "";
      this.waIconButton.label = this.getAttribute("label") || "";
      this.waIconButton.disabled = this.hasAttribute("disabled") || "";
    }
  }
};
customElements.define(IconButtonVirto.TAG, IconButtonVirto);

// src/web-awesome-based/textarea.js
var textareaTp = html`
  <wa-textarea>
  </wa-textarea>
`;
var textareaCss = css`
  :host {
    display: inline-block;
    width: 100%;
  }
  wa-textarea::part(base) {
    font-family: var(--font-primary);
    border-radius: 8px;
    border: 1px solid var(--black);
    background-color: var(--whitesmoke);
    color: var(--darkslategray);
    transition: border-color 300ms ease, background-color 300ms ease;
  }

  wa-textarea::part(textarea) {
    padding: 12px;
  }

  wa-textarea::part(base):hover {
    border-color: var(--green);
  }

  wa-textarea::part(base):focus-within {
    border-color: var(--green);
    background-color: var(--extra-light-green);
  }

  wa-textarea::part(label) {
    color: var(--darkslategray);
    font-weight: 500;
  }

  wa-textarea::part(hint) {
    color: var(--black);
  }

  :host([appearance="filled"]) wa-textarea::part(base) {
    background-color: var(--extra-light-green);
  }

  :host([appearance="filled"]) wa-textarea::part(base):hover,
  :host([appearance="filled"]) wa-textarea::part(base):focus-within {
    background-color: var(--whitish-green);
  }
`;
var TextareaVirto = class _TextareaVirto extends HTMLElement {
  static get TAG() {
    return "virto-textarea";
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(textareaTp.content.cloneNode(true));
    const style = document.createElement("style");
    style.textContent = textareaCss;
    this.shadowRoot.appendChild(style);
    this.waTextarea = this.shadowRoot.querySelector("wa-textarea");
    this.updateTextarea();
  }
  static get observedAttributes() {
    return [
      "label",
      "hint",
      "value",
      "placeholder",
      "rows",
      "resize",
      "disabled",
      "readonly",
      "required",
      "minlength",
      "maxlength",
      "autocomplete",
      "autofocus",
      "size",
      "appearance"
    ];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.updateTextarea();
  }
  updateTextarea() {
    if (this.waTextarea) {
      _TextareaVirto.observedAttributes.forEach((attr) => {
        if (this.hasAttribute(attr)) {
          this.waTextarea.setAttribute(attr, this.getAttribute(attr));
        } else {
          this.waTextarea.removeAttribute(attr);
        }
      });
    }
  }
};
customElements.define(TextareaVirto.TAG, TextareaVirto);

// src/web-awesome-based/dialog.js
var dialogTp = html`
    <wa-dialog light-dismiss with-header with-footer>
    <div slot="label">
        <slot name="logo"></slot>
        <slot name="title"></slot>
    </div>
    <hr>
    <slot></slot>
    <slot name="buttons"></slot> 
    </wa-dialog>
`;
var dialogCss = css`
:host, wa-dialog {
    font-family: 'Outfit', sans-serif !important;
}

wa-dialog::part(base) {
    padding: 1em;
    background: var(--color-dialog-bg);
    border-radius: 12px;
    box-shadow: 0px 2px var(--Blurblur-3, 3px) -1px rgba(26, 26, 26, 0.08),
                0px 1px var(--Blurblur-0, 0px) 0px rgba(26, 26, 26, 0.08);
}

wa-dialog::part(header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

wa-dialog::part(header-actions) {
    order: 1;
}

wa-dialog::part(title) {
    display: flex;
    align-items: center;
    gap: 1em;
}

[slot="buttons"] {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    gap: 1em;
    width: 100%;
}

::slotted(virto-button) {
    width: 100%;
    min-width: 0;
}

// hr { 
//     border-top: 1px solid var(--color-accent); 
// }

[slot="label"] {
    display: flex;
    align-items: center;
    gap: 1em;
}
`;
var DialogoModal = class extends HTMLElement {
  static TAG = "virto-dialog";
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(dialogTp.content.cloneNode(true));
    const style = document.createElement("style");
    style.textContent = dialogCss;
    this.shadowRoot.appendChild(style);
    this.dialog = this.shadowRoot.querySelector("wa-dialog");
    this.dialog.open = false;
  }
  connectedCallback() {
    const nextButton = document.querySelector("[data-dialog='next']");
    const closeButton = document.querySelector("[data-dialog='close']");
    nextButton.addEventListener("click", () => this.next());
    closeButton.addEventListener("click", () => this.close());
  }
  async open() {
    await this.dialog.updateComplete;
    this.dialog.open = true;
  }
  async close() {
    await this.dialog.updateComplete;
    this.dialog.open = false;
  }
  async next() {
    const allDialogs = document.querySelectorAll("virto-dialog");
    const currentIndex = Array.from(allDialogs).indexOf(this);
    if (currentIndex + 1 < allDialogs.length) {
      await this.close();
      await allDialogs[currentIndex + 1].open();
    }
  }
};
customElements.define(DialogoModal.TAG, DialogoModal);

// src/web-awesome-based/tag.js
var tagTp = html`
  <wa-tag>
    <slot></slot>
  </wa-tag>
`;
var tagCss = css`
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
`;
var TagVirto = class _TagVirto extends HTMLElement {
  static get TAG() {
    return "virto-tag";
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(tagTp.content.cloneNode(true));
    const style = document.createElement("style");
    style.textContent = tagCss;
    this.shadowRoot.appendChild(style);
    this.waTag = this.shadowRoot.querySelector("wa-tag");
    this.updateTag();
  }
  static get observedAttributes() {
    return ["variant", "appearance", "size", "pill", "removable"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.updateTag();
  }
  updateTag() {
    if (this.waTag) {
      _TagVirto.observedAttributes.forEach((attr) => {
        if (this.hasAttribute(attr)) {
          this.waTag.setAttribute(attr, this.getAttribute(attr));
        } else {
          this.waTag.removeAttribute(attr);
        }
      });
    }
  }
  connectedCallback() {
    this.waTag.addEventListener("wa-remove", this.handleRemove.bind(this));
  }
  disconnectedCallback() {
    this.waTag.removeEventListener("wa-remove", this.handleRemove.bind(this));
  }
  handleRemove(event) {
    this.dispatchEvent(
      new CustomEvent("virto-remove", {
        bubbles: true,
        composed: true
      })
    );
  }
};
customElements.define(TagVirto.TAG, TagVirto);

// src/web-awesome-based/switch.js
var switchTp = html`
  <wa-switch>
    <slot></slot>
  </wa-switch>
`;
var switchCss = css`
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
`;
var SwitchVirto = class _SwitchVirto extends HTMLElement {
  static get TAG() {
    return "virto-switch";
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(switchTp.content.cloneNode(true));
    const style = document.createElement("style");
    style.textContent = switchCss;
    this.shadowRoot.appendChild(style);
    this.waSwitch = this.shadowRoot.querySelector("wa-switch");
    this.updateSwitch();
  }
  static get observedAttributes() {
    return ["checked", "disabled", "size", "hint", "name", "value", "required"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.updateSwitch();
  }
  updateSwitch() {
    if (this.waSwitch) {
      _SwitchVirto.observedAttributes.forEach((attr) => {
        if (this.hasAttribute(attr)) {
          this.waSwitch.setAttribute(attr, this.getAttribute(attr));
        } else {
          this.waSwitch.removeAttribute(attr);
        }
      });
    }
  }
  connectedCallback() {
    this.waSwitch.addEventListener("change", this.handleChange.bind(this));
  }
  disconnectedCallback() {
    this.waSwitch.removeEventListener("change", this.handleChange.bind(this));
  }
  handleChange(event) {
    this.dispatchEvent(
      new CustomEvent("virto-change", {
        bubbles: true,
        composed: true,
        detail: {
          checked: event.target.checked
        }
      })
    );
  }
};
customElements.define(SwitchVirto.TAG, SwitchVirto);

// src/web-awesome-based/avatar.js
var avatarTp = html`
  <wa-avatar>
    <slot name="icon"></slot>
  </wa-avatar>
`;
var avatarCss = css`
  :host {
    display: inline-block;
  }
  wa-avatar {
    --background-color: var(--extra-light-green);
    --text-color: var(--darkslategray);
    --size: 48px;
    font-family: var(--font-primary);
  }

  wa-avatar::part(base) {
    transition: all 0.2s ease-out;
  }

  wa-avatar::part(icon) {
    color: var(--green);
  }

  wa-avatar::part(initials) {
    font-weight: 600;
  }

  wa-avatar::part(image) {
    object-fit: cover;
  }

  :host([shape="square"]) wa-avatar {
    --border-radius: 0;
  }

  :host([shape="rounded"]) wa-avatar {
    --border-radius: 4px;
  }

  :host(:hover) wa-avatar::part(base) {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  /* Sizes */
  :host([size="small"]) wa-avatar {
    --size: 32px;
  }

  :host([size="large"]) wa-avatar {
    --size: 64px;
  }
`;
var AvatarVirto = class _AvatarVirto extends HTMLElement {
  static get TAG() {
    return "virto-avatar";
  }
  static get observedAttributes() {
    return ["image", "label", "initials", "loading", "shape", "size"];
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(avatarTp.content.cloneNode(true));
    const style = document.createElement("style");
    style.textContent = avatarCss;
    this.shadowRoot.appendChild(style);
    this.waAvatar = this.shadowRoot.querySelector("wa-avatar");
    this.updateAvatar();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.updateAvatar();
  }
  updateAvatar() {
    if (this.waAvatar) {
      _AvatarVirto.observedAttributes.forEach((attr) => {
        if (this.hasAttribute(attr)) {
          this.waAvatar.setAttribute(attr, this.getAttribute(attr));
        } else {
          this.waAvatar.removeAttribute(attr);
        }
      });
    }
  }
  connectedCallback() {
    this.waAvatar.addEventListener("wa-error", this.handleError.bind(this));
  }
  disconnectedCallback() {
    this.waAvatar.removeEventListener("wa-error", this.handleError.bind(this));
  }
  handleError(event) {
    this.dispatchEvent(
      new CustomEvent("virto-avatar-error", {
        bubbles: true,
        composed: true,
        detail: event.detail
      })
    );
  }
};
customElements.define(AvatarVirto.TAG, AvatarVirto);
