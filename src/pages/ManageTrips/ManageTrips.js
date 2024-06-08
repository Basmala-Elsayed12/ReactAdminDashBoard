import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import "../../index.css";
import axios from "axios";
import { getAuthtoken } from "../../helper/Storage";
import Button from "react-bootstrap/Button";

export default function ManageTrips() {
  const auth = getAuthtoken();

  const [trip, settrip] = useState({
    loading: true,
    results: [],
    err: null,
    success: "",
  });
  const [loadingStates, setLoadingStates] = useState(new Map());

  useEffect(() => {
    settrip({ ...trip, loading: true });
    axios
      .get("https://kemet-gp2024.onrender.com/api/v1/trips", {
        headers: { token: auth.token },
      })
      .then((resp) => {
        settrip({
          ...trip,
          loading: false,
          results: resp.data.document,
          err: null,
        });
      })
      .catch((err) => {
        console.log(err);
        settrip({
          ...trip,
          loading: false,
          err: "something went wrong",
        });
      });
  }, []); //mtnfze4 el fetch 8er lma deh tet8yar

  const deleteTrip = (_id) => {
    setLoadingStates((prev) => new Map(prev).set(_id, true));
    axios
      .delete(`https://kemet-gp2024.onrender.com/api/v1/trips/${_id}`, {
        headers: { token: auth.token },
      })
      .then(() => {
        settrip((prevState) => ({
          ...prevState,
          results: prevState.results.filter((item) => item._id !== _id),
          success: "trip deleted successfuly",
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
        <h2 style={{ color: "#193175", fontWeight: "bold" }}> ManageTrips</h2>
        <Link
          to={"/manage-trips/add"}
          className="btn btn-success btn-text-center"
        >
          Add New Trip +
        </Link>
      </div>
      {trip.err && (
        <div className="alert alert-danger" role="alert">
          {trip.err}
        </div>
      )}
      {trip.success && (
        <div className="alert alert-success" role="alert">
          {trip.success}
        </div>
      )}
      <Table
        striped
        bordered
        hover
        variant="light"
        className="p-3 text-center "
      >
        <thead>
          <tr>
            <th>trip-id</th>
            <th>Image</th>
            <th>title</th>
            <th>quantity</th>
            <th>price</th>
            <th>govern-id</th>
            <th>tourism-places-id</th>
            <th>images</th>

            <th>describtion</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trip.results.map((trip) => (
            <tr>
              <td className="text-break " style={{ width: "90px" }}>
                {trip._id}
              </td>

              <td>
                <img className="table-img" src={trip.imgCover} alt="" />
              </td>

              <td style={{ width: "90px" }}>{trip.title} </td>
              <td>{trip.quantity}</td>

              <td>{trip.price}</td>
              <td className="text-break " style={{ width: "110px" }}>
                {trip.governrate}
              </td>
              <td className="text-break " style={{ width: "100px" }}>
                {trip.tourismPlace}
              </td>
              <td>
                <div style={{ width: "200px" }} className="my-3 mx-3 ">
                  <div className="row  ">
                    {trip.images.map((image) => (
                      <div className="col-md-6 mb-3  ">
                        <img className="table-img  " src={image} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              </td>
              <td className="text-break " style={{ width: "250px" }}>
                {trip.description}
              </td>

              <td>
                <div>
                  <Link to={trip._id} className="btn btn-light m-3 btn-lg">
                    Update
                  </Link>
                  <Button
                    variant="danger"
                    className="mx-3 btn-lg"
                    onClick={() => deleteTrip(trip._id)}
                    disabled={loadingStates.get(trip._id)}
                  >
                    {loadingStates.get(trip._id) ? "Deleting..." : "Delete"}
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
