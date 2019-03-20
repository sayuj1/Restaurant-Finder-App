const express = require('express');
const app = express();
const request = require('request');

app.set("view engine", "ejs");

app.use(express.static("public"));

var imgs = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg", "/images/4.jpg", "/images/5.jpg", "/images/6.jpg", "/images/7.jpg", "/images/8.jpg", "/images/9.jpg", "/images/10.jpg", "/images/11.jpg", "/images/13.jpg", "/images/14.jpg"];

app.get("/", function(req, res){
    var options = {
        url: 'https://developers.zomato.com/api/v2.1/categories',
        headers: {
            'Accept': 'application/json',
            'user-key': '1c023e9d1892813bf1ca4de62e57e647',
            'Content-Type': 'application/json',
        }
      };
       
      function callback(error, response, body) {
        if(!error && response.statusCode == 200){
           // console.log(body);
            const parsedData = JSON.parse(body);
            res.render("index", {data: parsedData, imgs: imgs});  
        }
      }
       
      request(options, callback); 
});

app.get("/show/:id", function(req, res){
    var id = req.params.id;
    var options = {
        url: 'https://developers.zomato.com/api/v2.1/search?category='+id,
        headers: {
            'Accept': 'application/json',
            'user-key': '1c023e9d1892813bf1ca4de62e57e647',
            'Content-Type': 'application/json',
        }
      };
       
      function callback(error, response, body) {
        if(!error && response.statusCode == 200){
            //console.log(body);
            const parsedData = JSON.parse(body);
            res.render("show",{data: parsedData,id: req.params.id});
        }
      }
      request(options, callback); 
});

app.get("/show/:id/:r_id", function(req, res){
    //restaurant details goes here...
    var id = req.params.id;
    var r_id = req.params.r_id;
    var options = {
        url: 'https://developers.zomato.com/api/v2.1/restaurant?res_id='+r_id,
        headers: {
            'Accept': 'application/json',
            'user-key': '1c023e9d1892813bf1ca4de62e57e647',
            'Content-Type': 'application/json',
        }
      };
       
      function callback(error, response, body) {
        if(!error && response.statusCode == 200){
            console.log(body);
            const parsedData = JSON.parse(body);
            res.render("RestDetail",{data: parsedData,id: req.params.id});
        }
      }
      request(options, callback); 

});


app.listen(3000, function(){
console.log("Server Started at PORT 3000");
});