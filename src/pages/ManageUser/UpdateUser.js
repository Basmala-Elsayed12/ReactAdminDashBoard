import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../index.css";
import { getAuthtoken } from "../../helper/Storage";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdateUser() {
  let { id } = useParams(); // Correctly extract the URL parameter
  const auth = getAuthtoken();
  const [user, setUser] = useState({
    role: "",

    err: "",
    loading: false,
    success: null,
    reload: false,
  });

  const UpdateUser = (e) => {
    e.preventDefault();

    setUser((prevState) => ({ ...prevState, loading: true }));

    const formData = new FormData();

    formData.append("role", user.role);

    axios
      .put(`https://kemet-gp2024.onrender.com/api/v1/users/${id}`, formData, {
        headers: { token: auth.token }, // Ensure token is passed correctly
      })
      .then(() => {
        setUser({
          role: "",

          err: "",
          loading: false,
          success: "User updated successfully",
          reload: false,
        });
      })
      .catch((error) => {
        console.log(error);
        setUser((prevState) => ({
          ...prevState,
          loading: false,
          success: null,
          err: "Something went wrong. Please try again.",
        }));
      });
  };

  useEffect(() => {
    axios
      .get(`https://kemet-gp2024.onrender.com/api/v1/users/${id}`, {
        headers: { token: auth.token }, // Ensure token is passed correctly
      })
      .then((resp) => {
        console.log("API Response:", resp.data); // Log the API response
        if (resp.data.user) {
          setUser((prevState) => ({
            ...prevState,

            role: resp.data.user.role || "",

            err: "",
            loading: false,
            success: null,
          }));
        } else {
          setUser((prevState) => ({
            ...prevState,
            loading: false,
            success: null,
            err: "User data not found",
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        setUser((prevState) => ({
          ...prevState,
          loading: false,
          success: null,
          err: "Failed to load user data. Please try again.",
        }));
      });
  }, [id, user.reload]);

  return (
    <div className="forms-container">
      <h1 className="text-design">Update User</h1>
      {user.err && (
        <div className="alert alert-danger" role="alert">
          {user.err}
        </div>
      )}
      {user.success && (
        <div className="alert alert-success" role="alert">
          {user.success}
        </div>
      )}
      <Form onSubmit={UpdateUser}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <Form.Control
            type="isBlockled"
            placeholder="isBlockled"
            value={user.isBlockled}
            onChange={(e) => setUser({ ...user, isBlockled: e.target.value })}
          />
        </Form.Group> */}

        <Button
          style={{ backgroundColor: "#193175", fontWeight: "bold" }}
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
        >
          Update User
        </Button>
      </Form>
    </div>
  );
}
