import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";

import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
// Comment Window Stuff
import DeleteBtn from "../../components/DeleteBtn";
import CommentBtn from "../../components/CommentBtn";
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

// import CommentWindow from "../../components/CommentWindow";

class Articles extends Component {
  // Setting our component's initial state
  state = {
    articles: [],
    title: "",
    link: "",
    comments: [],
    id: ""
  };

  // When the component mounts, load all articles and save them to this.state.articles
  componentDidMount() {
    this.loadBooks();
    console.log(this.state.articles);
  }

  // Loads all articles  and sets them to this.state.articles
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ articles: res.data, title: "", author: "", synopsis: "", id:"" })
        
      )
      .catch(err => console.log(err));
  };

  // Deletes a article from the database with a given id, then reloads articles from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  addComment = id => {
    API.addComment(id)
  }

  deleteComment = id => {
    API.deleteComment(id)
  }

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the article data
  // Then reload articles from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.addComment({
        // author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            {/* <Jumbotron>
              <h1>Gaming News Articles from Polygon.com</h1>
            </Jumbotron> */}
            {/* <form>
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Comment Username (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Comment Body (Optional)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.synopsis)}
                onClick={this.handleFormSubmit}
              >
                Submit Comment
              </FormBtn>
            </form> */}
          </Col>
          <Col size="md-6 sm-12">
            {/* <Jumbotron> */}
              <h1>Scraped Gaming News Articles from Polygon.com</h1>
            {/* </Jumbotron> */}
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => {
                  return (
                    <ListItem key={article._id}>
                      <a href={article.link}>
                        <strong>
                          {article.title} 
                          {/* by {article.author} */}
                        </strong>
                      </a>
                      
                      <div>
                        <Button key={article._id} id="PopoverClick" type="button">
                          View Comments
                        </Button>
                        {' '}
                        <UncontrolledPopover key={article._id} trigger="click" placement="left" target="PopoverClick">
                            <PopoverHeader>Comments</PopoverHeader>
                            <PopoverBody>
                                <form>
                                {/* <Input
                                    value={this.state.author}
                                    onChange={this.handleInputChange}
                                    name="author"
                                    placeholder="Comment Username (required)"
                                /> */}
                                <TextArea
                                    value={this.state.synopsis}
                                    onChange={this.handleInputChange}
                                    name="synopsis"
                                    placeholder="Comment Body"
                                />
                                <FormBtn
                                    disabled={!(this.state.synopsis)}
                                    onClick={this.handleFormSubmit}
                                >
                                    Submit Comment
                                </FormBtn>
                                </form>
                                <DeleteBtn onClick={() => this.deleteBook(article._id)} />
                                <CommentBtn onClick={() => this.addComment(article._id)} />
                            </PopoverBody>
                        </UncontrolledPopover>
                      </div>
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
