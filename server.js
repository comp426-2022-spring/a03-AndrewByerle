// import reqire if it doesn't work

const express = require('express')
const app = express()

// get commandline argument 5555
var port = 5555


function coinFlip() {
    return Math.random() > .5 ? ("heads") : ("tails");
  }

// Backticks are used for fstring syntax
const server = app.listen(port, () => {
    // console.log(`App is running on port ${port}`)
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

app.get('/app', (req, res) => {
    res.status(200).end("API is working")
})

app.get('/app/flip', (req, res) => {
    var flip = coinFlip();
    res.status(200).json({ "flip" : flip })
})

app.use(function(req, res){
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})