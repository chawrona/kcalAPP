const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const year = currentDate.getFullYear();
const formattedDate = `${day}.${month}.${year}`;
document.querySelector("h1").innerHTML = `Dziś jest: <span class="accent">${formattedDate}</span>`


