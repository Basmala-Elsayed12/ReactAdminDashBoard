import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { getAuthtoken } from "../../helper/Storage";

export default function ManageGovernorate() {
  const auth = getAuthtoken();

  const [govern, setGovern] = useState({
    loading: true,
    results: [],
    err: "",
    success: "",
  });
  const [loadingStates, setLoadingStates] = useState(new Map());

  useEffect(() => {
    axios
      .get("https://kemet-gp2024.onrender.com/api/v1/governrates", {
        headers: { token: auth.token },
      })
      .then((resp) => {
        setGovern({
          loading: false,
          results: resp.data.document,
          err: "",
          success: "",
        });
      })
      .catch((err) => {
        setGovern((prevState) => ({
          ...prevState,
          loading: false,
          err: "can not delete , try again",
        }));
      });
  }, []);

  const deleteGovern = (_id) => {
    setLoadingStates((prev) => new Map(prev).set(_id, true));
    axios
      .delete(`https://kemet-gp2024.onrender.com/api/v1/governrates/${_id}`, {
        headers: { token: auth.token },
      })
      .then(() => {
        setGovern((prevState) => ({
          ...prevState,
          results: prevState.results.filter((item) => item._id !== _id),
          success: "governorate deleted successfuly",
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

  return (
    <div className="p-5">
      <div className="table-header d-flex justify-content-between mb-3">
        <h2 style={{ color: "#193175", fontWeight: "bold" }}>
          ManageGovernorates
        </h2>
        <Link to={"/manage-govern/add"} className="btn btn-success">
          Add New Governorate +
        </Link>
      </div>
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
      <Table striped bordered hover variant="light" className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {govern.results.map((govern) => (
            <tr key={govern._id}>
              <td>{govern._id}</td>
              <td>
                <img
                  className="table-img"
                  src={govern.image}
                  alt={govern.name}
                />
              </td>
              <td>{govern.name}</td>
              <td>
                <Link to={govern._id} className="btn btn-light mx-3 btn-lg">
                  Update
                </Link>
                <Button
                  variant="danger"
                  className="mx-3 btn-lg"
                  onClick={() => deleteGovern(govern._id)}
                  disabled={loadingStates.get(govern._id)}
                >
                  {loadingStates.get(govern._id) ? "Deleting..." : "Delete"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
