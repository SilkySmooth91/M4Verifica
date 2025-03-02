// Endpoint 

const productUrl = "https://striveschool-api.herokuapp.com/api/product/"

// DOM Elements

const showProducts = document.getElementById("showProducts")
const cartDropdown = document.getElementById("cartDropdown")

// Fetch

let allProducts = []
let cart = []

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


function createCards({name, description, imageUrl, price, _id}) {
    const card = document.createElement("div")
    card.classList.add("card", "bg-transparent", "border-0")

    const cardImg = document.createElement("img")
    cardImg.classList.add("card-img-top", "img-thumbnail")
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
    cardFooter.classList.add("card-footer", "d-flex", "justify-content-start", "align-items-center")
    cardFooter.classList.add("d-none")

    const addToCart = document.createElement("a")
    addToCart.classList.add("btn", "btn-success", "me-2")
    addToCart.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>'
    addToCart.addEventListener("click", () => {
        const cartElem = cart.find(product => product._id === _id)
        if (cartElem) {
            cartElem.quantity++
        } else {
            cart.push({_id: _id, quantity: 1, name, price})
            addToCart.innerHTML = '<i class="fa-solid fa-check"></i> Added to cart!'
        }
        createCartElem()
    })

    const details = document.createElement("a")
    details.classList.add("btn")
    details.innerHTML = '<i class="fa-regular fa-lightbulb"></i> Scopri di più'
    details.addEventListener("click", () => {
        window.location.href = `details.html?id=${_id}`
    })

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



getProducts()