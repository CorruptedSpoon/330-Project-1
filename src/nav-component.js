const template = document.createElement('template');
template.innerHTML=`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <nav class="navbar is-dark">
    <div class="navbar-brand">
        <a class="navbar-item">
            <img src="images/icon.png" alt="icon" style="max-height: 70px" class="py-2 px-2">
        </a>
        <a class="navbar-burger " id="burger">
            <span></span>
            <span></span>
            <span></span>
        </a>
    </div>
    <div class="navbar-menu" id="nav-links">
        <div class="navbar-start is-size-5">
            <a href="index.html" class="navbar-item" id="home">Home</a>
            <a href="app.html" class="navbar-item" id="app">App</a>
            <a href="favorites.html" class="navbar-item" id="favorites">Favorites</a>
            <a href="sources.html" class="navbar-item" id="sources">Sources</a>
        </div>
    </div>
    </nav>
`;

class NavComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const burger = this.shadowRoot.querySelector('#burger');
        const navbarMenu = this.shadowRoot.querySelector('#nav-links');

        burger.onclick = () => {
            navbarMenu.classList.toggle('is-active');
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
        return ["data-current"];
    }

    render(){
        const currentPageElement = this.shadowRoot.querySelector(`#${this.dataset.current.toLowerCase()}`) || this.shadowRoot.querySelector("#home");
        currentPageElement.classList.add("has-text-danger");
    }
}

customElements.define('nav-component', NavComponent);