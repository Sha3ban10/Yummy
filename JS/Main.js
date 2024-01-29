$(document).ready(function () {
    $('.loading').removeClass('d-none')
    let x = $(".Bar").offset();
    $("aside").animate({ left: `-${x.left}px` });
    $(".Links .UL-Links ul a").animate({ top: "300px" })
    $(".Bar .icon a i").attr("class", "fa-solid fa-bars fs-2");
    getAPI()
});
// -------------- A-Side-----------

$(".Bar .icon a").click(function () {
    let x = $(".Bar").offset();
    if ($("aside").left = x.left) {
        $("aside").animate({ left: `-${x.left}px` });
        $(".Links .UL-Links ul a").animate({ top: "300px" })
        $(".Bar .icon a i").attr("class", "fa-solid fa-bars fs-2");
    }
    else {
        $("aside").animate({ left: `${x.left}px` })
        for (i = 0; i <= 4; i++) {
            $(".Links .UL-Links ul a").eq(i).animate({ top: "0px" }, (i + 5) * 100)
        }
        $(".Bar .icon a i").attr("class", "fa-solid fa-x fs-2")
    }
})


// API

// Home 
async function getAPI() {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s")
    const result = await res.json()
    Home(result.meals);
}

// By ID

async function GetAPIByID(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const result = await res.json()
    displayGamesDetails(result.meals[0]);
}

// By Search By name

async function GetAPIByName(name) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    const result = await res.json()
    if (result.meals) {
        Home(result.meals)
        $('.homeMeals').removeClass('d-none')
    }
    else {
        $('.homeMeals').addClass('d-none')
    }
}

// By Search By First Letter

async function GetAPIByFirstLetter(name) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`)
    const result = await res.json()
    if (result.meals) {
        Home(result.meals)
        $('.homeMeals').removeClass('d-none')
    }
    else {
        $('.homeMeals').addClass('d-none')
    }
}




//  Home - Details

function Home(result) {
    let box = ``;
    for (let i = 0; i < result.length; i++) {
        box += `
        <div class="col-md-3 d-flex gap-5" >
                    <div class="card text-bg-dark overflow-hidden position-relative" id="${result[i].idMeal}">
                        <img src="${result[i].strMealThumb}" class="card-img" alt="...">
                        <div class="card-img-overlay d-flex align-items-center h-100">
                            <h5 class="card-title text-black ">${result[i].strMeal}</h5>
                        </div>
                    </div>
                </div>
        `
    }
    $(".homeMeals").html(`${box}`);
    $('.homeMeals .card').css("cursor", "pointer")
    $('.loading').addClass('d-none')
    $('body').removeClass('overflow-hidden')
    getDetails()
    GetAPIBycategories()
    GetAPIByArea()
    GetAPIByIngredients()
}

// Meal Detalis

function displayGamesDetails(result) {
    $('.categoryMeal').addClass('d-none')
    $('.AreaMeal').addClass('d-none')
    $('.IngredientsMeal').addClass('d-none')
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (result[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${result[`strMeasure${i}`]} ${result[`strIngredient${i}`]}</li>`
        }
    }
    let tags = result.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let box = `
    <div class="container p-4">
    <div class="d-flex justify-content-between fs-4 ">
        <p>Meal Details </p>
        <i class="btn-close btn-close-white fs-6"></i>
    </div>
    <div class="row">
        <div class="col-md-4">
            <img src="${result.strMealThumb}" alt="" style="width: 100%;">
            <h2>${result.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${result.strInstructions}</p>
            <h3>Area : <span class="h3">${result.strArea}</span> </h3>
            <h3>Category : <span class="h3">${result.strCategory}</span> </h3>
            <div>
                <h3>Recipes :</h3>
                 <ul class="list-unstyled d-flex flex-wrap">
                 ${ingredients}
                 </ul>
            </div>
            <div>
                <h3 class="p-2">Tags :</h3>
                <ul class="list-unstyled d-flex flex-wrap">
                ${tagsStr}
                 </ul>
                <a class="btn btn-outline-success" target="_blank" href="${result.strSource}">Source</a>
                <a class="btn btn-outline-danger" target="_blank" href="${result.strYoutube}">YouTube</a>
            </div>
        </div>
    </div>
    `
    $('.MealDetails').html(box)
    $('.MealDetails').removeClass('d-none')
    $('.homeMeals').addClass('d-none')
    ShowMeals()
}
function getDetails() {
    $('.card').click(function () {
        const id = $(this).attr("id")
        GetAPIByID(id);
    })
}

