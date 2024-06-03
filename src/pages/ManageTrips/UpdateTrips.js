import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../index.css";
import { useParams } from "react-router-dom";
import { getAuthtoken } from "../../helper/Storage";
import axios from "axios";
export default function UpdateTrips() {
  let { id } = useParams();
  const auth = getAuthtoken();
  const [trip, settrip] = useState({
    title: "",
    description: "",
    images: [],
    imgCover: "",
    governrate: "",
    tourismPlace: "",
    quantity: "",
    price: "",

    err: "",
    loading: false,
    success: null,
    reload: false,
  });
  const images = useRef(null);
  const imgCover = useRef(null);
  const UpdateTrip = (e) => {
    e.preventDefault();

    settrip((prevState) => ({ ...prevState, loading: true }));

    const formData = new FormData();

    formData.append("title", trip.title);
    formData.append("description", trip.description);
    formData.append("governrate", trip.governrate);
    formData.append("tourismPlace", trip.tourismPlace);
    formData.append("quantity", trip.quantity);
    formData.append("price", trip.price);

    if (imgCover.current.files && imgCover.current.files[0]) {
      formData.append("imgCover", imgCover.current.files[0]);
    }

    if (images.current.files) {
      for (let i = 0; i < images.current.files.length; i++) {
        formData.append("images", images.current.files[i]);
      }
    }

    axios
      .put(`https://kemet-gp2024.onrender.com/api/v1/trips/${id}`, formData, {
        headers: { token: auth.token }, // Ensure token is passed correctly
      })
      .then(() => {
        settrip({
          title: "",
          description: "",
          images: [],
          imgCover: "",
          governrate: "",
          tourismPlace: "",
          err: "",
          loading: false,
          success: "trip updated successfully",
          reload: false,
        });
      })
      .catch((error) => {
        console.log(error);
        settrip((prevState) => ({
          ...prevState,
          loading: false,
          success: null,
          err: "Something went wrong. Please try again.",
        }));
      });
  };
  useEffect(() => {
    axios
      .get(`https://kemet-gp2024.onrender.com/api/v1/trips/${id}`, {
        headers: { token: auth.token }, // Ensure token is passed correctly
      })
      .then((resp) => {
        console.log("API Response:", resp.data); // Log the API response
        if (resp.data.document) {
          settrip((prevState) => ({
            ...prevState,

            title: resp.data.document.title || "",
            imgCover: resp.data.document.imgCover || "",
            images: resp.data.document.images || "",

            quantity: resp.data.document.quantity || "",
            price: resp.data.document.price || "",
            governrate: resp.data.document.governrate || "",
            tourismPlace: resp.data.document.tourismPlace || "",
            description: resp.data.document.description || "",

            err: "",
            loading: false,
            success: null,
          }));
          console.log(resp);
        } else {
          settrip((prevState) => ({
            ...prevState,
            loading: false,
            success: null,
            err: "govern data not found",
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        settrip((prevState) => ({
          ...prevState,
          loading: false,
          success: null,
          err: "Failed to load govern data. Please try again.",
        }));
      });
  }, [id, trip.reload]);

  return (
    <div className="forms-container">
      <h1 className="text-design"> Update trip </h1>
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
      <Form onSubmit={UpdateTrip}>
        <Form.Group className="mb-3">
          <Form.Control
            type="name"
            placeholder="title"
            value={trip.title}
            onChange={(e) => settrip({ ...trip, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            placeholder="quantity"
            value={trip.quantity}
            onChange={(e) => settrip({ ...trip, quantity: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            placeholder="price"
            value={trip.price}
            onChange={(e) => settrip({ ...trip, price: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="id"
            placeholder="govern-id"
            value={trip.governrate}
            onChange={(e) => settrip({ ...trip, governrate: e.target.value })}
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
            onChange={(e) => settrip({ ...trip, description: e.target.value })}
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
        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Update trip
        </Button>
      </Form>
    </div>
  );
}
