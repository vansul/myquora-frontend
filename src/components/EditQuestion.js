import React, { Component } from 'react';
import { Button, Container, Form, Jumbotron } from 'react-bootstrap';
import axios from 'axios';

export default class EditQuestion extends Component {
  constructor(props) {
    super(props);

    const {
      match: { id },
    } = props;

    this.state = {
      id,
      q: '',
      msg: '',
      success: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
  }

  async componentDidMount() {
    const {
      data: {
        ques: { title },
      },
    } = axios.get(`https://api.myquora.ml/question/get/${this.state.id}`);
    this.setState({ q: title });
  }

  onChangeQuestion(e) {
    this.setState({ q: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const token = sessionStorage.getItem('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const question = {
      title: this.state.q,
    };

    axios
      .put(
        `https://api.myquora.ml/question/edit/${this.state.id}`,
        question,
        config
      )
      .then((res) => {
        if (res.data.success) {
          this.setState({ msg: 'Edited successfully!' });
        }
      })
      .catch((err) => {
        this.setState({ msg: err.message });
      });
  }

  render() {
    return (
      <Container>
        <Jumbotron>
          <h1 className="display-4">Edit Question</h1>
        </Jumbotron>
        <br />
        <h3>{this.state.msg}</h3>
        <br />
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Question (edit the question)</Form.Label>
            <Form.Control
              value={this.state.q}
              onChange={this.onChangeQuestion}
            />
          </Form.Group>
          <Button>Edit Question!</Button>
        </Form>
      </Container>
    );
  }
}
