import "./main.js";
import { html, css } from './utils.js';

// isnt this too complex?2
const dialogTp = html`
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

const dialogCss = css`
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

export class DialogoModal extends HTMLElement {
    static TAG = 'virto-dialog';
 
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(dialogTp.content.cloneNode(true));

        const style = document.createElement('style');
        style.textContent = dialogCss;
        this.shadowRoot.appendChild(style);

        this.dialog = this.shadowRoot.querySelector('wa-dialog');
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
}

if (!customElements.get(DialogoModal.TAG)) {
  customElements.define(DialogoModal.TAG, DialogoModal);
}