import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import "../../index.css";
import axios from "axios";
import { getAuthtoken } from "../../helper/Storage";
import Button from "react-bootstrap/Button";

export default function ManageOffers() {
  const auth = getAuthtoken();

  const [offer, setoffer] = useState({
    loading: true,
    results: [],
    err: null,
    success: "",
  });
  const [loadingStates, setLoadingStates] = useState(new Map());

  useEffect(() => {
    setoffer({ ...offer, loading: true });
    axios
      .get("https://kemet-gp2024.onrender.com/api/v1/offers", {
        headers: { token: auth.token },
      })
      .then((resp) => {
        console.log(resp);
        setoffer({
          ...offer,
          loading: false,
          results: resp.data.offers,
          err: null,
        });
      })
      .catch((err) => {
        console.log(err);
        setoffer({
          ...offer,
          loading: false,
          err: "something went wrong",
        });
      });
  }, []); //mtnfze4 el fetch 8er lma deh tet8yar
  const deleteOffer = (_id) => {
    setLoadingStates((prev) => new Map(prev).set(_id, true));
    axios
      .delete(`https://kemet-gp2024.onrender.com/api/v1/offers/${_id}`, {
        headers: { token: auth.token },
      })
      .then(() => {
        setoffer((prevState) => ({
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
        <h2 style={{ color: "#193175", fontWeight: "bold" }}>ManageOffers</h2>
        <Link
          to={"/manage-offers/add"}
          className="btn btn-success btn-text-center"
        >
          Add New Offer +
        </Link>
      </div>
      {offer.success && (
        <div className="alert alert-success" role="alert">
          {offer.success}
        </div>
      )}
      <Table
        striped
        bordered
        hover
        variant="light"
        className="p-3 text-center  "
      >
        <thead>
          <tr>
            <th>title</th>
            <th>describtion</th>
            <th>offer-id</th>
            <th>price</th>
            <th className="text-break " style={{ width: "110px" }}>
              priceAfterDiscount
            </th>
            <th>quantity</th>
            <th>sold</th>
            <th>imgCover</th>

            <th>images</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {offer.results.map((offer) => (
            <tr>
              <td style={{ width: "100px" }}>{offer.title} </td>
              <td className="text-break " style={{ width: "300px" }}>
                {offer.description}
              </td>
              <td className="text-break " style={{ width: "100px" }}>
                {offer._id}
              </td>
              <td className="text-break " style={{ width: "100px" }}>
                {offer.price}
              </td>
              <td className="text-break ">{offer.priceAfterDiscount}</td>
              <td className="text-break " style={{ width: "100px" }}>
                {offer.quantity}
              </td>
              <td className="text-break " style={{ width: "100px" }}>
                {offer.sold}
              </td>
              <td>
                <img
                  className="table-img my-3 mx-3"
                  src={offer.imgCover}
                  alt=""
                />
              </td>
              <td>
                <div style={{ width: "250px" }} className="my-3 mx-3 ">
                  <div className="row  ">
                    {offer.images.map((image) => (
                      <div className="col-md-6 mb-3  ">
                        <img className="table-img  " src={image} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              </td>

              <td>
                <div>
                  <Link to={offer._id} className="btn btn-light m-3 btn-lg">
                    Update
                  </Link>
                  <Button
                    variant="danger"
                    className="mx-3 btn-lg"
                    onClick={() => deleteOffer(offer._id)}
                    disabled={loadingStates.get(offer._id)}
                  >
                    {loadingStates.get(offer._id) ? "Deleting..." : "Delete"}
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
