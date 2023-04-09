// Global Variables
var countriesListDropDown;
window.addEventListener('load', setup);
function setup() {
    console.log("setup function");
    countriesListDropDown = document.getElementById("countries");
    countriesListDropDown.addEventListener("change", newCountrySelection);
    fetchListOfCountries();
}
function fetchListOfCountries() {
    // listOfCountries = ["Country 01", "Country 02", "Country 03"];
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            let listOfCountries = getListOfCountries(data);
            initializeDropDown(listOfCountries);
        })
}
function getListOfCountries(data) {
    let listOfCountries = [];
    for (let i = 0; i < data.length; i++) {
        listOfCountries.push(data[i].name.common);
    }
    return listOfCountries.sort();
}
function initializeDropDown(listOfCountries) {
    let options = "";
    for (let i = 0; i < listOfCountries.length; i++) {
        options += `<option value="${listOfCountries[i]} ">${listOfCountries[i]}
 </option>`;
    }
    countriesListDropDown.innerHTML = options;
    countriesListDropDown.selectedIndex = Math.floor(Math.random() *
        listOfCountries.length);
    displayCountryInfo(countriesListDropDown[countriesListDropDown.
        selectedIndex].value);
}
function newCountrySelection(event) {
    displayCountryInfo(event.target.value);
}
function displayCountryInfo(countryName) {
    let url = `https://restcountries.com/v3.1/name/${countryName}`
    fetch(url)
        .then(res => res.json())
        .then(countryData => {
            data = countryData[0];
            document.getElementById("flag-container").src = data.flags.png;
            document.getElementById("flag-container").alt = `Flag of
    ${countryName}`;
            document.getElementById("capital").innerHTML = data.capital;
            document.getElementById("population").innerHTML =
                data.population.toLocaleString("en-US");

            let key = Object.keys(data.currencies)[0];
            let currencyName = data.currencies[key].name;
            let currencySymbol = data.currencies[key].symbol;
            document.getElementById("currencies").innerHTML = `${currencyName}
    - ${currencySymbol}`;
            document.getElementById("region").innerHTML = data.region;
            document.getElementById("subregion").innerHTML = data.subregion;
            document.getElementById("googleMap").href = data.maps.googleMaps;
        })
}