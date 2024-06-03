import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../index.css";
import { useParams } from "react-router-dom";
import { getAuthtoken } from "../../helper/Storage";
import axios from "axios";
import { useState } from "react";
export default function UpdateOffers() {
  let { id } = useParams();
  const auth = getAuthtoken();
  const [offer, setoffer] = useState({
    discount: "",
    err: "",
    loading: false,
    success: null,
    reload: false,
  });
  const UpdateOffer = (e) => {
    e.preventDefault();

    setoffer((prevState) => ({ ...prevState, loading: true }));

    axios
      .put(
        `https://kemet-gp2024.onrender.com/api/v1/offers/${id}`,

        {
          discount: Number(offer.discount),
        },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then(() => {
        setoffer({
          discount: "",
          err: "",
          loading: false,
          success: "offer updated successfully",
          reload: false,
        });
      })
      .catch((error) => {
        console.log(error);
        setoffer((prevState) => ({
          ...prevState,
          loading: false,
          success: null,
          err: "Something went wrong. Please try again.",
        }));
      });
  };

  return (
    <div className="forms-container">
      <h1 className="text-design"> Update offer </h1>
      {offer.err && (
        <div className="alert alert-danger" role="alert">
          {offer.err}
        </div>
      )}
      {offer.success && (
        <div className="alert alert-success" role="alert">
          {offer.success}
        </div>
      )}
      <Form onSubmit={UpdateOffer}>
        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            placeholder="discount"
            value={offer.discount}
            onChange={(e) => setoffer({ ...offer, discount: e.target.value })}
          />
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Update offer
        </Button>
      </Form>
    </div>
  );
}
