import { NavLink } from 'react-router-dom';
import { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import values from '../Updator';

export default class NavBar extends Component {
  constructor() {
    super();

    values.update = this.forceUpdate.bind(this);
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={NavLink} to="/">
          MyQuora
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link exact={true} as={NavLink} to="/">
              Dashboard
            </Nav.Link>
            {sessionStorage.getItem('loggedIn') == null ? (
              <>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/addQuestion">
                  Add Question
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
          {sessionStorage.getItem('loggedIn') != null && (
            <div className="navbar-text">{sessionStorage.getItem('uname')}</div>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
