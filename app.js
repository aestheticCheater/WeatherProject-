const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

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
    res.write("<h1>The temperature in " + query + " is: " + temp + " °C at the moment.</h1>");
    res.write("<img src =" + imageURL + ">");
     res.write("<center><h2>"+ description +"</h2></center>");
    res.send();
    console.log(data);
    })
  })
})

app.listen(process.env.PORT || 3000, function(){
console.log("Server started at port 3000!");

});