function ShowMeals() {
    $('.btn-close').click(function () {
        $('.MealDetails').addClass('d-none')
        $('.homeMeals').removeClass('d-none')
        $('.categoryMeal').removeClass('d-none')
        $('.AreaMeal').removeClass('d-none')
        $('.IngredientsMeal').removeClass('d-none')
    }
    )
}

// -------- Search -------------------
$(".UL-Links li").click(function () {
    let x = $(".Bar").offset();
    $("aside").animate({ left: `-${x.left}px` });
    $(".Bar .icon a i").attr("class", "fa-solid fa-bars fs-2");
    $('.Home').addClass('d-none')
    $('.homeMeals').addClass('d-none')
    $('.categoryMeal').addClass('d-none')
    $('.category').removeClass('d-none')
    $('.AreaMeal').addClass('d-none')
    $('.AreaList').removeClass('d-none')
    $('.IngredientsMeal').addClass('d-none')
    $('.IngredientsList').removeClass('d-none')
    let arr = $('.UL-Links a').text().split(/(?=[A-Z])/)
    for (i = 0; i < arr.length; i++) {
        $(`.${arr[i]}`).addClass('d-none')
    }
    $(`.${$(this).text()}`).removeClass('d-none')

})

// ByName 

$("#searchName").keyup(function (e) {
    GetAPIByName(e.target.value)
})

// ByFirstLetter 

$("#searchFLetter").keyup(function (e) {
    GetAPIByFirstLetter(e.target.value)
})

// Categories

async function GetAPIBycategories() {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    const result = await res.json()
    Showcategories(result.categories);
}

async function GetAPIBycategoriesMeal(name) {
    $('.category').addClass('d-none')
    $('.categoryMeal').removeClass('d-none')
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
    const result = await res.json()
    ShowcategoriesMeal(result.meals)
}

function getMeals() {
    $('.card').click(function () {
        const id = $(this).attr("id")
        GetAPIBycategoriesMeal(id)
        GetAPIByAreaMeal(id)
        GetAPIByIngredientsMeal(id)
    })
}

function Showcategories(result) {
    let box = ``;
    for (let i = 0; i < result.length; i++) {
        box += `
        <div class="col-md-3 d-flex " >
                            <div class="card bg-transparent overflow-hidden position-relative" id='${result[i].strCategory}'>
                                <img src="${result[i].strCategoryThumb}" class="card-img" alt="...">
                                <div class="card-img-overlay text-center text-black h-100">
                                    <h5 class="card-title  ">${result[i].strCategory}</h5>
                                    <p >${result[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                                </div>
                        </div>
                    </div>
        `
    }
    $(".category").html(`${box}`);
    $('.category .card').css("cursor", "pointer")
    getMeals()
}

function ShowcategoriesMeal(result) {
    let box = ``;
    for (let i = 0; i < result.length; i++) {
        box += `
        <div class="col-md-3 d-flex " >
                            <div class="card bg-transparent overflow-hidden position-relative" id='${result[i].idMeal}'>
                                <img src="${result[i].strMealThumb}" class="card-img" alt="...">
                                <div class="card-img-overlay d-flex align-items-center text-black h-100">
                                    <h5 class="card-title  ">${result[i].strMeal}</h5>
                                </div>
                        </div>
                    </div>
        `
    }
    $(".categoryMeal").html(`${box}`);
    $('.categoryMeal .card').css("cursor", "pointer")
    getDetails()
}
// Area

async function GetAPIByArea() {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    const result = await res.json()
    ShowArea(result.meals);
}

