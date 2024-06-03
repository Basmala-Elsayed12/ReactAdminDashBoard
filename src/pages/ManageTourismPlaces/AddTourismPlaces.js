import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../index.css";
import { getAuthtoken } from "../../helper/Storage";
import axios from "axios";
import { useRef, useState } from "react";

export default function AddTourismPlaces() {
  const auth = getAuthtoken();
  const [TourismPlace, setTourismPlace] = useState({
    name: "",
    informationAbout: "",
    governrate: "",
    err: "",
    loading: false,
    success: null,
  });

  const imgCover = useRef(null);
  const images = useRef(null);

  const createTourismPlace = (e) => {
    e.preventDefault();

    setTourismPlace({ ...TourismPlace, loading: true });

    const formData = new FormData(); //b5od instance mn class w 27ot fyh el data elly gyaly mn el broswer
    formData.append("name", TourismPlace.name);
    formData.append("informationAbout", TourismPlace.informationAbout);
    formData.append("governrate", TourismPlace.governrate);

    if (imgCover.current.files && imgCover.current.files[0]) {
      formData.append("imgCover", imgCover.current.files[0]);
    }

    if (images.current.files) {
      for (let i = 0; i < images.current.files.length; i++) {
        formData.append("images", images.current.files[i]);
      }
    }

    axios
      .post(
        "https://kemet-gp2024.onrender.com/api/v1/tourismPlaces",
        formData,
        {
          headers: { token: auth.token },
        }
      )
      .then(() => {
        setTourismPlace({
          ...TourismPlace,
          name: "",
          informationAbout: "",
          governrate: "",
          err: "",
          loading: false,
          success: "Added successfully",
        });
      })
      .catch(() => {
        setTourismPlace({
          ...TourismPlace,
          loading: false,
          success: null,
          err: "something went wrong",
        });
      });
  };
  return (
    <div className="forms-container">
      <h1
        className="text-center"
        style={{ color: "#193175", fontWeight: "bold" }}
      >
        Add New TourismPlace +
      </h1>

      {TourismPlace.err && (
        <div className="alert alert-danger" role="alert">
          {TourismPlace.err}
        </div>
      )}
      {TourismPlace.success && (
        <div className="alert alert-success" role="alert">
          {TourismPlace.success}
        </div>
      )}
      <Form onSubmit={createTourismPlace}>
        <Form.Group className="mb-3">
          <Form.Control
            type="id"
            placeholder="governorateId"
            value={TourismPlace.governrate}
            onChange={(e) =>
              setTourismPlace({
                ...TourismPlace,
                governrate: e.target.value,
              })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="placeName"
            value={TourismPlace.name}
            onChange={(e) =>
              setTourismPlace({ ...TourismPlace, name: e.target.value })
            }
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="informationAbout"
            rows={5}
            value={TourismPlace.informationAbout}
            onChange={(e) =>
              setTourismPlace({
                ...TourismPlace,
                informationAbout: e.target.value,
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
          style={{ backgroundColor: "#193175" }}
          className="btn  w-100"
          variant="primary"
          type="submit"
          disabled={TourismPlace.loading}
        >
          {TourismPlace.loading ? "Adding..." : "Add New TourismPlace +"}
        </Button>
      </Form>
    </div>
  );
}
