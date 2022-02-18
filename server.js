// import reqire if it doesn't work

const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))

var port = args.port || 5000


function coinFlip() {
    return Math.random() > .5 ? ("heads") : ("tails");
  }

function coinFlips(flips) {
    // if (flips < 0){
    //   console.error("cant have less than 0 flips");
    // }
    let array = [];
    for (let i=0; i<flips; i++){
      array.push(coinFlip());
    }
    return array;
    // return Array(flips).fill(0).map(x => coinFlip());
}

function countFlips(array) {
  var count = { tails: 0, heads: 0 }

  for (const result of array){
   if (result == "heads"){
      count.heads += 1;
     }
    else if (result == "tails"){
      count.tails += 1;
    }
    else{
      console.error("not valid countFlips");
    }  
  }
 return count; 

}

function flipACoin(call) {
  var result = { call: call, flip: coinFlip(), result: null}
  result.result = result.flip == result.call ? "win" : "lose";
  return result;
}

// Backticks are used for fstring syntax
const server = app.listen(port, () => {
    // console.log(`App is running on port ${port}`)
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

app.get('/app/', (req, res) => {
    // res.status(200).end("API is working") or
	res.statusCode = 200;
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
})

app.get('/app/flips/:number', (req, res) => {
    var array = coinFlips(req.params.number);
    var tally = countFlips(array) 
    res.status(200).json({ 'raw' : array, 'summary' : tally})
})

app.get('/app/flip', (req, res) => {
    var flip = coinFlip();
    res.status(200).json({ "flip" : flip })
})

app.get('/app/flip/call/:x', (req, res) => {
    res.status(200).json(flipACoin(req.param.x))
})

// Default Endpoint
app.use(function(req, res){
    res.status(404).send("404 not found")
    res.type("text/plain")
})