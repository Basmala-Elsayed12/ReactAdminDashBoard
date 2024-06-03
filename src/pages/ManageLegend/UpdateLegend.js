import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { getAuthtoken } from "../../helper/Storage";
import axios from "axios";
export default function UpdateLegend() {
  let { id } = useParams();
  const auth = getAuthtoken();
  const [legend, setlegend] = useState({
    name: "",
    informationAbout: "",
    images: "",
    imgCover: "",
    err: "",
    loading: false,
    success: null,
    reload: false,
  });
  const images = useRef(null);
  const imgCover = useRef(null);

  const UpdateLegend = (e) => {
    e.preventDefault();

    setlegend((prevState) => ({ ...prevState, loading: true }));

    const formData = new FormData();
    formData.append("name", legend.name);
    formData.append("informationAbout", legend.informationAbout);

    if (imgCover.current.files && imgCover.current.files[0]) {
      formData.append("imgCover", imgCover.current.files[0]);
    }

    if (images.current.files) {
      for (let i = 0; i < images.current.files.length; i++) {
        formData.append("images", images.current.files[i]);
      }
    }

    axios
      .put(`https://kemet-gp2024.onrender.com/api/v1/legends/${id}`, formData, {
        headers: { token: auth.token }, // Ensure token is passed correctly
      })
      .then(() => {
        setlegend({
          name: "",
          informationAbout: "",
          images: "",
          imgCover: "",
          err: "",
          loading: false,
          success: "legend updated successfully",
          reload: false,
        });
      })
      .catch((error) => {
        console.log(error);
        setlegend((prevState) => ({
          ...prevState,
          loading: false,
          success: null,
          err: "Something went wrong. Please try again.",
        }));
      });
  };

  useEffect(() => {
    axios
      .get(`https://kemet-gp2024.onrender.com/api/v1/legends/${id}`, {
        headers: { token: auth.token }, // Ensure token is passed correctly
      })
      .then((resp) => {
        console.log("API Response:", resp.data); // Log the API response
        if (resp.data.document) {
          setlegend((prevState) => ({
            ...prevState,
            name: resp.data.document.name || "",
            images: resp.data.document.images || "",
            imgCover: resp.data.document.imgCover || "",
            informationAbout: resp.data.document.informationAbout || "",

            err: "",
            loading: false,
            success: null,
          }));
          console.log(resp);
        } else {
          setlegend((prevState) => ({
            ...prevState,
            loading: false,
            success: null,
            err: "govern data not found",
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        setlegend((prevState) => ({
          ...prevState,
          loading: false,
          success: null,
          err: "Failed to load govern data. Please try again.",
        }));
      });
  }, [id, legend.reload]);

  return (
    <div className="forms-container">
      <h1 className="text-design"> Update Legend </h1>
      {legend.err && (
        <div className="alert alert-danger" role="alert">
          {legend.err}
        </div>
      )}
      {legend.success && (
        <div className="alert alert-success" role="alert">
          {legend.success}
        </div>
      )}
      <Form onSubmit={UpdateLegend}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="name"
            value={legend.name}
            onChange={(e) => setlegend({ ...legend, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Describtion"
            rows={5}
            value={legend.informationAbout}
            onChange={(e) =>
              setlegend({ ...legend, informationAbout: e.target.value })
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
            multiple
            ref={images}
          ></input>
        </Form.Group>
        <Button
          style={{ backgroundColor: "#193175" }}
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
        >
          Update Legend
        </Button>
      </Form>
    </div>
  );
}
