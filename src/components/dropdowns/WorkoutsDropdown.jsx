import React, { Component } from "react";
import Axios from 'axios';

class WorkoutsDropdown extends Component {
  state = {
    workouts: [],
  };

  componentDidMount() {
    Axios.get("http://localhost:3001/api/get-workouts")
      .then((response) => {
        return response;
      })
      .then((response) => { 
        const workoutsFromApi = response.data;
        this.setState({
          workouts: [{ value: "", display: "(Select workout)" }].concat(
            workoutsFromApi
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
        <select class="form-control item" required autoFocus onChange={this.props.onChange}>
          {this.state.workouts.map((workout) => (
            <option key={workout.workoutID} value={workout.display}>
              {workout.display}
              {workout.workoutType}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default WorkoutsDropdown;
