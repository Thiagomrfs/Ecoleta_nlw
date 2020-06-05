const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./src/database/database.db")
module.exports = db

// db.serialize(() => {
//     //create table(varchar(30) nome)
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//             );
//     `)

//     // insert values
    // const query = ` 
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `
    // const values = [
    //     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
    //     "Colectoria",
    //     "Guilherme Gemballa",
    //     "Nº 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Resíduos Eletrônicos, Lâmpadas"
    // ]
    
    // db.run(query, values, function(err) {
    //     if (err) {
    //         console.log(err)
    //     }

    //     console.log("cadastrado com sucesso")
    //     console.log(this)
    // })


    // show data
    // db.all("SELECT name FROM places WHERE id=1", function(err, rows) {
    //     if (err) {
    //         console.log(err)
    //     }

    //     console.log("aqui esão os registros:")
    //     console.log(rows)
    // })

    // delete data
    // db.run("DELETE FROM places", function(err, rows) {
    //     if (err) {
    //         console.log(err)
    //     }

    //     console.log("registro deletado")
    // })
// })