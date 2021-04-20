//Load express module with `require` directive
var express = require('express')
var app = express()

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/health-check',(req,res)=> {
  res.send ("Health check passed");
});

//Launch listening server on port 8081
app.listen(8081, function () {
  console.log('App listening on port 8081!')
  app.emit("appStarted");
})
module.exports = app