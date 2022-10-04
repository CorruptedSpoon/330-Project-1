const template = document.createElement('template');
template.innerHTML=`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <p id="q" class="has-text-light"></p><br>
    <p id="text" class="has-text-light"></p>
    <div class="columns">
        <div class="column is-narrow">
        <div class="control">
            <button id="clear" class="button is-dark">Remove Favorite</button>
        </div>
        </div>
    </div>
`;

class FavoriteComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.text = this.shadowRoot.querySelector('#text');
        this.q = this.shadowRoot.querySelector('#q');
        this.clear = this.shadowRoot.querySelector('#clear');

        this.clear.onclick = () => { 
            let favorites = localStorage.getItem('favorites');
            favorites = favorites.replace(`${this.dataset.text}__split__${this.dataset.question}__split__`, '');
            localStorage.setItem('favorites', favorites);
            this.remove();
        };
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

customElements.define('favorite-component', FavoriteComponent);