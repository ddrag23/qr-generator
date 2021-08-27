require('dotenv').config()
const express = require('express')
const app = express()
const route = require('./src/routes')
const path = require('path')
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', './src/views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(route)
app.listen(PORT, () => `Server is listening on port : ${PORT}`)
