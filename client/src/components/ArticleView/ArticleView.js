import React, { Component } from "react";
import API from "../../utils/API";

class ArticleView extends Component {
    state = {
        article:{}
    }

  componentDidMount() {
      API.getBook(this.props.match.params.id).then(result => {

          this.setState({
              article: result.data
          })
                    console.log(result);
      })
  }

    render() {
        return (
            
        <div>
            <h1>{this.props.match.params.title}</h1>
            <h2>{this.props.match.params.id}</h2>
            <h3>Result is: {this.state.article.title}</h3>
        </div>

        )
    }
}

export default ArticleView;