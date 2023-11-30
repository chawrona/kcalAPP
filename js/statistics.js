const days = JSON.parse(localStorage.getItem("meals")) ?? {}
const main = document.querySelector("main")
const yellowgreen = document.querySelector("#yellowgreen")
const green = document.querySelector("#green")
const orange = document.querySelector("#orange")
const red = document.querySelector("#red")
const avg = document.querySelector(".average")
let yellowgreenCount = 0, greenCount = 0, orangeCount = 0, redCount = 0;
let average = 0, averageCount = 0;
// {
//     name: mealName,
//     kcal: mealKcal,
//     ingredients,
//     wage: mealWage,
//     date: new Date().toDateString()
// }


for (const [date, meals] of Object.entries(days)) {
    console.log(date, meals);
    let dayKcals = 0
    const article = document.createElement("article")
    article.classList.add("day")
    main.appendChild(article)
    let mealSections = "";

    for (const meal of meals) {
        let ingredients = ""

        for (const ingredient of meal.ingredients) {
            ingredients += `
                <div class="meal-ingredient">
                    <h3>${ingredient.name} ${ingredient.wage}g</h3>
                    <p>${ingredient.kcal}kcal</p>
                </div>
            `
        }

        mealSections += `
            <section class="meal">
                    <header class="meal-header">
                        <h2>${meal.name}</h2>
                        <p>${meal.kcal === 0 ? "" : meal.kcal + "kcal"}</p>
                    </header>
                    <section class="meal-ingredients">
                        ${ingredients}
                    </section>
            </section>`

        dayKcals += meal.kcal
    }

    article.innerHTML = `
            <header class="day-header">
                <p class="day-date">${date}</p>
                <p class="day-calories">${dayKcals}kcal</p>
            </header>
            ${mealSections}
    `

    if (dayKcals <= 1800) {
        yellowgreenCount++
        article.classList.add("yellowgreen")
    }
    else if (dayKcals <= 2000 ) {
        greenCount++
        article.classList.add("green")
    }
    else if (dayKcals <= 2100) {
        orangeCount++;
        article.classList.add("orange")
    }
    else {
        redCount++
        article.classList.add("red")
    }

    average += dayKcals;
    averageCount++;
}


avg.innerText = `Średnia: ${!average ? "0" : Number(average / averageCount).toFixed(0)}`
yellowgreen.innerText = yellowgreenCount
green.innerText = greenCount
orange.innerText = orangeCount
red.innerText = redCount

main.scrollLeft = main.offsetWidth;