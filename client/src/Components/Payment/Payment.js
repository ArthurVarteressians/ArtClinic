import React, { useState } from "react";
import "./Payment.css";
import Footer from "../Footer/Footer";
import SchedulingNav from "../Scheduling/SchedulingNav";

const CardDetails = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleCardExpiryChange = (event) => {
    setCardExpiry(event.target.value);
  };

  const handleCardCvvChange = (event) => {
    setCardCvv(event.target.value);
  };

  return (
    <>
      <SchedulingNav />
      <div className="PaymentSec">
        <form className="payment-form">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              placeholder="Enter card number"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardName">Cardholder Name</label>
            <input
              type="text"
              className="form-control"
              id="cardName"
              placeholder="Enter cardholder name"
              value={cardName}
              onChange={handleCardNameChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="cardExpiry">Expiration Date</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="cardExpiry"
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={handleCardExpiryChange}
              />
            </div>
            <div className="form-group col-md-6 cvv-container">
              <label htmlFor="cardCvv">CVV</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="cardCvv"
                placeholder="Enter CVV"
                value={cardCvv}
                onChange={handleCardCvvChange}
              />
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-primary" >
              Submit Payment
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CardDetails;
