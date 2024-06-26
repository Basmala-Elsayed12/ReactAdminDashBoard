import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { getAuthtoken } from "../../helper/Storage";

export default function AddOffers() {
  const auth = getAuthtoken();
  const [Offer, setOffer] = useState({
    trip: "",
    discount: "",
    err: "",
    loading: false,
    success: null,
  });

  const createOffer = (e) => {
    e.preventDefault();
    setOffer({ ...Offer, loading: true });

    axios
      .post(
        "https://kemet-gp2024.onrender.com/api/v1/offers",
        {
          trip: Offer.trip,
          discount: Number(Offer.discount),
        },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then((response) => {
        console.log("Server response:", response);
        setOffer({
          ...Offer,
          trip: "",
          discount: "",
          err: "",
          loading: false,
          success: "Added successfully",
        });
      })
      .catch((error) => {
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Something went wrong";
        console.log("Error details:", error.response);
        setOffer({
          ...Offer,
          loading: false,
          success: null,
          err: errorMessage,
        });
      });
  };

  return (
    <div className="forms-container">
      <h1 className="text-design">Add New offer +</h1>
      {Offer.err && (
        <div className="alert alert-danger" role="alert">
          {Offer.err}
        </div>
      )}
      {Offer.success && (
        <div className="alert alert-success" role="alert">
          {Offer.success}
        </div>
      )}
      <Form onSubmit={createOffer}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Trip ID"
            value={Offer.trip}
            onChange={(e) => setOffer({ ...Offer, trip: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            placeholder="Discount"
            value={Offer.discount}
            onChange={(e) => setOffer({ ...Offer, discount: e.target.value })}
            required
          />
        </Form.Group>
        <Button
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={Offer.loading}
        >
          {Offer.loading ? "Adding..." : "Add New Offer +"}
        </Button>
      </Form>
    </div>
  );
}
