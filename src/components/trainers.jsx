import React, { useState } from "react";
import "../App";
import Axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Trainers() {
  const [trainerName, setTrainerName] = useState("");
  const [trainerSkill, setTrainerSkill] = useState("");
  const [trainerBirthdate, setTrainerBirthdate] = useState("");
  const [trainerList, setTrainerList] = useState([]);
  const [newTrainerName, setNewTrainerName] = useState([]);
  const [newTrainerSkill, setNewTrainerSkill] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const displayTrainers = () => {
    Axios.get("http://localhost:3001/api/get-trainers").then((response) => {
      console.log(response.data);
      setTrainerList(response.data);
    });
  };

  const submitTrainer = () => {
    Axios.post("http://localhost:3001/api/insert-trainer", {
      trainerName: trainerName,
      trainerSkill: trainerSkill,
      trainerBirthdate: trainerBirthdate,
    });
    setTrainerList([
      ...trainerList,
      {
        trainerName: trainerName,
        trainerSkill: trainerSkill,
        trainerBirthdate: trainerBirthdate,
      },
    ]);
  };

  const deleteTrainer = (trainerName) => {
    Axios.delete(`http://localhost:3001/api/delete-trainer/${trainerName}`);
  };

  const updateTrainerName = (trainerName) => {
    Axios.put("http://localhost:3001/api/update-trainername", {
      newTrainerName: newTrainerName,
      trainerName: trainerName,
    });
    setNewTrainerName("");
  };

  const updateTrainerSkill = (trainerName) => {
    Axios.put("http://localhost:3001/api/update-trainerskill", {
      newTrainerSkill: newTrainerSkill,
      trainerName: trainerName,
    });
    setNewTrainerSkill("");
  };

  return (
    <div>
      <div class="registration-form">
        <form>
          <h5 class="card-title">Add new trainer</h5>
          <div class="form-group">
            <input
              type="text"
              class="form-control item"
              placeholder="Name..."
              onChange={(e) => {
                setTrainerName(e.target.value);
              }}
              required
              autoFocus
            />
          </div>

          <div class="form-group">
            <select
              class="form-control item"
              onChange={(e) => {
                setTrainerSkill(e.target.value);
              }}
            >
              <option>Fitness</option>
              <option>Crossfit</option>
              <option>Powerlifting</option>
              <option>Yoga</option>
            </select>
          </div>

          <div class="form-group">
            <input
              class="form-control item"
              type="date"
              placeholder="Brithdate ..."
              onChange={(e) => {
                setTrainerBirthdate(e.target.value);
              }}
            />
          </div>
          <button type="button" class="button-submit" onClick={submitTrainer}>
            Add trainer to database
          </button>
        </form>
      </div>

      <div class="display-clients-section">
        <button class="button-submit" onClick={displayTrainers}>Display all trainers</button>
        {trainerList.map((trainer) => {
          return (
            <div key={trainer.trainerID} class="entity-cards">
              <h1>{trainer.trainerName}</h1>
              <p>{trainer.trainerSkill}</p>
              <p>{trainer.trainerBirthdate}</p>

              <button
                onClick={() => {
                  deleteTrainer(trainer.trainerName);
                }}>
                Delete trainer
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
                <h1>Edit trainer info</h1>
                <input
                  type="text"
                  placeholder="Edit trainer name..."
                  onChange={(e) => {
                    setNewTrainerName(e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    updateTrainerName(trainer.trainerName);
                  }}
                >
                  Change trainer name
                </button>
                <input
                  type="text"
                  placeholder="Edit trainer skill..."
                  onChange={(e) => {
                    setNewTrainerSkill(e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    updateTrainerSkill(trainer.trainerSkill);
                  }}
                >
                  Change trainer skill
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
export default Trainers;
