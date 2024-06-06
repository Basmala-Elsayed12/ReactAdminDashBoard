import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../index.css";
import { useParams } from "react-router-dom";
import { getAuthtoken } from "../../helper/Storage";
import axios from "axios";

export default function UpdateTourismPlaces() {
  let { id } = useParams();
  const auth = getAuthtoken();
  const [tourismPlace, settourismPlace] = useState({
    name: "",
    governrate: { _id: "", name: "" },
    images: [],
    imgCover: "",
    err: "",
    loading: false,
    success: null,
    reload: false,
  });
  const images = useRef(null);
  const imgCover = useRef(null);

  const UpdateTourismPlace = (e) => {
    e.preventDefault();

    settourismPlace((prevState) => ({ ...prevState, loading: true }));

    const formData = new FormData();
    formData.append("name", tourismPlace.name);
    formData.append("governrate", tourismPlace.governrate._id);

    if (imgCover.current.files && imgCover.current.files[0]) {
      formData.append("imgCover", imgCover.current.files[0]);
    }

    if (images.current.files) {
      for (let i = 0; i < images.current.files.length; i++) {
        formData.append("images", images.current.files[i]);
      }
    }

    axios
      .put(
        `https://kemet-gp2024.onrender.com/api/v1/tourismPlaces/${id}`,
        formData,
        {
          headers: { token: auth.token }, // Ensure token is passed correctly
        }
      )
      .then(() => {
        settourismPlace({
          name: "",
          governrate: { _id: "", name: "" },
          images: [],
          imgCover: "",
          err: "",
          loading: false,
          success: "Tourism place updated successfully",
          reload: false,
        });
      })
      .catch((error) => {
        console.log(error);
        settourismPlace((prevState) => ({
          ...prevState,
          loading: false,
          success: null,
          err: "Something went wrong. Please try again.",
        }));
      });
  };

  useEffect(() => {
    axios
      .get(`https://kemet-gp2024.onrender.com/api/v1/tourismPlaces/${id}`, {
        headers: { token: auth.token }, // Ensure token is passed correctly
      })
      .then((resp) => {
        console.log("API Response:", resp.data); // Log the API response
        if (resp.data.document) {
          settourismPlace((prevState) => ({
            ...prevState,
            name: resp.data.document.name || "",
            images: resp.data.document.images || [],
            imgCover: resp.data.document.imgCover || "",
            governrate: {
              _id: resp.data.document.governrate._id || "",
              name: resp.data.document.governrate.name || "",
            },
            err: "",
            loading: false,
            success: null,
          }));
          console.log(resp);
        } else {
          settourismPlace((prevState) => ({
            ...prevState,
            loading: false,
            success: null,
            err: "Tourism place data not found",
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        settourismPlace((prevState) => ({
          ...prevState,
          loading: false,
          success: null,
          err: "Failed to load tourism place data. Please try again.",
        }));
      });
  }, [id, tourismPlace.reload]);

  return (
    <div className="forms-container">
      <h1 className="text-design">Update Tourism Place</h1>
      {tourismPlace.err && (
        <div className="alert alert-danger" role="alert">
          {tourismPlace.err}
        </div>
      )}
      {tourismPlace.success && (
        <div className="alert alert-success" role="alert">
          {tourismPlace.success}
        </div>
      )}
      <Form onSubmit={UpdateTourismPlace}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Governorate Name"
            value={tourismPlace.governrate._id}
            onChange={(e) =>
              settourismPlace({
                ...tourismPlace,
                governrate: {
                  ...tourismPlace.governrate,
                  name: e.target.value,
                },
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            value={tourismPlace.name}
            onChange={(e) =>
              settourismPlace({ ...tourismPlace, name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <input className="form-control" type="file" ref={imgCover} />
        </Form.Group>
        <Form.Group className="mb-3">
          <input className="form-control" type="file" multiple ref={images} />
        </Form.Group>

        <Button className="btn custom-button w-100" type="submit">
          Update Tourism Place
        </Button>
      </Form>
    </div>
  );
}
