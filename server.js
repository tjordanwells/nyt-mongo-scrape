var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended = true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/nyt-scrape");

app.get("/scrape", function(req, res) {
    axios.get("http://www.nytimes.com/").then(function(response) {
        var $ = cheerio.load(response.data);

        $("article h2").each(function(i, element) {
            var result = {};

            result.title = $(this)
              .children("a")
              .text();
            result.link = $(this)
              .children("a")
              .attr("href");

            db.Article.create(result)
              .then(function(dbArticle) {
                  console.log(dbArticle);
              })
              .catch(function(err) {
                  return res.json(err);
              });
        });

        console.log("Scrape Complete");
    });
});