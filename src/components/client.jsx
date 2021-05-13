import React, { useState, useEffect } from "react";
import "../App";
import Axios from "axios";

function Clients() {
  const [clientName, setClientName] = useState("");
  const [clientGender, setClientGender] = useState("");
  const [clientBirthdate, setClientBirthdate] = useState("");
  const [clientList, setClientList] = useState([]);
  const [newClientName, setNewClientName] = useState("");

  const displayClients = () => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data);
      setClientList(response.data);
    });
  };

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      clientName: clientName,
      clientGender: clientGender,
      clientBirthdate: clientBirthdate,
    });
    setClientList([
      ...clientList,
      {
        clientName: clientName,
        clientGender: clientGender,
        clientBirthdate: clientBirthdate,
      },
    ]);
  };

  const deleteClient = (clientName) => {
    Axios.delete(`http://localhost:3001/api/delete/${clientName}`);
  };

  const updateClientName = (clientName) => {
    Axios.put("http://localhost:3001/api/update", {
      clientName: clientName,
    });
    setNewClientName("");
  };

  return (
    <div>
    <div class="registration-form">
      <form>
        <h5 class="card-title">Add new client</h5>
        <div class="form-group">
          <input
            type="text"
            id="inputUserame"
            class="form-control item"
            placeholder="Name..."
            onChange={(e) => {
              setClientName(e.target.value);
            }}
            required
            autofocus
          />
        </div>

        <div class="form-group">
          <select
            class="form-control item"
            name="clientGender"
            onChange={(e) => {
              setClientGender(e.target.value);
            }}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div class="form-group">
          <input
            class="form-control item"
            type="date"
            name="clientBirthdate"
            placeholder="Brithdate ..."
            onChange={(e) => {
              setClientBirthdate(e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          class="btn btn-block create-account"
          onClick={submitReview}
        >
          Add client to database.
        </button>
      </form>
    </div>
    
    <div class="display-clients-section">
        <button onClick={displayClients}>Display clients!</button>
        {clientList.map((val) => {
          return (
            <div class="clientCards">
              <h1>{val.clientName}</h1>
              <p>{val.clientGender}</p>
              <p>{val.clientBirthdate}</p>

              <button
                onClick={() => {
                  deleteClient(val.clientName);
                }}
              >
                Delete client
              </button>
              <input
                type="text"
                onChange={(e) => {
                  setNewClientName(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateClientName(val.clientName);
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

export default Clients;
