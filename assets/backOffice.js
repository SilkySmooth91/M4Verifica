// Endpoint

const productUrl = "https://striveschool-api.herokuapp.com/api/product/"

// DOM Elements

const tbody = document.getElementById("tbody")

// Fetch

let allProducts = []

async function getProducts() {
    try {
        const res = await fetch(productUrl, {
            headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZmJjMjFlMTQwNjAwMTUzMTRkMmEiLCJpYXQiOjE3NDA1MDQwMDIsImV4cCI6MTc0MTcxMzYwMn0.-Z5FkCzoME6YmywZCLj5j4nBAzwp8r5KCaTBvAg12-k"}
        })
        const products = await res.json()
        console.log(products)
        allProducts = products
        renderTable(products)
    }
    catch(err) {
        console.log(err)
    }
}

// Render

function renderTable(products) {
    tbody.innerHTML = ""

    const productNodes = products.map(product => createRow(product))

    tbody.append(...productNodes)
}

function createRow({name, brand, price}) {
    
    const tableRow = document.createElement("tr")

    const cellName = document.createElement("td")
    cellName.innerText = name

    const cellBrand = document.createElement("td")
    cellBrand.innerText = brand

    const cellPrice = document.createElement("td")
    cellPrice.innerText = price

    const cellActions = document.createElement("td")

    const modify = document.createElement("button")
    modify.classList.add("btn", "btn-warning", "mx-2")
    modify.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'

    const remove = document.createElement("button")
    remove.classList.add("btn", "btn-danger", "me-2")
    remove.innerHTML = '<i class="fa-regular fa-trash-can"></i>'

    cellActions.append(modify, remove)
    tableRow.append(cellName, cellBrand, cellPrice, cellActions)

    return tableRow
}


getProducts()