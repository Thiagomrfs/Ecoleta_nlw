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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
        "Colectoria",
        "Guilherme Gemballa",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]
    
    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
        }

        console.log("cadastrado com sucesso")
        console.log(this)
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