// Global Variables
window.addEventListener('load', setup);
function setup() {
    console.log("setup function");
    newDrinkBtn = document.getElementById("new-drink-btn");
    newDrinkBtn.addEventListener("click", newDrinkClicked);
    getRandomDrink();
}
function getRandomDrink() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            displayDrinkInfo(data);
        })
}

function newDrinkClicked() {
    getRandomDrink();
}

function displayDrinkInfo(data) {
    document.getElementById("drink-img-container").src = data.drinks[0].strDrinkThumb;
    document.getElementById("drink-name").innerHTML = data.drinks[0].strDrink;
    if (data.drinks[0].strAlcoholic == "Alcoholic") {
        document.getElementById("alcoholic").innerHTML = "yes";
    } else {
        document.getElementById("alcoholic").innerHTML = "no";
    }
    document.getElementById("drink-category").innerHTML = data.drinks[0].strCategory;
    document.getElementById("instructions").innerHTML = data.drinks[0].strInstructions;
    const ingredientsList = document.getElementById('ingredients-list');

    if (ingredientsList.childNodes.length > 0) {
        const listItems = ingredientsList.querySelectorAll('li');
        for (let item of listItems) {
            item.remove();
        }
    }

    const ingredients = [];
    const measures = [];

    for (let key in data.drinks[0]) {
        if (key.startsWith('strIngredient') && data.drinks[0][key] !== null) {
            ingredients.push(data.drinks[0][key]);
        } else if (key.startsWith('strMeasure') && data.drinks[0][key] !== null) {
            measures.push(data.drinks[0][key]);
        }
    }

    for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        const measure = measures[i];
        const li = document.createElement('li');
        if (measure === undefined) {
            li.textContent = `${ingredient}`;
        } else {
            li.textContent = `${ingredient} - ${measure}`;
        }
        ingredientsList.appendChild(li);
    }
}
