import React, { Component } from "react";
import "./App.css";
import Articles from "./components/Articles/articles.js";
import ArticleCards from "./components/ArticleCards/articlecards.js";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import {BrowserRouter, Route, Link} from "react-router-dom";
import ArticleView from "./components/ArticleView/ArticleView.js";

class App extends Component {
  render() {
    return (
      <div>
        {/* Render components based on URL, then grab the article ID out of the URL */}
        <BrowserRouter>
        <Route exact path="/" component={Articles}/>
        <Route exact path="/articles/:id" component={ArticleView}/>
        {/* <Jumbotron /> */}
        <Nav />
        {/* <ArticleCards /> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
