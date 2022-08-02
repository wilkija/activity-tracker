import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default class Navigation extends Component {

  render() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">Exercise Tracker</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Exercises</Nav.Link>
                    <Nav.Link href="/create">Create Exercise Log</Nav.Link>
                    <Nav.Link href="/user">Create User</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </div>
    );
  }
}