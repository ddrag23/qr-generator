const express = require('express')
const port = 3001
const app = express()
const route = require('./src/routes')
const path = require('path')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', './src/views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(route)
app.listen(port, () => 'Server is listening on port :' + port)