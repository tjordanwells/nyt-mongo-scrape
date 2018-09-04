var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

var db = require("./models");

var PORT = MONGODB_URI;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nyt-scrape";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.get("/", function(req, res) {
    res.render("index");
});

//scraping U.S. Section main
app.get("/us-scrape", function(req, res) {
    axios.get("http://www.nytimes.com/section/us").then(function(response) {
        var $ = cheerio.load(response.data);

        $("article.story div").each(function(i, element) {
            var result = {};

            result.title = $(this)
              .children("h2")
              .children("a")
              .text();
            result.link = $(this)
              .children("h2")
              .children("a")
              .attr("href");

            result.summary = $(this)
              .children("p.summary")
              .text();

            db.Article.create(result)
              .then(function(dbArticle) {
                  console.log(dbArticle);
              })
              .catch(function(err) {
                res.json(err);
              });
        });
        res.send("Scrape Complete");
    });
});

//scraping World section main
app.get("/world-scrape", function(req, res) {
    axios.get("http://www.nytimes.com/section/world").then(function(response) {
        var $ = cheerio.load(response.data);

        $("article.story div").each(function(i, element) {
            var result = {};

            result.title = $(this)
              .children("h2")
              .children("a")
              .text();
            result.link = $(this)
              .children("h2")
              .children("a")
              .attr("href");

            result.summary = $(this)
              .children("p.summary")
              .text();

            db.Article.create(result)
              .then(function(dbArticle) {
                  console.log(dbArticle);
              })
              .catch(function(err) {
                res.json(err);
              });
        });
        res.send("Scrape Complete");
    });
});

//scraping Politics section main
app.get("/politics-scrape", function(req, res) {
    axios.get("http://www.nytimes.com/section/politics").then(function(response) {
        var $ = cheerio.load(response.data);

        $("article.story div").each(function(i, element) {
            var result = {};

            result.title = $(this)
              .children("h2")
              .children("a")
              .text();
            result.link = $(this)
              .children("h2")
              .children("a")
              .attr("href");

            result.summary = $(this)
              .children("p.summary")
              .text();

            db.Article.create(result)
              .then(function(dbArticle) {
                  console.log(dbArticle);
              })
              .catch(function(err) {
                res.json(err);
              });
        });
        res.send("Scrape Complete");
    });
});

//scraping Business section main
app.get("/business-scrape", function(req, res) {
    axios.get("http://www.nytimes.com/section/business").then(function(response) {
        var $ = cheerio.load(response.data);

        $("article.story div").each(function(i, element) {
            var result = {};

            result.title = $(this)
              .children("h2")
              .children("a")
              .text();
            result.link = $(this)
              .children("h2")
              .children("a")
              .attr("href");

            result.summary = $(this)
              .children("p.summary")
              .text();

            db.Article.create(result)
              .then(function(dbArticle) {
                  console.log(dbArticle);
              })
              .catch(function(err) {
                res.json(err);
              });
        });
        res.send("Scrape Complete");
    });
});

//scraping Tech section main
app.get("/tech-scrape", function(req, res) {
    axios.get("http://www.nytimes.com/section/technology").then(function(response) {
        var $ = cheerio.load(response.data);

        $("article.story div").each(function(i, element) {
            var result = {};

            result.title = $(this)
              .children("h2")
              .children("a")
              .text();
            result.link = $(this)
              .children("h2")
              .children("a")
              .attr("href");

            result.summary = $(this)
              .children("p.summary")
              .text();

            db.Article.create(result)
              .then(function(dbArticle) {
                  console.log(dbArticle);
              })
              .catch(function(err) {
                res.json(err);
              });
        });
        res.send("Scrape Complete");
    });
});

//scraping Sports section main
app.get("/sports-scrape", function(req, res) {
    axios.get("http://www.nytimes.com/section/sports").then(function(response) {
        var $ = cheerio.load(response.data);

        $("article.story div").each(function(i, element) {
            var result = {};

            result.title = $(this)
              .children("h2")
              .children("a")
              .text();
            result.link = $(this)
              .children("h2")
              .children("a")
              .attr("href");

            result.summary = $(this)
              .children("p.summary")
              .text();

            db.Article.create(result)
              .then(function(dbArticle) {
                  console.log(dbArticle);
              })
              .catch(function(err) {
                res.json(err);
              });
        });
        res.send("Scrape Complete");
    });
});

app.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
          res.json(dbArticle);
      })
      .catch(function(err) {
          res.json(err);
      });
});

app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.delete("/articles/:id", function(req, res) {
  db.Note.findOneAndRemove({ _id: req.params.id })
    .then(function(dbNote) {
      res.json(dbNote);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});