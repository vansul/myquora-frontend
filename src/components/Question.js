import { Component } from 'react';
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AddAnswer from './AddAnswer';

export default class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: {
        title: '',
        author: {
          name: '',
        },
      },
      answers: '',
      qId: '',
      user: sessionStorage.getItem('email'),
      isModerator: sessionStorage.getItem('isModerator'),
    };

    this.refresher = this.refresher.bind(this);
    this.fetchQuestion = this.fetchQuestion.bind(this);
  }

  async fetchQuestion() {
    const {
      match: { params },
    } = this.props;

    await this.setState({ qId: params.id });

    const {
      data: { ques },
    } = await axios.get(
      `https://api.myquora.ml/question/get/${this.state.qId}`
    );
    const createdAt = new Date(Date.parse(ques.createdAt)).toDateString();
    await this.setState({ question: { ...ques, createdAt } });

    const {
      data: { user },
    } = await axios.get(
      `https://api.myquora.ml/user/getDetails/${this.state.question.author}`
    );
    await this.setState({ question: { ...this.state.question, author: user } });

    const {
      data: { answers },
    } = await axios.get(
      `https://api.myquora.ml/answer/getAll/${this.state.question._id}`
    );

    this.setState({ answers: '' });

    answers.forEach((answer) => {
      axios
        .get(`https://api.myquora.ml/user/getDetails/${answer.author}`)
        .then(({ data }) => {
          const createdAt = new Date(
            Date.parse(answer.createdAt)
          ).toDateString();

          this.setState({
            answers: [
              ...this.state.answers,
              <ListGroup.Item as="li" key={answer._id}>
                <blockquote className="blockquote mb-0">
                  <p>{answer.body}</p>
                  <footer className="blockquote-footer">
                    {data.user.name}
                    <cite title={'Answered On: ' + createdAt}>
                      {'  (' + createdAt + ')'}
                    </cite>
                  </footer>
                </blockquote>
              </ListGroup.Item>,
            ],
          });
        });
    });
  }

  componentDidMount() {
    this.fetchQuestion();
  }

  refresher() {
    this.fetchQuestion();
    this.forceUpdate();
  }

  render() {
    return (
      <Container>
        <br />
        <Link to="/">Go Back</Link>
        <br />
        <br />
        <Card>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>{this.state.question.title}</p>
              <footer className="blockquote-footer">
                {this.state.question.author.name}
                <cite title={'Asked On: ' + this.state.question.createdAt}>
                  {'  (' + this.state.question.createdAt + ')'}
                </cite>
              </footer>
            </blockquote>
            <br />
            <Card.Text>Answers: {this.state.answers.length}</Card.Text>
            {this.state.isModerator === 'true' ||
            this.state.question.author.email === this.state.user ? (
              <Button as={Link} to={`/editQuestion/${this.state.question._id}`}>
                Edit
              </Button>
            ) : (
              ''
            )}
          </Card.Body>
        </Card>
        <hr />
        <h2 className="display-4">Answers</h2>
        <ListGroup as="ul">
          {this.state.answers.length ? (
            this.state.answers
          ) : (
            <ListGroup.Item className="list-group-item-info text-center">
              There are no answers for this question. You can add answers below.
            </ListGroup.Item>
          )}
        </ListGroup>
        <br />
        <hr />
        <br />
        {sessionStorage.getItem('loggedIn') == null ? (
          <h5>
            To answer the question, kindly <Link to="/login">Login</Link>
          </h5>
        ) : (
          <AddAnswer props={this.props} refresh={this.refresher} />
        )}
      </Container>
    );
  }
}
