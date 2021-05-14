import React, { useState } from "react";
import "../App";
import Axios from "axios";

function Trainers() {
  const [trainerName, setTrainerName] = useState("");
  const [trainerSkill, setTrainerSkill] = useState("");
  const [trainerBirthdate, setTrainerBirthdate] = useState("");
  const [trainerList, setTrainerList] = useState([]);
  const [newTrainerName, setNewTrainerName] = useState([]);

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

  const updateTrainer = (trainerName) => {
    Axios.put("http://localhost:3001/api/update", {
      trainerName: trainerName,
    });
    setNewTrainerName("");
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
              autofocus
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
        {trainerList.map((val) => {
          return (
            <div class="clientCards">
              <h1>{val.trainerName}</h1>
              <p>{val.trainerSkill}</p>
              <p>{val.trainerBirthdate}</p>

              <button
                onClick={() => {
                  deleteTrainer(val.trainerName);
                }}>
                Delete trainer
              </button>
              <input
                type="text"
                onChange={(e) => {
                  setNewTrainerName(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateTrainer(val.trainerName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Trainers;
