import React, { useState, useEffect } from "react";
import "../App";
import Axios from 'axios';

function Discounts() {
    const [discountDescription, setDiscountDescription] = useState("");
    const [discountDuration, setDiscountDuration] = useState("");
    const [discountList, setDiscountList] = useState([]);
    const [newDiscountDescription, setNewDiscountDescription] = useState([]);
  
    const displayDiscounts = () => {
      Axios.get("http://localhost:3001/api/get").then((response) => {
        console.log(response.data);
        setDiscountList(response.data);
      });
    };
  
    const submitDiscount = () => {
      Axios.post("http://localhost:3001/api/insert", {
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
      Axios.delete(`http://localhost:3001/api/delete/${discountDescription}`);
    };
  
    const updateDiscount = (discountDescription) => {
      Axios.put("http://localhost:3001/api/update", {
        discountDescription: discountDescription,
      });
      setNewDiscountDescription("");
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
                autofocus
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
          {discountList.map((val) => {
            return (
              <div class="clientCards">
                <h1>{val.discountDescription}</h1>
                <p>{val.discountDuration}</p>
                <p>{val.trainerBirthdate}</p>
  
                <button
                  onClick={() => {
                    deleteDiscount(val.discountDescription);
                  }}
                >
                  Delete discount
                </button>
                <input
                  type="text"
                  onChange={(e) => {
                    setNewDiscountDescription(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateDiscount(val.discountDescription);
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

export default Discounts; 