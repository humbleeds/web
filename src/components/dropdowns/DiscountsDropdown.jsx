import React, { Component } from "react";
import Axios from 'axios';

class DiscountsDropdown extends Component {
  state = {
    discounts: [],
  };

  componentDidMount() {
    Axios.get("http://localhost:3001/api/get-discounts")
      .then((response) => {
        return response;
      })
      .then((response) => { 
        const discountsFromApi = response.data;
        this.setState({
          discounts: [{ value: "", display: "(Select discount)" }].concat(
            discountsFromApi
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
          {this.state.discounts.map((discount) => (
            <option key={discount.discountID} value={discount.display}>
              {discount.display}
              {discount.discountDescription}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default DiscountsDropdown;