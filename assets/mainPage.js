// Endpoint 

const productUrl = "https://striveschool-api.herokuapp.com/api/product/"

// DOM Elements

const showProducts = document.getElementById("showProducts")

// Fetch

let allProducts = []

async function getProducts() {
    try {
        const res = await fetch(productUrl, {
            headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZmJjMjFlMTQwNjAwMTUzMTRkMmEiLCJpYXQiOjE3NDA1MDQwMDIsImV4cCI6MTc0MTcxMzYwMn0.-Z5FkCzoME6YmywZCLj5j4nBAzwp8r5KCaTBvAg12-k"}
        })
        const products = await res.json()
        allProducts = products
        console.log(products)
        renderProducts(products)
    } catch(err) {
        console.log(err)
    }
}

// Render 

function renderProducts(products) {
    showProducts.innerHTML = ""

    const productNodes = products.map(product => createCards(product))

    showProducts.append(...productNodes)
}


function createCards({name, description, imageUrl, price}) {
    const card = document.createElement("div")
    card.classList.add("card", "bg-transparent", "border-0")

    const cardImg = document.createElement("img")
    cardImg.classList.add("card-img-top")
    cardImg.src = imageUrl

    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

    const cardTitle = document.createElement("h4")
    cardTitle.classList.add("card-title")
    cardTitle.innerText = name

    const cardDescription = document.createElement("p")
    cardDescription.classList.add("card-text")
    cardDescription.innerText = description

    const cardPrice = document.createElement("p")
    cardPrice.classList.add("card-text")
    cardPrice.innerText = price + "€"

    const cardFooter = document.createElement("div")
    cardFooter.classList.add("card-footer", "d-flex", "justify-content-evenly", "align-items-center")
    cardFooter.classList.add("d-none")

    const addToCart = document.createElement("a")
    addToCart.classList.add("btn", "btn-success")
    addToCart.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>'

    const details = document.createElement("a")
    details.classList.add("btn")
    details.innerHTML = '<i class="fa-regular fa-lightbulb"></i> Scopri di più'

    cardFooter.append(addToCart, details)
    cardBody.append(cardTitle, cardPrice, cardDescription, cardFooter)
    card.append(cardImg, cardBody)

    card.addEventListener("mouseover", () => {
        cardFooter.classList.remove("d-none")
        cardTitle.style.color = "white"
        cardPrice.style.color = "white"
        cardDescription.style.color = "white"
    })

    card.addEventListener("mouseout", () => {
        cardFooter.classList.add("d-none")
        cardTitle.style.color = ""
        cardPrice.style.color = ""
        cardDescription.style.color = ""
    })

    return card
}

getProducts()