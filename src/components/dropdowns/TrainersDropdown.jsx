import React, { Component } from "react";
import Axios from 'axios';

class TrainersDropdown extends Component {
  state = {
    trainers: [],
  };

  componentDidMount() {
    Axios.get("http://localhost:3001/api/get-trainers")
      .then((response) => {
        return response;
      })
      .then((response) => { 
        const trainersFromApi = response.data;
        this.setState({
          trainers: [{ value: "", display: "(Select trainer)" }].concat(
            trainersFromApi
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div class="form-group">
        <select class="form-control item" required autofocus>
          {this.state.trainers.map((trainer) => (
            <option key={trainer.trainerID} value={trainer.display}>
              {trainer.display}
              {trainer.trainerName}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default TrainersDropdown;
