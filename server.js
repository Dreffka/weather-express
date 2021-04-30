const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', {data: ''})
  })

app.post('/', (req, res) => {
    const location = req.body.location ? req.body.location : "Kiev"
    const appId = " " //addTOKEN
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + appId + "&units=metric"
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.on("data", (data) => {
          const weatherData = JSON.parse(data)
          res.render('index', {data: weatherData})
          console.log(location)
        })
      } else {
        res.render('index', {data: "0"})
      }
    })
  })

app.listen(PORT, () => {
    console.log(`server start on port: ${PORT}`)
  })