
const todayCaloriesText = document.querySelector("#today-calories")
const mealCaloriesInput = document.querySelector("#meal-kcal")
const form = document.querySelector("form")

const meals = JSON.parse(localStorage.getItem("meals")) ?? {}

if (Object.keys(meals).length === 0 && new Date() === new Date("2024-01-27")) {
    meals = {
        "26.01.2024": [{
            "name": "Dunno",
            "kcal": 2005
        }],
    
        "27.01.2024": [{
            "name": "Rogalik",
            "kcal": 210
        },
        {
            "name": "Kanapki",
            "kcal": 400
        },
        {
            "name": "Kawa",
            "kcal": 40
        },
        {
            "name": "Rosół",
            "kcal": 150
        },
        {
            "name": "Chleb",
            "kcal": 165
        },
        {
            "name": "Toffifee",
            "kcal": 45
        }]
    }
}

let todayCalories = 0

function updateCalories(calories) {
    if (calories) todayCalories += calories
    todayCaloriesText.innerText = todayCalories
}

function saveToLocalStorage() {
    localStorage.setItem("meals", JSON.stringify(meals))
}

function getDate(newdate) {
    const date = new Date()
    if (newdate) date.setDate(date.getDate() + newdate)
    
    const hours = date.getHours();
    if (hours >= 0 && hours < 6) date.setDate(new Date(date).getDate() - 1);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return  `${day}.${month}.${year}`;
}

if (meals[getDate()]) meals[getDate()].forEach(meal => updateCalories(meal.kcal))
updateCalories()

form.addEventListener("submit", e => {
    e.preventDefault()

    const mealName = document.querySelector("#meal-name").value
    if (!mealName) return
    let mealKcal = Number(document.querySelector("#meal-kcal").value)

    const today = getDate()

    if (meals[today] == undefined) meals[today] = []

    meals[today].push({
        name: mealName,
        kcal: mealKcal,
    });
    
    updateCalories(mealKcal)
    form.reset()
    saveToLocalStorage()
    idk()
})


const articles = document.querySelector(".articles")
const avg = document.querySelector(".avg")

let average = 0, averageCount = 0;
// {
//     name: mealName,
//     kcal: mealKcal,
//     date: new Date().toDateString()
// }


function idk() {
    let average = 0, averageCount = 0;
    articles.innerHTML = ""

    for (let [date, mealss] of Object.entries(meals)) {

        let dayKcals = 0
    
        const article = document.createElement("article")
        article.classList.add("header")
        articles.appendChild(article)
    
        for (const meal of mealss) {
            dayKcals += meal.kcal
        }
    
        if (getDate() !== date) {
            article.style = "order: 9999;"
        }

        if (getDate() === date) date = "Dzisiaj";
        if (getDate(-1) === date) date = "Wczoraj";
        if (getDate(-2) === date) date = "Przedwczoraj";
    
       
        article.innerHTML = `
                <span>${date}</span>
                <span>${dayKcals} kcal</span>
        `
    
        if (date === "Dzisiaj")  {
            for (const meal of mealss) {
                console.log("XDASDSA");
    
                let articleMeal = document.createElement("article")
                articleMeal.classList.add("header")
                articleMeal.classList.add("white")
    
                articleMeal.innerHTML = `
                    <span> ${meal.name}</span>
                    <span>${meal.kcal} kcal</span>
                `
                articles.appendChild(articleMeal)
            }
        }
        
        average += dayKcals;
        averageCount++;
    }
    console.log(average, averageCount);
    avg.innerText = `${!average ? "0" : Number(average / averageCount).toFixed(0)}`
}

idk()