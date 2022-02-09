const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 5000
mongoose.connect('mongodb://cryptoblog:essa12@cluster0-shard-00-00.udash.mongodb.net:27017,cluster0-shard-00-01.udash.mongodb.net:27017,cluster0-shard-00-02.udash.mongodb.net:27017/umt?ssl=true&replicaSet=atlas-mw35iy-shard-0&authSource=admin&retryWrites=true&w=majority'),

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(port)
