import React, { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../index.css";
import { getAuthtoken } from "../../helper/Storage";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateGovernorate() {
  let { id } = useParams();
  const auth = getAuthtoken();
  const [govern, setgovern] = useState({
    name: "",
    img: null,
    err: "",
    loading: false,
    success: null,
    reload: false,
  });
  const img = useRef(null);

  const Updategovern = (e) => {
    e.preventDefault();

    setgovern((prevState) => ({ ...prevState, loading: true }));

    const formData = new FormData();
    formData.append("name", govern.name);

    if (img.current.files && img.current.files[0]) {
      formData.append("img", img.current.files[0]);
    }

    axios
      .put(
        `https://kemet-gp2024.onrender.com/api/v1/governrates/${id}`,
        formData,
        {
          headers: { token: auth.token }, // Ensure token is passed correctly
        }
      )
      .then(() => {
        setgovern({
          name: "",
          img: "",
          err: "",
          loading: false,
          success: "govern updated successfully",
          reload: false,
        });
      })
      .catch((error) => {
        console.log(error);
        setgovern((prevState) => ({
          ...prevState,
          loading: false,
          success: null,
          err: "Something went wrong. Please try again.",
        }));
      });
  };

  useEffect(() => {
    axios
      .get(`https://kemet-gp2024.onrender.com/api/v1/governrates/${id}`, {
        headers: { token: auth.token }, // Ensure token is passed correctly
      })
      .then((resp) => {
        console.log("API Response:", resp.data); // Log the API response
        if (resp.data.document) {
          setgovern((prevState) => ({
            ...prevState,
            name: resp.data.document.name || "",
            image: resp.data.document.image || "",
            err: "",
            loading: false,
            success: null,
          }));
          console.log(resp);
        } else {
          setgovern((prevState) => ({
            ...prevState,
            loading: false,
            success: null,
            err: "govern data not found",
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        setgovern((prevState) => ({
          ...prevState,
          loading: false,
          success: null,
          err: "Failed to load govern data. Please try again.",
        }));
      });
  }, [id, govern.reload]);

  return (
    <div className="forms-container">
      <h1
        className="text-design"
        style={{ color: "#193175", fontWeight: "bold" }}
      >
        Update Governorate
      </h1>
      {govern.err && (
        <div className="alert alert-danger" role="alert">
          {govern.err}
        </div>
      )}
      {govern.success && (
        <div className="alert alert-success" role="alert">
          {govern.success}
        </div>
      )}
      <Form onSubmit={Updategovern}>
        <Form.Group className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="name"
            value={govern.name}
            onChange={(e) => setgovern({ ...govern, name: e.target.value })}
          ></input>
        </Form.Group>
        <Form.Group className="mb-3">
          <input className="form-control" type="file" ref={img}></input>
        </Form.Group>
        {/* <img
          src={govern.image}
          alt={govern.name}
          style={{ width: "100%", height: "10%", marginBottom: "7px" }}
        /> */}
        <Button
          style={{ backgroundColor: "#193175" }}
          className="btn  w-100"
          variant="primary"
          type="submit"
        >
          Update Governorate
        </Button>
      </Form>
    </div>
  );
}
