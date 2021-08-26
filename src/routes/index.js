const generator = require('../controller/generator.controller')
const express = require('express')
const app = express.Router()
app.get('/', generator.index)
app.post('/store', generator.store)
app.get('/download', generator.downloaded)
module.exports = app
