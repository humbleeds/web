import React, { useState } from "react";
import "../App";
import Axios from 'axios';
import Modal from "react-modal";

Modal.setAppElement("#root");

function Discounts() {
    const [discountDescription, setDiscountDescription] = useState("");
    const [discountDuration, setDiscountDuration] = useState("");
    const [discountList, setDiscountList] = useState([]);
    const [newDiscountDuration, setNewDiscountDuration] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const displayDiscounts = () => {
      Axios.get("http://localhost:3001/api/get-discounts").then((response) => {
        console.log(response.data);
        setDiscountList(response.data);
      });
    };
  
    const submitDiscount = () => {
      Axios.post("http://localhost:3001/api/insert-discount", {
        discountDescription: discountDescription,
        discountDuration: discountDuration,
      });
      setDiscountList([
        ...discountList,
        {
          discountDescription: discountDescription,
          discountDuration: discountDuration,
        },
      ]);
    };
  
    const deleteDiscount = (discountDescription) => {
      Axios.delete(`http://localhost:3001/api/delete-discount/${discountDescription}`);
    };
  
    const updateDiscount = (discountDescription) => {
      Axios.put("http://localhost:3001/api/update-discount-duration", {
        newDiscountDuration: newDiscountDuration,
        discountDescription: discountDescription,
      });
      setNewDiscountDuration("");
    };
  
    return (
      <div>
        <div class="registration-form">
          <form>
            <h5 class="card-title">Add new discount</h5>
            <div class="form-group">
              <input
                type="text"
                class="form-control item"
                placeholder="Short description..."
                onChange={(e) => {
                  setDiscountDescription(e.target.value);
                }}
                required
                autoFocus
              />
            </div>
  
            <div class="form-group">
              <input
                class="form-control item"
                type="text"
                placeholder="Discount duration..."
                onChange={(e) => {
                  setDiscountDuration(e.target.value);
                }}
              />
            </div>
            <button
              type="button"
              class="button-submit"
              onClick={submitDiscount}>
              Add discount to database
            </button>
          </form>
        </div>
  
        <div class="display-clients-section">
          <button class="button-submit" onClick={displayDiscounts}>Display all discounts</button>
          {discountList.map((discount) => {
            return (
              <div class="entity-cards" key={discount.discountID}>
                <h1>{discount.discountDescription}</h1>
                <p>{discount.discountDuration}</p>
                <p>{discount.trainerBirthdate}</p>
  
                <button
                  onClick={() => {
                    deleteDiscount(discount.discountDescription);
                  }}
                >
                  Delete discount
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
                <h1>Edit discount</h1>
                <input
                  type="text"
                  placeholder="Edit discount..."
                  onChange={(e) => {
                    setNewDiscountDuration(e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    updateDiscount(discount.discountDescription);
                  }}
                >
                  Change discount duration
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

export default Discounts; 