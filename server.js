"use strict";

// import the needed node_modules.
const express = require("express")
const morgan = require("morgan")
const PORT = 4000

let props = {
  pageNumber: 1,
	sentence: "<p>This is the way.</p>",
	popularGirlNames: ["Olivia", "Ruby", "Emily", "Grace", "Jessica"],
  homer: {
    imageUrl:
      "https://vignette.wikia.nocookie.net/simpsons/images/0/02/Homer_Simpson_2006.png",
    name: "Homer Jay Simpson",
    dob: "May 12, 1956",
    profession: "Low-level Safety Inspector",
    favoriteFood: "Donuts",
    favoriteBeverage: "Duff Beer",
  }
}

// App
express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .set("view engine", "ejs")

  // endpoints
  .get("/question:number", (req, res) => {
		props.pageNumber = req.params.number
		res.render(`pages/question${props.pageNumber}`, { props })
	})

  // this serves up the homepage
  .get("/", (req, res) => res.send("This is the homepage... it's empty :("))

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404)
    res.send("404... This is not the page you are looking for.")
  })

  // Node spins up our server and sets it to listen on the PORT we defined above.
  .listen(PORT, () => console.log(`Listening on port ${PORT}`))
