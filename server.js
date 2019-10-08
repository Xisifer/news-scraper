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

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


app.get("/articles/:id", function(request, response) {
  db.Article.find({_id:request.params.id})
    .then(function(dbArticle){
      response.json(dbArticle);
    }) 
});

// Route for getting all Articles from the db
app.post("/addComment", function(req, res) {
  // Grab every document in the Articles collection
  db.Comment.create({synopsis:"Hello I'm a person", articleId: "5d97d959131474157857ea84"})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});



// Update just one note by an id
app.post("/addComment/:id", function(req, res) {
  // When searching by an id, the id needs to be passed in
  // as (mongojs.ObjectId(IdYouWantToFind))

  // Update the note that matches the object id
  db.comments.update(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
      // Set the title, note and modified parameters
      // sent in the req body.
      $set: {
        title: req.body.title,
        note: req.body.comment,
        modified: Date.now()
      }
    },
    function(error, edited) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

// Delete One from the DB
app.get("/deleteComment/:id", function(req, res) {
  // Remove a note using the objectID
  db.comments.remove(
    {
      _id: mongojs.ObjectID(req.params.id)
    },
    function(error, removed) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(removed);
        res.send(removed);
      }
    }
  );
});



// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!!`);
});
