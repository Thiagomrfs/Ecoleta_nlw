const express = require("express")
const server = express()

// ligar o servidor
server.listen(3000)

// pegar database
const db = require("./database/db.js")

// configurar pasta publica
server.use(express.static("public"))

// habilitar o uso do req.body
server.use(express.urlencoded({ extended: true}))

// template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/view", {
    express: server,
    noCache: true
})

// configurar caminhos da aplicação
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    // query strings da url
    // const userQuery = req.query
    const data = req.body

    const query = ` 
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);`
    const values = [
        `${data["image"]}`,
        `${data["name"]}`,
        `${data["address"]}`,
        `${data["address2"]}`,
        `${data["state"]}`,
        `${data["city"]}`,
        `${data["selected-items"]}`
    ]
    
    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
        }
        console.log("cadastrado com sucesso")
    })

})

server.get("/search-results", (req, res) => {
    db.all("SELECT * FROM places", function(err, rows) {
        if (err) {
            console.log(err)
        }
        const total = rows.length
        return res.render("search-results.html", { places: rows, total })
    })
})