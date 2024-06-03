import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { getAuthtoken } from "../../helper/Storage";

export default function AddGovernorate() {
  const auth = getAuthtoken();
  const [govern, setGovern] = useState({
    name: "",
    err: "",
    loading: false,
    success: null,
  });

  const img = useRef(null);

  const createGovern = (e) => {
    e.preventDefault();
    setGovern({ ...govern, loading: true, err: "" });

    const formData = new FormData();
    formData.append("name", govern.name);
    if (img.current.files[0]) {
      formData.append("img", img.current.files[0]);
    }

    axios
      .post("https://kemet-gp2024.onrender.com/api/v1/governrates", formData, {
        headers: {
          token: auth.token,
        },
      })
      .then((response) => {
        console.log(response);
        setGovern({
          name: "",
          err: "",
          loading: false,
          success: "Added successfully",
        });
      })
      .catch((error) => {
        const errorResponse =
          error.response?.data?.message || "Something went wrong";
        setGovern({
          ...govern,
          loading: false,
          success: null,
          err: errorResponse,
        });
      });
  };

  return (
    <div className="forms-container">
      <h1 className="text-design">Add New Governorate+</h1>
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
      <Form onSubmit={createGovern}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            value={govern.name}
            onChange={(e) => setGovern({ ...govern, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <input className="form-control" type="file" ref={img} />
        </Form.Group>
        <Button
          style={{ backgroundColor: "#193175" }}
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={govern.loading}
        >
          {govern.loading ? "Adding..." : "Add New Governorate +"}
        </Button>
      </Form>
    </div>
  );
}
