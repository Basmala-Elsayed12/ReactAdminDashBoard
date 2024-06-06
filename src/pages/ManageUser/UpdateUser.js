import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../index.css";
import { getAuthtoken } from "../../helper/Storage";
import axios from "axios";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdateUser() {
  let { id } = useParams(); // Correctly extract the URL parameter
  const auth = getAuthtoken();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",

    password: "",
    rePassword: "",
    profileImg: null,
    role: "",
    DOB: "",
    city: "",
    err: "",
    loading: false,
    success: null,
    reload: false,
  });
  const profileImg = useRef(null);

  const UpdateUser = (e) => {
    e.preventDefault();

    setUser((prevState) => ({ ...prevState, loading: true }));

    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);

    formData.append("role", user.role);
    formData.append("password", user.password);
    formData.append("rePassword", user.rePassword);
    formData.append("DOB", user.DOB);
    formData.append("city", user.city);

    if (profileImg.current.files.length > 0) {
      formData.append("profileImg", profileImg.current.files[0]);
    }

    axios
      .put(`https://kemet-gp2024.onrender.com/api/v1/users/${id}`, formData, {
        headers: { token: auth.token }, // Ensure token is passed correctly
      })
      .then(() => {
        setUser({
          firstName: "",
          lastName: "",

          password: "",
          rePassword: "",
          profileImg: null,
          role: "",
          DOB: "",
          city: "",
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
            firstName: resp.data.user.firstName || "",
            lastName: resp.data.user.lastName || "",

            password: resp.data.user.password || "",
            rePassword: resp.data.user.rePassword || "",
            profileImg: resp.data.user.profileImg || null,
            role: resp.data.user.role || "",
            city: resp.data.user.city || "",
            DOB: resp.data.user.DOB ? resp.data.user.DOB.split("T")[0] : "",
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
            type="name"
            placeholder="First Name"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="name"
            placeholder="Last Name"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Re-enter Password"
            value={user.rePassword}
            onChange={(e) => setUser({ ...user, rePassword: e.target.value })}
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
