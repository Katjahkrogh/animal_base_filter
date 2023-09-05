"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons
  registerButtons();
  loadJSON();
}

// Funktion der vælger alle vores knapper med data-action "filter", og tilføjer eventlistner til dem:
function registerButtons() {
  document.querySelectorAll("[data-action='filter']").forEach((btn) => {
    btn.addEventListener("click", selectFilter);
  });
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first
  displayList(allAnimals);
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

// Denne funktion laves først her, da vi skal indlæse json data først
function selectFilter(evt) {
  // Definere filter alt efter target dvs. alt efter hvad der klikkes på
  const filter = evt.target.dataset.filter;
  // Log der tjekker om det rigtige filter tilføjes, når man klikker på den enkelte knap
  console.log(`user select ${filter}`);

  //Kalder på filtrerings funktion og tilføjer det definerede filter
  filterList(filter);
}

// Funktion der filtrere allAnimals og leder efter de specifikke data-filtre "cat" og "dog"
function filterList(filterBy) {
  let filteredList = allAnimals;
  if (filterBy === "cat") {
    // Laver liste der kun viser katte
    filteredList = allAnimals.filter(isCat);
  } else if (filterBy === "dog") {
    // Laver liste der kun viser hunde
    filteredList = allAnimals.filter(isDog);
  }

  // Kalder displayList funktionen men tilføjer filtrerings parameteret "filteredList"
  displayList(filteredList);
}

// Funktion der filtrere og returnere alle de dyr der er type "cat"
function isCat(animal) {
  return animal.type === "cat";
}

// Funktion der filtrere og returnere alle de dyr der er type "dog"
function isDog(animal) {
  return animal.type === "dog";
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
