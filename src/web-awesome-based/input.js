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

export class Input extends HTMLElement {
    static TAG = 'virto-input'

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.append(inputTp.content.cloneNode(true));

        const style = document.createElement('style');
        style.textContent = inputCss;
        shadow.appendChild(style);
    }

}

customElements.define(Input.TAG, Input);