async function GetAPIByAreaMeal(name) {
    $('.AreaList').addClass('d-none')
    $('.AreaMeal').removeClass('d-none')
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`)
    const result = await res.json()
    ShowareasMeal(result.meals)
}

function ShowArea(result) {
    let box = ``;
    for (let i = 0; i < result.length; i++) {
        box += `
        <div class="col-md-3 justify-content-center d-flex "  >
            <div class="card bg-transparent text-center text-white" id="${result[i].strArea}">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h5 class="card-title">${result[i].strArea}</h5>
             </div>
        </div>
        `
    }
    $(".AreaList").html(`${box}`);
    $('.AreaList .card').css("cursor", "pointer")
    getMeals()
}

function ShowareasMeal(result) {
    let box = ``;
    for (let i = 0; i < result.length; i++) {
        box += `
        <div class="col-md-3 d-flex " >
                            <div class="card bg-transparent overflow-hidden position-relative" id='${result[i].idMeal}'>
                                <img src="${result[i].strMealThumb}" class="card-img" alt="...">
                                <div class="card-img-overlay d-flex align-items-center text-black h-100">
                                    <h5 class="card-title  ">${result[i].strMeal}</h5>
                                </div>
                        </div>
                    </div>
        `
    }
    $(".AreaMeal").html(`${box}`);
    $('.AreaMeal .card').css("cursor", "pointer")
    getDetails()
}
// Ingredients

async function GetAPIByIngredients() {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    const result = await res.json()
    ShowIngredients(result.meals);
}

async function GetAPIByIngredientsMeal(name) {
    $('.IngredientsList').addClass('d-none')
    $('.IngredientsMeal').removeClass('d-none')
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
    const result = await res.json()
    ShowIngredientsMeal(result.meals)
}

function ShowIngredients(result) {
    let box = ``;
    for (let i = 0; i < 20; i++) {
        box += `
        <div class="col-md-3 justify-content-center d-flex "  >
            <div class="card bg-transparent text-center text-white" id="${result[i].strIngredient}">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h5 class="card-title">${result[i].strIngredient}</h5>
                <p>${result[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
             </div>
        </div>
        `
    }
    $(".IngredientsList").html(`${box}`);
    $('.IngredientsList .card').css("cursor", "pointer")
    getMeals()
}

function ShowIngredientsMeal(result) {
    let box = ``;
    for (let i = 0; i < result.length; i++) {
        box += `
        <div class="col-md-3 d-flex " >
                            <div class="card bg-transparent overflow-hidden position-relative" id='${result[i].idMeal}'>
                                <img src="${result[i].strMealThumb}" class="card-img" alt="...">
                                <div class="card-img-overlay d-flex align-items-center text-black h-100">
                                    <h5 class="card-title  ">${result[i].strMeal}</h5>
                                </div>
                        </div>
                    </div>
        `
    }
    $(".IngredientsMeal").html(`${box}`);
    $('.IngredientsMeal .card').css("cursor", "pointer")
    getDetails()
}


// Contact 

RegexName()
function RegexName() {
    var regName = /^[A-Z][a-z ]{1,15}$/
    $("#regName").keyup(function (e) {
        return regName.test(e.target.value);
    })
}

function RegexEmail() {
    var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    $("#regEmail").keyup(function (e) {
        return regEmail.test(e.target.value);
    })
}
function RegexPhone() {
    var regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    $("#regNumber").keyup(function (e) {
        return regPhone.test(e.target.value);
    })
}
function RegexAge() {
    var regAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    $("#regAge").keyup(function (e) {
        return regAge.test(e.target.value);
    })
}

function RegexPass() {
    var regPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    $("#regPass").keyup(function (e) {
        return regPass.test(e.target.value);
    })
}

function RegexPass2() {
    return $("#regPass").val() == $("#regPass2").val();
}


function Regester() {
    var NotMatch = document.querySelector('.NotMatch')
    if (RegexName() && RegexEmail() && RegexPhone() && RegexAge() && RegexPass() && RegexPass2()) {
        NotMatch.style.color = "green"
        NotMatch.innerHTML = "Success"
    }
    else {
        $('.NotMatch').removeClass("d-none")
        NotMatch.style.color = "red"
        NotMatch.innerHTML = `
        <p>-Enter Valid Email *exemple@yyy.zzz</p>
        <p>-UserName Must start with Capital Letter with max (15 Letter)</p>
        <p>-Enter valid age</p>
        <p>-Enter valid Phone Number</p>
        <p>-Enter valid repassword</p>
        <p>-Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
        `
    }
}
Regester()