import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../index.css";
import { getAuthtoken } from "../../helper/Storage";
import axios from "axios";

export default function AddUser() {
  // Get authentication token
  const auth = getAuthtoken();

  // Initialize user state
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
    role: "",
    DOB: "", // Added DOB to match the form inputs
    city: "", // Added city to match the form inputs
    err: "",
    loading: false,
    success: null,
  });

  // Reference for profile image input
  const profileImg = useRef(null);

  // Function to handle form submission and create a new user
  const createUser = (e) => {
    e.preventDefault();

    // Set loading state
    setUser({ ...user, loading: true });

    // Create form data object to hold the user details
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);

    formData.append("email", user.email);
    formData.append("role", user.role);
    formData.append("password", user.password);
    formData.append("rePassword", user.rePassword);
    formData.append("DOB", user.DOB); // Adding DOB to form data
    formData.append("city", user.city); // Adding city to form data

    // Append profile image if provided
    if (profileImg.current.files) {
      formData.append("profileImg", profileImg.current.files[0]);
    }

    // Send POST request to create a new user
    axios
      .post("https://kemet-gp2024.onrender.com/api/v1/users", formData, {
        headers: {
          token: auth.token,
        },
      })
      .then(() => {
        // On success, reset the form and set success message
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          rePassword: "",
          role: "",
          DOB: "",
          city: "",
          err: "",
          loading: false,
          success: "Added successfully",
        });
      })
      .catch((error) => {
        // On error, set error message
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Failed to add user. Please try again.";
        setUser({
          ...user,
          loading: false,
          success: null,
          err: errorMessage,
        });
      });
  };

  return (
    <div className="forms-container">
      <h1 className="text-design">Add New User+</h1>
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
      <Form onSubmit={createUser}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="firstName"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="lastName"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="RePassword"
            value={user.rePassword}
            onChange={(e) => setUser({ ...user, rePassword: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="YY-MM-DD"
            value={user.DOB}
            onChange={(e) => setUser({ ...user, DOB: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="City"
            value={user.city}
            onChange={(e) => setUser({ ...user, city: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <input className="form-control" type="file" ref={profileImg}></input>
        </Form.Group>
        <Button
          style={{ backgroundColor: "#193175" }}
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={user.loading}
        >
          {user.loading ? "Adding..." : "Add New User+"}
        </Button>
      </Form>
    </div>
  );
}
