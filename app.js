const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));


let date_ob = new Date();
// current date

// current hours
var hours = date_ob.getHours();

// current minutes
var minutes = date_ob.getMinutes();

console.log(hours + ":" + minutes);
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");

})
app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "6e97bc0c79380146b82c112070491ee7";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=metric";
  https.get(url, function(response){

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = Math.floor(weatherData.main.temp);
      const icon = weatherData.weather[0].icon;
      const description = weatherData.weather[0].description;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
         if(hours < 10 && minutes < 10){
           res.write("<h1>The temperature in " + query + " is: " + temp  + " in <em>Celsius</em> at the moment.</h1>" + "<h1>"+ "0" + hours + ":0" + minutes +"</h1>");
         }
         else if(hours < 10 ){
             res.write("<h1>The temperature in " + query + " is: " + temp  + " in <em>Celsius</em> at the moment.</h1>" + "<h1>"+ "0" + hours + ":" + minutes +"</h1>");
         }
      else if(minutes < 10){
    res.write("<h1>The temperature in " + query + " is: " + temp  + " in <em>Celsius</em> at the moment.</h1>" + "<h1>"+ hours + ":0" + minutes +"</h1>");
  }
   else {
     res.write("<h1>The temperature in " + query + " is: " + temp  + " in <em>Celsius</em> at the moment.</h1>" + "<h1>"+ hours + ":" + minutes +"</h1>");
   }



    res.write("<img src =" + imageURL + ">");
     res.write("<center><h2>"+ description +"</h2></center>");

    res.send();
    console.log(data);
    })
  })
})

app.listen(process.env.PORT || 3000, function(){
console.log("Server started at port 3000!x");

});
