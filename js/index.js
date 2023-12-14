
const todayCaloriesText = document.querySelector("#today-calories")
const addIngredients = document.querySelector("#add-ingredients")
const mealCaloriesInput = document.querySelector("#meal-kcal")
const ingredientsWrap = document.querySelector(".ingredients")
const addIngredient = document.querySelector("#add-ingredient")

const form = document.querySelector("form")
const motivationalText = document.querySelector("h3")
const meals = JSON.parse(localStorage.getItem("meals")) ?? {}
let todayCalories = 0
let deleteIndex = 1;

function sumCalories() {
    calories = 0
    document.querySelectorAll(".kcal").forEach((kcal) => {
        calories += Number(kcal.value)
    })
    mealCaloriesInput.value = calories
}

function updateCalories(calories) {
    if (calories) todayCalories += calories
    todayCaloriesText.innerText = todayCalories
    if (todayCalories < 1900 || todayCalories > 2300) todayCaloriesText.style = "color: red"
    if (todayCalories < 1975  || todayCalories > 2215) todayCaloriesText.style = "color: orange"
    if (todayCalories < 2025 || todayCalories > 2175) todayCaloriesText.style = "color: green"
}

function isToday(date) {
    return `${new Date().toDateString()}` === `${date}`
}

function saveToLocalStorage() {
    localStorage.setItem("meals", JSON.stringify(meals))
}

function getDate(date) {
    const hours = date.getHours();

    if (hours >= 0 && hours < 6) {
        date.setDate(new Date(date).getDate() - 1);
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return  `${day}.${month}.${year}`;
}


if (meals[getDate(new Date())]) meals[getDate(new Date())].forEach(meal => {updateCalories(meal.kcal)})

updateCalories()

addIngredients.addEventListener("click", ()=>{
    mealCaloriesInput.toggleAttribute("disabled")
    ingredientsWrap.classList.toggle("hidden")
})

addIngredient.addEventListener("click", ()=> {
    const div = document.createElement("div")
    div.innerHTML = `
    <div class="ingredient-wrap">
        <h3>Składnik #${++deleteIndex}</h3>
        <img src="./src/delete-button.png" class="delete-button" alt="" id="delete-${deleteIndex}">
    </div>
    <label for="ingredient-name-${deleteIndex}">
        Dodaj składnik:
        <input type="text" class="name" id="ingredient-name-${deleteIndex}">
    </label>

    <label for="ingredient-wage-${deleteIndex}">
        Waga:
        <input type="number" class="wage" id="ingredient-wage-${deleteIndex}">
    </label>

    <label for="ingredient-kcal-${deleteIndex}">
        Kalorie:
        <input type="number" class="kcal" id="ingredient-kcal-${deleteIndex}">
    </label>`

    div.classList.add("ingredient")
    div.querySelector("img").addEventListener("click", () => {
        div.remove()
    })

    div.querySelector(".kcal").addEventListener("input", sumCalories)

    ingredientsWrap.appendChild(div)
})

form.addEventListener("submit", e => {
    e.preventDefault()

    const mealName = document.querySelector("#meal-name").value
    if (!mealName) return
    let mealKcal = Number(document.querySelector("#meal-kcal").value)
    let mealWage = 0
    const ingredients = []
    if (addIngredients.checked) {
        let sumOfIngredientsWage = 0
        const ingredientDivs = [...document.querySelectorAll(".ingredient")]
        ingredientDivs.forEach(div => {
            kcal = Number(div.querySelector(".kcal").value)
            wage = Number(div.querySelector(".wage").value)
            ingredients.push({
                name: div.querySelector(".name").value,
                wage,
                kcal,
            })
            sumOfIngredientsWage += wage
        });
        mealWage = sumOfIngredientsWage
        
    } 
    const today = getDate(new Date())
    if (meals[today] == undefined) meals[today] = []
    meals[today].push({
        name: mealName,
        kcal: mealKcal,
        ingredients,
        wage: mealWage,
    });
    
    updateCalories(mealKcal)
    form.reset()
    saveToLocalStorage()
})

document.querySelector(".kcal").addEventListener("input", sumCalories)