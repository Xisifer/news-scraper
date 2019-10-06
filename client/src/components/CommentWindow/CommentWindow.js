/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import DeleteBtn from "../../components/DeleteBtn";
import CommentBtn from "../../components/CommentBtn";
import "./CommentWindow.css";

export default class CommentWindow extends React.Component {
  render() {
    return (
      <div>
        <Button id="PopoverClick" type="button">
          Launch Popover (Click)
        </Button>
        {' '}
        <UncontrolledPopover trigger="click" placement="left" target="PopoverClick">
            <PopoverHeader>Comments</PopoverHeader>
            <PopoverBody>
                <form>
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
                </form>
            </PopoverBody>
            <DeleteBtn onClick={() => this.deleteBook(article._id)} />
            <CommentBtn onClick={() => this.addComment(article._id)} />
        </UncontrolledPopover>
      </div>
    );
  }
}