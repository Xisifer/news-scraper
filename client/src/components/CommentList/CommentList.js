import React, { Component } from "react";

import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
// Comment Window Stuff
import DeleteBtn from "../../components/DeleteBtn";
import CommentBtn from "../../components/CommentBtn";
import { Button } from 'reactstrap';

import { Collapse, CardBody, Card } from 'reactstrap';


class CommentList extends Component {
    state = {
        synopsis: "",
        comments: []
    }
      // When the component mounts, load all articles and save them to this.state.articles
  componentWillMount() {
      API.getComments();
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
    if (this.props.synopsis) {
      API.addComment({
        // author: this.state.author,
        synopsis: this.props.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };
  render() {
      return (

        <Container>
            <Card>
                <CardBody>
                Anim pariatur cliche reprehenderit,
                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                anim keffiyeh helvetica, craft beer labore wes anderson cred
                nesciunt sapiente ea proident.
                </CardBody>
            </Card>
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
                // style="height:120px"
            />
            <FormBtn
                disabled={!(this.state.synopsis)}
                onClick={this.handleFormSubmit}
            >
                Submit Comment
            </FormBtn>
            </form>
            <DeleteBtn onClick={() => this.deleteBook(this.props.article._id)} />
            <CommentBtn onClick={() => this.addComment(this.props.article._id)} />
        </Container>
      )
  }
}
export default CommentList;