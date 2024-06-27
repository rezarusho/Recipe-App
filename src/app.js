const searchMeal = document.getElementById("input");
// console.log(searchMeal.value);

function fetchMeal() {
  if (searchMeal.value) {
    console.log(searchMeal.value);
    let URL = `https://themealdb.com/api/json/v1/1/search.php?s=${searchMeal.value}`;
    fetch(URL)
      .then((res) => res.json())
      .then((meals) => showMeal(meals.meals));
    document.getElementById("noMeal").style.display = "none";
    document.querySelector(".meal-wrapper").innerHTML = "";
  } else {
    alert("Search for a food first.");
    document.getElementById("noMeal").style.display = "block";
  }
}

function showMeal(meals) {
  console.log("Show Meal:", meals);
  for (let meal of meals) {
    document.querySelector(
      ".meal-wrapper"
    ).innerHTML += `  <div class="meal-box border border-gray-500 rounded-[10px]">
          <img
            src=${meal.strMealThumb}
            alt=${meal.strMeal}
            class="rounded-t-[10px] h-[230px] w-full object-cover"
          />
        <div class="p-3">
          <h3 class="heading">${meal.strMeal}</h3>
          <p class="text-gray-200 my-2">
            ${meal.strInstructions.slice(0, 100)} ...
          </p>
          <p class="text-gray-500 italic"> <span>${meal.strArea}</span> <span>${
      meal.strCategory
    }</span></p>
          <div class="my-4">
            <a href=${meal.strYoutube}  target="_blank" class="btn">Watch</a>
            <button class="px-3 text-white" onclick="lookupDetails('${
              meal.idMeal
            }')">View Recipe</button>
            </div>
        </div>
      </div>
    `;
  }
}

function lookupDetails(id) {
  console.log("Look Up", id);
  let URL = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((meals) => showMealDetails(meals.meals[0]));
}

function showMealDetails(meal) {
  console.log(meal);
  const details = document.getElementById("details");
  details.classList.add("visible");
  details.classList.remove("invisible");
  details.innerHTML = `
  <div class="popup bg-white w-[70%] min-h-[500px] p-10">
                    <h2 class="text-2xl font-bold mb-4">${meal.strMeal}</h2>
                    <p class="mb-6">${meal.strInstructions}</p>
                    <a class="btn mr-[6px]" href=${meal.strYoutube} class="px-4 py-2 bg-gray-800 text-white rounded">Watch</a>
        <button class="close-btn" onclick="closeDetails()">Close</button>
                </div>`;
}

function closeDetails() {
  details.classList.add("invisible");
  details.classList.remove("visible");
}

const search = document.getElementById("search");
search.addEventListener("click", () => {
  fetchMeal();
});
