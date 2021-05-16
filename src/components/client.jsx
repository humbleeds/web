import React, { useState } from "react";
import "../App";
import Axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Clients() {
  const [clientName, setClientName] = useState("");
  const [clientGender, setClientGender] = useState("");
  const [clientBirthdate, setClientBirthdate] = useState("");
  const [clientList, setClientList] = useState([]);
  const [newClientName, setNewClientName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const displayClients = () => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data);
      setClientList(response.data);
    });
  };

  const submitClient = () => {
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
    Axios.put("http://localhost:3001/api/update-clientname", {
      newClientName: newClientName,
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
              class="form-control item"
              placeholder="Name..."
              onChange={(e) => {
                setClientName(e.target.value);
              }}
              required
              autoFocus
            />
          </div>

          <div class="form-group">
            <select
              class="form-control item"
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
              placeholder="Brithdate ..."
              onChange={(e) => {
                setClientBirthdate(e.target.value);
              }}
            />
          </div>
          <button type="button" class="button-submit" onClick={submitClient}>
            Add client to database
          </button>
        </form>
      </div>

      <div class="display-clients-section">
        <button class="button-submit" onClick={displayClients}>
          Display all clients
        </button>
        {clientList.map((client) => {
          return (
            <div key={client.clientID} class="entity-cards">
              <h1>{client.clientName}</h1>
              <p>{client.clientGender}</p>
              <p>{client.clientBirthdate}</p>

              <button
                onClick={() => {
                  deleteClient(client.clientName);
                }}
              >
                Delete client
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
                <h1>Edit client info</h1>
                <input
                  type="text"
                  placeholder="Edit client name..."
                  onChange={(e) => {
                    setNewClientName(e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    updateClientName(client.clientName);
                  }}
                >
                  Change client name
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

export default Clients;
