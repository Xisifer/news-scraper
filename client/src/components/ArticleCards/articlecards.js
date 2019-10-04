import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';

const ArticleCards = (props) => {a
  return (
    <React.Fragment>
    <div className="cardDiv">
      <Card style={{backgroundColor: "rgba(255,255,255,0.2"}}>
        <CardImg top width="100%" src={props.image} alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.title}</CardTitle>
          <CardText>{props.description}</CardText>
          <Button href={props.github}>GitHub Link</Button>
          <br/>
          <Button href={props.livepage}>{props.livelabel}</Button>
        </CardBody>
      </Card>
    </div>
    </React.Fragment>
  );
};

export default ArticleCards;