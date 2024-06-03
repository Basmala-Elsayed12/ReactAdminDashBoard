import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import "../../index.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthtoken } from "../../helper/Storage";

import Button from "react-bootstrap/Button";

export default function ManageUser() {
  const auth = getAuthtoken();
  const [users, setUser] = useState({
    loading: true,
    results: [],
    err: null,
    success: "",
  });
  const [loadingStates, setLoadingStates] = useState(new Map());

  const deleteUser = (_id) => {
    setLoadingStates((prev) => new Map(prev).set(_id, true));
    axios
      .delete(`https://kemet-gp2024.onrender.com/api/v1/users/${_id}`, {
        headers: { token: auth.token },
      })
      .then(() => {
        setUser((prevState) => ({
          ...prevState,
          results: prevState.results.filter((item) => item._id !== _id),
          success: "User deleted successfuly",
        }));
        setLoadingStates((prev) => {
          const newStates = new Map(prev);
          newStates.delete(_id);
          return newStates;
        });
      })
      .catch((err) => {
        setLoadingStates((prev) => new Map(prev).set(_id, false));
        console.error(err);
      });
  };
  useEffect(() => {
    setUser({ ...users, loading: true });
    axios
      .get("https://kemet-gp2024.onrender.com/api/v1/users", {
        headers: { token: auth.token },
      })
      .then((resp) => {
        setUser({
          ...users,
          loading: false,
          results: resp.data.users,
          err: null,
        });
        console.log(resp);
      })
      .catch((err) => {
        if (err.resp && err.resp.status === 500) {
          console.error("A server error occurred", err);
          // Display a user-friendly message or handle accordingly
        }
      });
  }, []); //mtnfze4 el fetch 8er lma deh tet8yar

  return (
    <div className="p-5">
      <div className="table-header d-flex justify-content-between mb-3">
        <h2 style={{ color: "#193175", fontWeight: "bold" }}>Manage User</h2>
        <Link
          to={"/manage-user/add"}
          className="btn btn-success btn-text-center"
        >
          Add New User +
        </Link>
      </div>
      {users.success && (
        <div className="alert alert-success" role="alert">
          {users.success}
        </div>
      )}
      <Table striped bordered hover variant="light" className="p-3 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>

            <th>role</th>
            <th>Image</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.results.map((user) => (
            <tr key={user._id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td className="text-break" style={{ width: "270px" }}>
                {user.email}
              </td>

              <td style={{ width: "100px" }}>{user.role}</td>

              <td>
                <img className="table-img " src={user.profileImg} alt="" />
              </td>

              <td>
                <div>
                  <Link to={user._id} className="btn btn-light m-3 btn-lg">
                    Update
                  </Link>
                  <Button
                    variant="danger"
                    className="mx-3 btn-lg"
                    onClick={() => deleteUser(user._id)}
                    disabled={loadingStates.get(user._id)}
                  >
                    {loadingStates.get(user._id) ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
