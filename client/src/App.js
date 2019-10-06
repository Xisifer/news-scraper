import React, { Component } from "react";
import "./App.css";
import Articles from "./components/Articles/articles.js";
import ArticleCards from "./components/ArticleCards/articlecards.js";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";

class App extends Component {
  render() {
    return (
      <div>
        {/* <Jumbotron /> */}
        <Nav />
        <Articles />
        {/* <ArticleCards /> */}
      </div>
    );
  }
}

export default App;
