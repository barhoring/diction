const getPromise = require("./translation.js");
console.log(getPromise);

const { shell, remote } = require("electron");
// const systemPreferences = remote.systemPreferences;
const systemPreferences = remote.systemPreferences;

const newLinkUrl = document.querySelector("#new-link-url");
const newLinkSubmit = document.querySelector(".new-link-form--submit");
const newLinkForm = document.querySelector(".new-link-form");
const linkTemplate = document.querySelector("#link-template");
const linksSection = document.querySelector(".links");

linksSection.addEventListener("click", event => {
  if (event.target.href) {
    event.preventDefault();
    shell.openExternal(event.target.href);
  }
});
// newLinkUrl.addEventListener("keyup", () => {
//   newLinkSubmit.disabled = !newLinkUrl.validity.valid;
// });

const parser = new DOMParser();
const parseResponse = text => parser.parseFromString(text, "text/html");
const findTitle = nodes => nodes.querySelector("title").textContent;
const external_trans_service = () => {};

const addToPage = word_source => {
  // const temp1 = external_trans_service();
  let p = getPromise(word_source);
  p.then(function(value) {
    const newLink = linkTemplate.content.cloneNode(true);
    const titleElement = newLink.querySelector(".link--title");
    // const pElement = newLink.querySelector("#translation");
    // const pElement = document.querySelector("#translation");
    const pElement = newLink.querySelector(".translation");
    debugger;
    console.log(pElement);
    const urlElement = newLink.querySelector(".link--url");

    titleElement.textContent = word_source;
    // titleElement.textContent = title;
    urlElement.href = `http://www.morfix.co.il/${word_source}`;
    pElement.textContent = value;

    linksSection.appendChild(newLink);
    // return { title, url };
  });
};

newLinkForm.addEventListener("submit", () => {
  event.preventDefault();
  const word_source = newLinkUrl.value;

  addToPage(word_source);
});

window.addEventListener("load", () => {
  if (systemPreferences.isDarkMode()) {
    document.querySelector("link").href = "styles-dark.css";
  }
});
