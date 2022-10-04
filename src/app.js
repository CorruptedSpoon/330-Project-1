import "./nav-component.js";
import "./footer-component.js";
import "./answer-component.js";

let button = document.querySelector('#search-button');
let search = document.querySelector('#search-field');
let number = 3;
let answers = document.querySelector('#answers');
let query = "";
let urls;
let sources = document.querySelector('#sources');

button.onclick = () => searchCallback();

function searchCallback(){
    console.log("pressed");
    button.classList.add("is-loading");
    query = search.value;
    number = document.querySelector('#num').value
    getSearchResponse(query.replaceAll(' ', '+'));
}

function getSearchResponse(query){
    fetch(`https://google-search3.p.rapidapi.com/api/v1/search/q=${query}&num=100&lr=lang_en&hl=en&cr=US`, {
        "method": "GET",
        "headers": {
            "x-user-agent": "desktop",
            "x-rapidapi-key": "c5db000758mshbefedcfb79b5b54p17b783jsnc1463b185881",
            "x-rapidapi-host": "google-search3.p.rapidapi.com"
        }
    })
    .then(response => {
        response.json()
        .then(json => {
            console.log(json.results[0].link);
            console.log(number);
            urls = json.results;
            getSummarizedResult(urls[0]);
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });
}

function getSummarizedResult(url){
    button.classList.add("is-loading");
    let newUrl = url.link.replaceAll(':', '%3A').replaceAll('/', '%2F');
    console.log(newUrl);

    fetch(`https://meaningcloud-summarization-v1.p.rapidapi.com/summarization-1.0?sentences=${number}&url=${newUrl}`, {
	"method": "GET",
	"headers": {
		"accept": "application/json",
		"x-rapidapi-key": "c5db000758mshbefedcfb79b5b54p17b783jsnc1463b185881",
		"x-rapidapi-host": "meaningcloud-summarization-v1.p.rapidapi.com"
	}
    })
    .then(response => {
        response.json()
        .then(json => {
            createAnswerComponent(json.summary);
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.error(err);
    });
}

function createAnswerComponent(text){
    const sentences = text.split(".", number);
    let paragraph = "";
    sentences.forEach(e => {paragraph = `${paragraph}${e}. `});
    
    const answerHTML = `
        <answer-component class="column is-one-third" data-text="${text}" data-question="${query}"></answer-component>
    `;
    answers.innerHTML = answerHTML + answers.innerHTML;
    sources.innerHTML = "Need a different source?";
    for(let i=0;i<5;i++){
        let currentAnchor = document.querySelector(`#a${i+1}`);
        currentAnchor.innerHTML = urls[i+1].title;
        currentAnchor.onclick = () => {getSummarizedResult(urls[i+1], number)};
    }
    button.classList.remove("is-loading");
}