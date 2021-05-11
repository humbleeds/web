import React, { useState, useEffect } from "react";
import "../App";
import Axios from "axios";

function Clients() {
  const [clientName, setClientName] = useState("");
  const [clientGender, setClientGender] = useState("");
  const [clientBirthdate, setClientBirthdate] = useState("");
  const [clientList, setClientList] = useState([]);

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
  }

  return (
    <div>
      <div className="Form">
        <div className="title">Add new client</div>
        <div className="inputs">
          <form>
            <input
              type="text"
              name="clientName"
              placeholder="Name..."
              onChange={(e) => {
                setClientName(e.target.value);
              }}
            />
            <label>Gender:</label>
            <select
              name="clientGender"
              onChange={(e) => {
                setClientGender(e.target.value);
              }}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              type="date"
              name="clientBirthdate"
              placeholder="Brithdate ..."
              onChange={(e) => {
                setClientBirthdate(e.target.value);
              }}
            />
            <input type="submit" id="submit" onClick={submitReview} />
          </form>
        </div>
      </div>
      <button onClick={displayClients}>Display clients!</button>
      {clientList.map((val) => {
        return (
          <div className="clientCard">
            <h1>{val.clientName}</h1>
            <p>{val.clientGender}</p>
            <p>{val.clientBirthdate}</p>

            <button onClick={() => {deleteClient(val.clientName)}}>Delete client</button>
            <input type="text"/>
            <button>Update</button>
          </div>
        );
      })}
    </div>
  );
}

export default Clients;
