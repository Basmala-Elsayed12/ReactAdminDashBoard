import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed
import "../../index.css";
import axios from "axios";
import { getAuthtoken } from "../../helper/Storage"; // Ensure this function correctly retrieves the token
import Button from "react-bootstrap/Button";

export default function ManageLegend() {
  const auth = getAuthtoken(); // Retrieve the auth token

  const [legends, setLegend] = useState({
    loading: true,
    results: [],
    err: "",
    success: "",
  });
  const [loadingStates, setLoadingStates] = useState(new Map());

  useEffect(() => {
    setLegend({ ...legends, loading: true });
    axios
      .get("https://kemet-gp2024.onrender.com/api/v1/legends", {
        headers: { token: auth.token }, // Add Authorization header for GET request
      })
      .then((resp) => {
        setLegend({
          ...legends,
          loading: false,
          results: resp.data.document,
          err: null,
        });
      })
      .catch((err) => {
        console.log(err);
        setLegend({ ...legends, loading: false, err: "something went wrong" });
      });
  }, []); // Empty dependency array to fetch data only once on component mount

  const deleteLegend = (_id) => {
    setLoadingStates((prev) => new Map(prev).set(_id, true));
    axios
      .delete(`https://kemet-gp2024.onrender.com/api/v1/legends/${_id}`, {
        headers: { token: auth.token }, // Add Authorization header for DELETE request
      })
      .then(() => {
        setLegend((prevState) => ({
          ...prevState,
          results: prevState.results.filter((item) => item._id !== _id),
          success: "legend deleted successfully",
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
        <h2 style={{ color: "#193175", fontWeight: "bold" }}> ManageLegend</h2>
        <Link
          to="/manage-legend/add"
          className="btn btn-success btn-text-center"
        >
          Add New Legend+
        </Link>
      </div>
      {legends.err && (
        <div className="alert alert-danger" role="alert">
          {legends.err}
        </div>
      )}
      {legends.success && (
        <div className="alert alert-success" role="alert">
          {legends.success}
        </div>
      )}
      <Table
        striped
        bordered
        hover
        variant="light"
        className="table-style table-bordered p-3 text-center "
      >
        <thead>
          <tr>
            <th>legend-id</th>
            <th>imgCover</th>
            <th>Name</th>
            <th>describtion</th>
            <th>images</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {legends.results.map((legend) => (
            <tr key={legend._id}>
              <td
                className="text-break"
                style={{ width: "100px", height: "100px" }}
              >
                {legend._id}
              </td>
              <td>
                <img
                  className="table-img my-3 mx-3"
                  src={legend.imgCover}
                  alt=""
                />
              </td>
              <td style={{ width: "100px", height: "100px" }}>{legend.name}</td>
              <td
                style={{ width: "500px", height: "100px" }}
                className="text-break"
              >
                {legend.informationAbout}
              </td>
              <td>
                <div style={{ width: "220px" }} className="my-2 mx-2">
                  <div className="row">
                    {legend.images.map((image, index) => (
                      <div className="col-md-6 mb-3" key={index}>
                        <img className="table-img" src={image} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <Link to={legend._id} className="btn btn-light m-3 btn-lg">
                    Update
                  </Link>
                  <Button
                    variant="danger"
                    className="mx-3 btn-lg"
                    onClick={() => deleteLegend(legend._id)}
                    disabled={loadingStates.get(legend._id)}
                  >
                    {loadingStates.get(legend._id) ? "Deleting..." : "Delete"}
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
