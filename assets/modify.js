// Endpoint 

const productUrl = "https://striveschool-api.herokuapp.com/api/product/"

// DOM Elements

const inputName = document.getElementById("inputName")
const inputBrand = document.getElementById("inputBrand")
const inputPrice = document.getElementById("inputPrice")
const inputImage = document.getElementById("inputImg")
const inputDesc = document.getElementById("inputDesc")
const failureAlert = document.getElementById("failure")
const successAlert = document.getElementById("success")
const currentProduct = document.getElementById("currentProduct")

// fetch current product with query string

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

function getCurrentProduct() {
    fetch(productUrl + productId, {
        headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZmJjMjFlMTQwNjAwMTUzMTRkMmEiLCJpYXQiOjE3NDA1MDQwMDIsImV4cCI6MTc0MTcxMzYwMn0.-Z5FkCzoME6YmywZCLj5j4nBAzwp8r5KCaTBvAg12-k"}
    })
    .then(res => res.json())
    .then(product => {
        console.log(product)
        renderCurrentProduct(product)
    }
    )
    .catch(err => console.log(err))
}

// Render current product

function renderCurrentProduct({name, description, imageUrl, price}) {
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

    cardBody.append(cardTitle, cardDescription, cardPrice)
    card.append(cardImg, cardBody)
    currentProduct.appendChild(card)

    return card
}

getCurrentProduct()
