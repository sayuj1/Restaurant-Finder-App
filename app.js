const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var imgs = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg", "/images/4.jpg", "/images/5.jpg", "/images/6.jpg", "/images/7.jpg", "/images/8.jpg", "/images/9.jpg", "/images/10.jpg", "/images/11.jpg", "/images/13.jpg", "/images/14.jpg"];

app.get("/", function(req, res){
  var page = "";
  var city_page = "";
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
            res.render("index", {data: parsedData, imgs: imgs,page_name: page, city_page: city_page});  
        }
      }
       
      request(options, callback); 
});

app.get("/show/:id", function(req, res){
  var page = "";
  var city_page = "";
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
            res.render("show",{data: parsedData,id: req.params.id,page_name: page, city_page: city_page});
        }
      }
      request(options, callback); 
});

app.get("/show/:id/:r_id", function(req, res){
    //restaurant details goes here...
    var page1 = "";
    var page = "/show/"+req.params.id+"/"+req.params.r_id;
    //console.log(page);
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
            //console.log(body);
            const parsedData = JSON.parse(body);
            res.render("RestDetail",{data: parsedData,id: id,r_id: r_id,page_name: page, city_page: page1});
        }
      }
      request(options, callback); 

});

app.post("/show/:id", function(req, res){
  var page1 = "/show/"+req.params.id;
  var page = "";
  var c_id=req.body.c_id;
  var cat_id=req.body.cat_id;
  if(c_id == "Select Your City" && cat_id == "Select Category"){
    //do nothing
    var page = "";
  var city_page = "";
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
            res.render("show",{data: parsedData,id: req.params.id,page_name: page, city_page: city_page});
        }
      }
      request(options, callback); 
  }
  else if(cat_id == "Select Category" && c_id != "Select Your City")
  {
    var options = {
      url: "https://developers.zomato.com/api/v2.1/search?entity_id="+req.body.c_id+"&entity_type=city&category="+req.params.id,
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
          res.render("showCity", {data: parsedData,id: req.params.id, c_id: req.body.c_id,city_page: page1, page_name: page});
      }
    }
    request(options, callback); 
  }
  else if(cat_id != "Select Category" && c_id != "Select Your City" ){
    var options = {
      url: "https://developers.zomato.com/api/v2.1/search?entity_id="+req.body.c_id+"&entity_type=city&category="+req.body.cat_id,
      headers: {
          'Accept': 'application/json',
          'user-key': '1c023e9d1892813bf1ca4de62e57e647',
          'Content-Type': 'application/json',
      }
    };
     
    function callback(error, response, body) {
      if(!error && response.statusCode == 200){
        //  console.log(body);
          const parsedData = JSON.parse(body);
          res.render("showCity", {data: parsedData,id: req.params.id, c_id: req.body.c_id,city_page: page1, page_name: page});
      }
    }
    request(options, callback); 
  }
  else if(cat_id != "Select Category" && c_id == "Select Your City")
  {
    //console.log("reach");
    var page = "";
  var city_page = "";
    var id = req.body.cat_id;
    //console.log(id);
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
           // console.log(body);
            const parsedData = JSON.parse(body);
            res.render("show",{data: parsedData,id: id,page_name: page, city_page: city_page});
        }
      }
      request(options, callback); 
  }
});

app.listen(3000, function(){
console.log("Server Started at PORT 3000");
});