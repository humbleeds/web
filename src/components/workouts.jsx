import React, { useState } from "react";
import "../App";
import Axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Workouts() {
  const [workoutType, setWorkoutType] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [workoutList, setWorkoutList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newWorkoutType, setNewWorkoutType] = useState("");
  const [newWorkoutDescription, setNewWorkoutDescription] = useState("");

  const displayWorkouts = () => {
    Axios.get("http://localhost:3001/api/get-workouts").then((response) => {
      console.log(response.data);
      setWorkoutList(response.data);
    });
  };

  const submitWorkout = () => {
    Axios.post("http://localhost:3001/api/insert-workout", {
      workoutType: workoutType,
      workoutDescription: workoutDescription,
    });
    setWorkoutList([
      ...workoutList,
      {
        workoutType: workoutType,
        workoutDescription: workoutDescription,
      },
    ]);
  };

  const deleteWorkout = (workoutType) => {
    Axios.delete(`http://localhost:3001/api/delete-workout/${workoutType}`);
  };

  const updateWorkoutName = (workoutType) => {
    Axios.put("http://localhost:3001/api/update-workout-name", {
      newWorkoutType: newWorkoutType,
      workoutType: workoutType,
    });
    setNewWorkoutType("");
  };

  const updateWorkoutDescription = (workoutType) => {
    Axios.put("http://localhost:3001/api/update-workout-description", {
      newWorkoutDescription: newWorkoutDescription,
      workoutType: workoutType,
    });
    setNewWorkoutDescription("");
  };

  return (
    <div>
      <div class="registration-form">
        <form>
          <h5 class="card-title">Add new workout</h5>
          <div class="form-group">
            <input
              type="text"
              class="form-control item"
              placeholder="Name..."
              onChange={(e) => {
                setWorkoutType(e.target.value);
              }}
              required
              autofocus
            />
          </div>

          <div class="form-group">
            <input
              class="form-control item"
              type="text"
              placeholder="Workout description ..."
              onChange={(e) => {
                setWorkoutDescription(e.target.value);
              }}
            />
          </div>
          <button type="button" class="button-submit" onClick={submitWorkout}>
            Add workout to database
          </button>
        </form>
      </div>

      <div class="display-clients-section">
        <button class="button-submit" onClick={displayWorkouts}>
          Display all workouts
        </button>
        {workoutList.map((workout) => {
          return (
            <div key={workout.workoutID} class="entity-cards">
              <h1>{workout.workoutType}</h1>
              <p>{workout.workoutDescription}</p>
              <p>{workout.trainerBirthdate}</p>

              <button
                onClick={() => {
                  deleteWorkout(workout.workoutType);
                }}
              >
                Delete workout
              </button>
              <button onClick={() => setModalIsOpen(true)}>Update</button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                class="Modal"
                style={{
                  overlay: {},
                  content: {
                    position: "absolute",
                    borderRadius: 30,
                    border: 50,
                    left: 500,
                    width: 400,
                    backgroundColor: "#5ba4e7",
                  },
                }}
              >
                <h1>Edit workout info</h1>
                <input
                  type="text"
                  placeholder="Edit name..."
                  onChange={(e) => {
                    setNewWorkoutType(e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    updateWorkoutName(workout.workoutType);
                  }}
                >
                  Change workout name
                </button>
                <input
                  type="text"
                  placeholder="Edit description..."
                  onChange={(e) => {
                    setNewWorkoutDescription(e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    updateWorkoutDescription(workout.workoutType);
                  }}
                >
                  Change workout description
                </button>
                <button onClick={() => setModalIsOpen(false)}>Close</button>
              </Modal>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Workouts;
