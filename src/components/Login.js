import { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Container, Form, Jumbotron, Button } from 'react-bootstrap';
import values from '../Updator';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: '',
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ pwd: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      pwd: this.state.pwd,
    };

    axios.post('https://api.myquora.ml/user/login', user).then(async (res) => {
      if (res.data.success) {
        this.setState({ msg: 'Logged in successfully...', success: true });
      }

      await sessionStorage.setItem('token', res.data.token);
      await sessionStorage.setItem('email', res.data.email);
      await sessionStorage.setItem('uname', res.data.name);
      await sessionStorage.setItem('loggedIn', true);
      await sessionStorage.setItem('isModerator', res.data.isModerator);
      values.update();
    });
  }

  render() {
    return (
      <Container>
        <br />
        <Jumbotron>
          <h1 className="display-4">Login</h1>
        </Jumbotron>
        <br />
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Email ID</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your Email ID"
              onChange={this.onChangeEmail}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your Secret Password shh....."
              onChange={this.onChangePassword}
            />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
        {this.state.success && <Redirect to="/" />}
      </Container>
    );
  }
}
