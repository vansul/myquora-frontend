import axios from 'axios';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Container, Jumbotron, Button } from 'react-bootstrap';
import Country from './Country';

export default class AddModerator extends Component {
  constructor() {
    super();

    this.state = {
      success: false,
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeMobile(e) {
    this.setState({ mobile: e.target.value });
  }

  onChangeDob(e) {
    this.setState({ dob: e.target.value });
  }

  onChangeGender(e) {
    this.setState({ gender: e.target.value });
  }

  onChangeCountry(e) {
    this.setState({ country: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const token = sessionStorage.getItem('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const user = {
      name: this.state.name,
      mobile: this.state.mobile,
      dob: this.state.dob,
      gender: this.state.gender,
      country: this.state.country,
      email: this.state.email,
      pwd: this.state.password,
    };

    axios
      .post('https://api.myquora.ml/user/moderator', user, config)
      .then((res) => {
        console.log(res.data);
        this.setState({ success: true });
      });
  }

  render() {
    return (
      <Container>
        <br />
        <Jumbotron>
          <h1 className="display-4">Add Moderator</h1>
        </Jumbotron>
        <br />
        <form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={this.onChangeName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mobile No.</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              onChange={this.onChangeMobile}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              placeholder="DOB"
              onChange={this.onChangeDob}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" onChange={this.onChangeGender}>
              <option defaultChecked value="">
                Choose...
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Country onChangeC={this.onChangeCountry} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your Email-ID"
              onChange={this.onChangeEmail}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="pwd"
              placeholder="Enter Password"
              onChange={this.onChangePassword}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Register
          </Button>
          <br />
          <br />
        </form>
        {this.state.success && <Redirect to="/login" />}
      </Container>
    );
  }
}
