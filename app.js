  /* istanbul ignore next */
  if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
  }
  
  const express = require('express')
  const cors = require("cors")
  const index = require("./routes/indexRoute")
  const errorHandler = require('./middlewares/errorHandler')
  const app = express()
  const port = process.env.PORT || 3001
  app.use(cors())
  app.use(express.urlencoded({extended: true}))
  app.use(express.json())
  //index route
  app.use("/", index)
  
  app.use(errorHandler)
  

  console.log((new Date).toISOString().substring(0, 10))
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })

  
  module.exports = app;