import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';


const EditExercise = () => {
  const { id } = useParams();
  const [Exercise, setExercise] = useState({
    username: "helllo",
    description: "",
    duration: 0,
    date: new Date(),
  });

  const onSubmit = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:8000/exercises/update/"+id, Exercise);

    window.location = '/';
  };

  useEffect( () => {

    axios.get('http://localhost:8000/exercises/'+id)
      .then(response => {
        console.log(response)
        setExercise({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [id]);


  return (
    <div>
        <h3>Edit Exercise Log</h3>
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text"
                    required
                    disabled
                    value={Exercise.username}
                    onChange={(e) =>
                      setExercise({ ...Exercise, username: e.target.value })
                    }
                    />    
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control type="text"
                        required
                        value={Exercise.description}
                        onChange={(e) =>
                          setExercise({ ...Exercise, description: e.target.value })
                        } 
                        />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDuration">
                    <Form.Label>Duration (in minutes):</Form.Label>
                    <Form.Control type="text"
                        className="form-control"
                        value={Exercise.duration}
                        onChange={(e) =>
                          setExercise({ ...Exercise, duration: e.target.value })
                        } 
                        />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDuration">
                    <Form.Label>Date:</Form.Label>
                    <DatePicker
                        selected={Exercise.date}
                        onChange={(e) =>
                          setExercise({ ...Exercise, date: e })
                        }
                        />
            </Form.Group>

            <Button variant="primary" value="Edit Exercise Log" type="submit">
                    Submit
                </Button>
          </Form>
        </div>
  );
};

export default EditExercise;