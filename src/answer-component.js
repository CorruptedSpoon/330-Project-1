const template = document.createElement('template');
template.innerHTML=`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <p id="q" class="has-text-light"></p><br>
    <p id="text" class="has-text-light"></p>
    <div class="columns">
        <div class="column is-narrow">
        <div class="control">
            <button id="favorite" class="button is-dark">Favorite</button>
        </div>
        </div>
        <div class="column is-narrow">
        <div class="control">
            <button id="clear" class="button is-dark">Clear</button>
        </div>
        </div>
    </div>
`;

class AnswerComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.text = this.shadowRoot.querySelector('#text');
        this.q = this.shadowRoot.querySelector('#q');
        this.fav = this.shadowRoot.querySelector('#favorite');
        this.clear = this.shadowRoot.querySelector('#clear');

        this.fav.onclick = () => {
            let favorites = localStorage.getItem('favorites');
            favorites = favorites + `${this.dataset.text}__split__${this.dataset.question}__split__`;
            localStorage.setItem('favorites', favorites);
        };
        this.clear.onclick = () => { this.remove();};
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }

    static get observedAttributes(){
        return ["data-text", "data-question"];
    }

    render(){
        const question = `Q: ${this.dataset.question}`;
        const answer = `A: ${this.dataset.text}` || "The API was unable to figure this question out, try rephrasing or choosing a different page.";
        this.text.innerHTML = answer;
        this.q.innerHTML = question;
    }
}

customElements.define('answer-component', AnswerComponent);