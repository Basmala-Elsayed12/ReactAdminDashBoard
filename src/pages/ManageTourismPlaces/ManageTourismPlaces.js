import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import "../../index.css";
import axios from "axios";
import { getAuthtoken } from "../../helper/Storage";

import Button from "react-bootstrap/Button";

export default function ManageTourismPlaces() {
  const auth = getAuthtoken();

  const [tourismPlaces, setTourismPlaces] = useState({
    loading: true,
    results: [],
    err: "",
    reload: 0,
  });
  const [loadingStates, setLoadingStates] = useState(new Map());

  useEffect(() => {
    setTourismPlaces({ ...tourismPlaces, loading: true });
    axios
      .get("https://kemet-gp2024.onrender.com/api/v1/tourismPlaces", {
        headers: { token: auth.token }, // Add Authorization header for GET request
      })
      .then((resp) => {
        console.log(resp);
        setTourismPlaces({
          ...tourismPlaces,
          loading: false,
          results: resp.data.document,
          err: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setTourismPlaces({
          ...tourismPlaces,
          loading: false,
          err: "something went wrong",
        });
      });
  }, []); //mtnfze4 el fetch 8er lma deh tet8yar

  const deletePlace = (_id) => {
    setLoadingStates((prev) => new Map(prev).set(_id, true));
    axios
      .delete(`https://kemet-gp2024.onrender.com/api/v1/tourismPlaces/${_id}`, {
        headers: { token: auth.token },
      })
      .then(() => {
        setTourismPlaces((prevState) => ({
          ...prevState,
          results: prevState.results.filter((item) => item._id !== _id),
          success: "TourismPlaces deleted successfuly",
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
          ManageTourismPlaces
        </h2>
        <Link
          to={"/manage-tourism-places/add"}
          className="btn btn-success btn-text-center"
        >
          Add New govern+
        </Link>
      </div>
      {tourismPlaces.success && (
        <div className="alert alert-success" role="alert">
          {tourismPlaces.success}
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
            <th>Name</th>
            <th>ImgCover</th>
            <th>Images</th>

            <th>governrateName</th>
            <th>informationAbout </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tourismPlaces.results.map((tourismPlace) => (
            <tr key={tourismPlace._id}>
              <td>{tourismPlace.name}</td>

              <td>
                <img className="table-img" src={tourismPlace.imgCover} alt="" />
              </td>

              <td>
                <div style={{ width: "200px" }} className="my-3 mx-3 ">
                  <div className="row  ">
                    {tourismPlace.images.map((image) => (
                      <div className="col-md-6 mb-3  ">
                        <img className="table-img  " src={image} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              </td>
              <td>
                {tourismPlace.governrate ? tourismPlace.governrate.name : "N/A"}
              </td>
              <td className="text-break">{tourismPlace.informationAbout}</td>

              <td>
                <div>
                  <Link
                    to={tourismPlace._id}
                    className="btn btn-light m-3 btn-lg"
                  >
                    Update
                  </Link>
                  <Button
                    variant="danger"
                    className="mx-3 btn-lg"
                    onClick={() => deletePlace(tourismPlace._id)}
                    disabled={loadingStates.get(tourismPlace._id)}
                  >
                    {loadingStates.get(tourismPlace._id)
                      ? "Deleting..."
                      : "Delete"}
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
