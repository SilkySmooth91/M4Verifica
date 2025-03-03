// Endpoint

const productUrl = "https://striveschool-api.herokuapp.com/api/product/"

// DOM Elements

const currentProduct = document.getElementById("currentProduct")
const returnBtn = document.getElementById("return")

// Cart fetch data 

const cartData = localStorage.getItem("cart");
let cart;

if (cartData) {
  cart = JSON.parse(cartData);
  createCartElem()
} else {
  cart = [];
}

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
        return product
    }
    )
    .catch(err => console.log(err))
}

// Render current product

function renderCurrentProduct({name, description, imageUrl, price}) {
    const card = document.createElement("div")
    card.classList.add("card", "bg-transparent", "border-0")

    const cardImg = document.createElement("img")
    cardImg.classList.add("img-fluid", "img-thumbnail")
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
    cardPrice.classList.add("card-text", "fs-3")
    cardPrice.innerText = price + "€"

    cardBody.append(cardTitle, cardDescription, cardPrice)
    card.append(cardImg, cardBody)
    currentProduct.appendChild(card)

    return card
}

returnBtn.addEventListener("click", () => {
    window.location.href = "mainPage.html"
})

// Create cart list

function createCartElem() {
    cartDropdown.innerHTML = ""

    const emptyMsg = document.getElementById("emptyCartMsg")

    if (!emptyMsg.classList.contains("d-none") && (cart.length > 0)) {
        emptyMsg.classList.add("d-none")
    } else if (cart.length === 0 && emptyMsg.classList.contains("d-none")) {
        emptyMsg.classList.remove("d-none")
    }

    let totalPrice = 0

    cart.forEach((cartElem) => {
        const cartItem = document.createElement("tr")
        cartItem.classList.add("d-flex", "align-items-center", "border-bottom", "mb-2")

        const cartItemQuantity = document.createElement("td")
        cartItemQuantity.innerText = cartElem.quantity + "x"

        const cartItemName = document.createElement("td")
        cartItemName.classList.add("text-truncate", "ms-1")
        cartItemName.innerText = cartElem.name

        const cartItemPrice = document.createElement("td")
        cartItemPrice.innerText = cartElem.price + "€"

        const cartItemActions = document.createElement("td")

        const cartItemRemove = document.createElement("button")
        cartItemRemove.classList.add("btn", "btn-danger", "me-1")
        cartItemRemove.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
        cartItemRemove.addEventListener("click", () => {
            cart = cart.filter((element) => element._id !== cartElem._id)
            // localStorage.setItem("cart", JSON.stringify(cart))
            createCartElem()
        })
        

        totalPrice += cartElem.price * cartElem.quantity

        cartItemActions.append(cartItemRemove)
        cartItem.append(cartItemQuantity, cartItemName, cartItemPrice, cartItemActions)
        cartDropdown.append(cartItem)
    })

    const total = document.createElement("div")
    total.classList.add("d-flex", "align-items-center")
    total.innerHTML = `<strong>Total Price: ${totalPrice}€</strong>`
    cartDropdown.append(total)
}

getCurrentProduct()