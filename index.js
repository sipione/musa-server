require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require("./src/routes");
const cors = require("cors")

app.use(cors({
  origin: '*'
}))

app.use((req, resp, next) => {
  resp.set({
    'Content-type': 'application/json'
  })
  next();
})

routes(app)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`App listening`)
})