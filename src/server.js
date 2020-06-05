const express = require("express")
const server = express()

// ligar o servidor
server.listen(3000)

// pegar database
const db = require("./database/db.js")

// configurar pasta publica
server.use(express.static("public"))

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

server.get("/search-results", (req, res) => {
    db.all("SELECT * FROM places", function(err, rows) {
        if (err) {
            console.log(err)
        }
        const total = rows.length
        return res.render("search-results.html", { places: rows, total })
    })
})