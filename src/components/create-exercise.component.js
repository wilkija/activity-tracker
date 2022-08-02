import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button } from 'react-bootstrap';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:8000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <Form onSubmit={this.onSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Select required
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        >    
                        {
                            this.state.users.map((user) => {
                            return <option 
                                key={user}
                                value={user}>{user}
                                </option>;
                            })
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control type="text"
                        required
                        value={this.state.description}
                        onChange={this.onChangeDescription} 
                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDuration">
                    <Form.Label>Duration (in minutes):</Form.Label>
                    <Form.Control type="text"
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration} 
                        />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDuration">
                    <Form.Label>Date:</Form.Label>
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                </Form.Group>

                <Button variant="primary" value="Create Exercise Log" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
  }
}

