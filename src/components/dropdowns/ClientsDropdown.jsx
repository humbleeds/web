import React, { Component } from "react";
import Axios from 'axios';

class ClientsDropdown extends Component {
  state = {
    clients: [],
  };

  componentDidMount() {
    Axios.get("http://localhost:3001/api/get")
      .then((response) => {
        return response;
      })
      .then((response) => { 
        const clientsFromApi = response.data;
        this.setState({
          clients: [{ value: "", display: "(Select client)" }].concat(
            clientsFromApi
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
          {this.state.clients.map((client) => (
            <option key={client.clientID} value={client.display}>
              {client.display}
              {client.clientName}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default ClientsDropdown;