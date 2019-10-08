import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";

import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
// Comment Window Stuff
// import DeleteBtn from "../../components/DeleteBtn";
// import CommentBtn from "../../components/CommentBtn";
import { Button } from 'reactstrap';
import CommentList from "../../components/CommentList/CommentList.js";
import { Collapse, CardBody, Card } from 'reactstrap';
import {BrowserRouter, Route, Link} from "react-router-dom";

// import CommentWindow from "../../components/CommentWindow";

class Articles extends Component {
  // Setting our component's initial state
  state = {
    articles: [],
    link: ""

  };
    constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  // When the component mounts, load all articles and save them to this.state.articles
  componentDidMount() {
    this.loadBooks();
    console.log(this.state.articles);
  }

  // Loads all articles  and sets them to this.state.articles
  loadBooks = () => {
    API.getBooks()
      .then(res => {
        if(res.data) {
          this.setState({ 
            articles: res.data, 
            title: "", 
            author: "", 
            synopsis: "", 
            id:"" })
          }
      }

        
      )
      .catch(err => console.log(err));
  };

  // Deletes a article from the database with a given id, then reloads articles from the db
  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  addComment = id => {
    API.addComment(id)
  }

  deleteComment = id => {
    API.deleteComment(id)
        .then(res => this.getComments())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6 sm-12">
            {/* <Jumbotron> */}
              {/* <h1>Scraped Gaming News Articles from Polygon.com</h1> */}
            {/* </Jumbotron> */}
            {this.state.articles && this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => {
                  return (
                    <ListItem key={article._id}>
                      <a href={`/articles/${article._id}`}>
                        <strong>
                          {article.title} 
                          {/* by {article.author} */}
                        </strong>
                      </a>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
