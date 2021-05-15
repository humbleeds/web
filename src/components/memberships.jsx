import React, { useState } from "react";
import "../App";
import Axios from "axios";
import Modal from "react-modal";
import WorkoutsDropdown from "./dropdowns/WorkoutsDropdown";
import TrainersDropdown from "./dropdowns/TrainersDropdown";
import ClientsDropdown from "./dropdowns/ClientsDropdown";
import DiscountsDropdown from "./dropdowns/DiscountsDropdown";

Modal.setAppElement("#root");

function Memberships() {
  const [membershipClient, setMembershipClient] = useState("");
  const [membershipDiscount, setMembershipDiscount] = useState("");
  const [membershipTrainer, setMembershipTrainer] = useState("");
  const [membershipDuration, setMembershipDuration] = useState("");
  const [membershipWorkout, setMembershipWorkout] = useState("");
  const [membershipPrice, setMembershipPrice] = useState("");
  const [newMembershipDuration, setNewMembershipDuration] = useState("");
  const [membershipList, setMembershipList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const displayMemberships = () => {
    Axios.get("http://localhost:3001/api/get-memberships").then((response) => {
      console.log(response.data);
      setMembershipList(response.data);
    });
  };

  const submitMembership = () => {
    Axios.post("http://localhost:3001/api/insert-membership", {
      membershipClient: membershipClient,
      membershipWorkout: membershipWorkout,
      membershipTrainer: membershipTrainer,
      membershipDiscount: membershipDiscount,
      membershipPrice: membershipPrice,
      membershipDuration: membershipDuration,
    });
    setMembershipList([
      ...membershipList,
      {
        membershipClient: membershipClient,
        membershipWorkout: membershipWorkout,
        membershipTrainer: membershipTrainer,
        membershipDiscount: membershipDiscount,
        membershipPrice: membershipPrice,
        membershipDuration: membershipDuration,
      },
    ]);
  };

  const deleteMembership = (membershipClient) => {
    Axios.delete(
      `http://localhost:3001/api/delete-membership/${membershipClient}`
    );
  };

  const updateMembershipDuration = (membershipClient) => {
    Axios.put("http://localhost:3001/api/update-membership-duration", {
      newMembershipDuration: newMembershipDuration,
      membershipClient: membershipClient,
    });
    setNewMembershipDuration("");
  };

  return (
    <div>
      <div class="registration-form">
        <form>
          <h5 class="card-title">Add new membership</h5>
          <ClientsDropdown onChange={(e) => {
                setMembershipClient(e.target.value);
              }}></ClientsDropdown>
          <WorkoutsDropdown></WorkoutsDropdown>
          <TrainersDropdown></TrainersDropdown>
          <DiscountsDropdown></DiscountsDropdown>
          <div class="form-group">
            <input
              class="form-control item"
              type="text"
              placeholder="Membership duration..."
              onChange={(e) => {
                setMembershipDuration(e.target.value);
              }}
            />
          </div>

          <div class="form-group">
            <input
              class="form-control item"
              type="text"
              placeholder="Membership price..."
              onChange={(e) => {
                setMembershipPrice(e.target.value);
              }}
            />
          </div>

          <button
            type="button"
            class="button-submit"
            onClick={submitMembership}
          >
            Add membership to database
          </button>
        </form>
      </div>

      <div class="display-clients-section">
        <button class="button-submit" onClick={displayMemberships}>
          Display all memberships
        </button>
        {membershipList.map((val) => {
          return (
            <div key={val.membershipID} class="entity-cards">
              <h1>{val.membershipClient}</h1>
              <p>{val.membershipDiscount}</p>
              <p>{val.trainerBirthdate}</p>

              <button
                onClick={() => {
                  deleteMembership(val.membershipClient);
                }}
              >
                Delete membership
              </button>
              <button onClick={() => setModalIsOpen(true)}>
                Update membership
              </button>
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
                  placeholder="Edit membership duration..."
                  onChange={(e) => {
                    setNewMembershipDuration(e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    updateMembershipDuration(val.membershipClient);
                  }}
                >
                  Change membership duration
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

export default Memberships;
