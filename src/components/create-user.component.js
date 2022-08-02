import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    axios.post('http://localhost:8000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
    return (
        <div>
            <h3>Create New User</h3>
            <Form onSubmit={this.onSubmit}>
                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                        required 
                        value={this.state.username}
                        onChange={this.onChangeUsername}/>
                </Form.Group>

                <Button variant="primary" value="Create User" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
  }
}

