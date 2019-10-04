import React, { Component } from "react";
import "./App.css";
import Articles from "./components/Articles/articles.js";
import ArticleCards from "./components/ArticleCards";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";

class App extends Component {
  render() {
    return (
      <Jumbotron />
      <Nav />
      <Articles />
      <ArticleCards />
    );
  }
}

export default App;
