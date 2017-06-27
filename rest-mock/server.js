const express = require("express")
const bodyParser = require("body-parser")
const serveStatic = require("serve-static")
const path = require("path")
const app = express()

const API_PREFIX = "http://localhost:8005"

app.use("/uploads", serveStatic(path.join(__dirname, "uploads")))
app.use(bodyParser.text())
app.use(bodyParser.json())

// NOTE: It gives a delay to all services.
// app.use((req, res, next) => {
//   setTimeout(() => {
//     next()
//   }, 2000)
// })

app.listen(8005, () => console.log("JSON server running"))
