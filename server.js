// import reqire if it doesn't work

const express = require('express')
const app = express()

// get commandline argument 5555
var port = 5555

// Backticks are used for fstring syntax
const server = app.listen(port, () => {
    // console.log(`App is running on port ${port}`)
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

app.get('/app', (req, res) => {
    res.status(200).end("API is working")
})

app.use(function(req, res){
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})