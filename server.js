const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
var axios = require("axios");
var cheerio = require("cheerio");

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/potato', {useNewUrlParser: true});


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articlesDB";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });



var db = require("./models");




// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here

app.get("/scrape", function(request, res) {
  // Make a request via axios for the news section of `ycombinator`
  axios.get("https://www.polygon.com/news").then(function(response) {
    // Load the html body from axios into cheerio
    var $ = cheerio.load(response.data);
    // For each element with a "c-compact-river__entry" class
    $(".c-compact-river__entry").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var article = $(element).children().find(".c-entry-box--compact__body");
      var title = article.find(".c-entry-box--compact__title").text();
      console.log(title);
      var link = article.find("a").attr("href");
      console.log(link);
      // If this found element had both a title and a link
      if (title && link) {
        // Insert the data in the scrapedData db
        db.Article.create({
          title: title,
          link: link
        },
        function(err, inserted) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          }
          else {
            // Otherwise, log the inserted data
            console.log(inserted);
          }
        });
      }
    });
  });

  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});



// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!!`);
});
