// Endpoint 

const productUrl = "https://striveschool-api.herokuapp.com/api/product/"

// DOM Elements

const showProducts = document.getElementById("showProducts")

// Fetch 

async function getProducts() {
    try {
        const res = await fetch(productUrl, {
            headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkZmJjMjFlMTQwNjAwMTUzMTRkMmEiLCJpYXQiOjE3NDA1MDQwMDIsImV4cCI6MTc0MTcxMzYwMn0.-Z5FkCzoME6YmywZCLj5j4nBAzwp8r5KCaTBvAg12-k"}
        })
        const products = await res.json()
        console.log(products)
    } catch(err) {
        console.log(err)
    }
}

getProducts()