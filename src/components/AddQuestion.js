import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Jumbotron, Form, Button } from 'react-bootstrap';

export default class AddQuestion extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      cat: '',
    };

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeCat = this.onChangeCat.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeCat(e) {
    this.setState({ cat: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const token = sessionStorage.getItem('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const question = {
      title: this.state.title,
      cat: this.state.cat,
    };

    axios
      .post('https://api.myquora.ml/question/add', question, config)
      .then((res) => {
        if (res.data.success) {
          this.setState({ msg: 'Question Added Successfully!', success: true });
        }
      });
  }

  render() {
    return (
      <Container>
        <br />
        <Jumbotron>
          <h1 className="display-4">Add Questions</h1>
        </Jumbotron>
        <br />
        <h3>{this.state.msg}</h3>
        {this.state.success && <Link to="/">Go to Dashboard</Link>}
        <br />
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your interesting question..."
              onChange={this.onChangeTitle}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" onChange={this.onChangeCat}>
              <option value="Philosophy">Philosophy</option>
              <option value="Maths">Maths</option>
              <option value="Commerce">Commerce</option>
              <option value="Food">Food</option>
              <option value="Science">Science</option>
              <option value="Computer Science">Computer Science</option>
            </Form.Control>
          </Form.Group>
          <Button type="submit">Add Question</Button>
        </Form>
      </Container>
    );
  }
}
