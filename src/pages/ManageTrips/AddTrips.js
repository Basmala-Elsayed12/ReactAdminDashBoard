import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../index.css";
import { getAuthtoken } from "../../helper/Storage";
import axios from "axios";
import { useRef, useState } from "react";
export default function AddTrips() {
  const auth = getAuthtoken();
  const [trip, settrip] = useState({
    title: "",
    description: "",
    governrate: "",
    tourismPlace: "",
    quantity: "",
    price: "",
    err: "",
    loading: false,
    success: null,
  });

  const imgCover = useRef(null);
  const images = useRef(null);

  const createtrip = (e) => {
    e.preventDefault();

    settrip({ ...trip, loading: true });

    const formData = new FormData(); //b5od instance mn class w 27ot fyh el data elly gyaly mn el broswer
    formData.append("title", trip.title);
    formData.append("description", trip.description);
    formData.append("governrate", trip.governrate);
    formData.append("price", trip.price);
    formData.append("tourismPlace", trip.tourismPlace);
    formData.append("quantity", trip.quantity);

    if (imgCover.current.files && images.current.files[0]) {
      formData.append("imgCover", imgCover.current.files[0]);
      formData.append("images", images.current.files[0]);
    }
    axios
      .post("https://kemet-gp2024.onrender.com/api/v1/trips", formData, {
        headers: { token: auth.token },
      })
      .then(() => {
        settrip({
          ...trip,
          title: "",
          description: "",
          governrate: "",
          tourismPlace: "",
          quantity: "",
          price: "",
          err: "",
          loading: false,
          success: "Added successfully",
        });
      })
      .catch(() => {
        settrip({
          ...trip,
          loading: false,
          success: null,
          err: "something went wrong",
        });
      });
  };
  return (
    <div className="forms-container">
      <h1 className="text-design"> Add New trip </h1>
      {trip.err && (
        <div className="alert alert-danger" role="alert">
          {trip.err}
        </div>
      )}
      {trip.success && (
        <div className="alert alert-success" role="alert">
          {trip.success}
        </div>
      )}
      <Form onSubmit={createtrip}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="title"
            value={trip.title}
            onChange={(e) => settrip({ ...trip, title: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            placeholder="quantity"
            value={trip.quantity}
            onChange={(e) => settrip({ ...trip, quantity: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            placeholder="price"
            value={trip.price}
            onChange={(e) => settrip({ ...trip, price: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="id"
            placeholder="govern-id"
            value={trip.governrate}
            onChange={(e) => settrip({ ...trip, governrate: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="id"
            placeholder="tourism-places-id"
            value={trip.tourismPlace}
            onChange={(e) => settrip({ ...trip, tourismPlace: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Describtion"
            rows={5}
            value={trip.description}
            onChange={(e) =>
              settrip({
                ...trip,
                description: e.target.value,
              })
            }
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3">
          <input className="form-control" type="file" ref={imgCover}></input>
        </Form.Group>
        <Form.Group className="mb-3">
          <input
            className="form-control"
            type="file"
            multiple // Allow multiple file selection
            // onChange={handleFileChange}
            ref={images}
          />
        </Form.Group>

        <Button
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={trip.loading}
        >
          {trip.loading ? "Adding..." : "Add New trip +"}
        </Button>
      </Form>
    </div>
  );
}
