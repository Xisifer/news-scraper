import React from "react";
import "./CommentBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function CommentBtn(props) {
  return (
    <span className="comment-btn" {...props} role="button" tabIndex="0">
      Add Comment to This Article
    </span>
  );
}

export default CommentBtn;
