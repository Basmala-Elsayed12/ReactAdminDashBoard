import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../../index.css";
import axios from "axios";
import { getAuthtoken } from "../../helper/Storage";

export default function ManageReviews() {
  const auth = getAuthtoken();
  const [review, setReview] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setReview({ ...review, loading: true });
    axios
      .get("https://kemet-gp2024.onrender.com/api/v1/reviews")
      .then((resp) => {
        setReview({
          ...review,
          loading: false,
          results: resp.data.reviews,
          err: null,
        });
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
        setReview({ ...review, loading: false, err: "something went wrong" });
      });
  }, [review.reload]);

  const deleteReview = (_id) => {
    axios
      .delete(`https://kemet-gp2024.onrender.com/api/v1/reviews/${_id}`, {
        headers: { token: auth.token },
      })
      .then((resp) => {
        setReview({ ...review, reload: review.reload + 1 });
        console.log(resp.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(review.results);
  return (
    <div className="p-5">
      <div className="table-header d-flex justify-content-between mb-3">
        <h2 style={{ color: "#193175", fontWeight: "bold" }}>
          {" "}
          Manage Reviews
        </h2>
      </div>
      <Table striped bordered hover variant="light" className="p-3 text-center">
        <thead>
          <tr>
            <th>review-id</th>
            <th>text</th>
            <th>rate</th>
            <th>trip-id</th>
            <th>userName</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {review.results.map((reviews) => (
            <tr key={reviews._id}>
              <td>{reviews._id}</td>
              <td>{reviews.text}</td>
              <td>{reviews.rate}</td>
              <td>{reviews.trip}</td>
              <td>
                {/* Check if reviews.user exists */}
                {reviews.user
                  ? `${reviews.user.firstName} ${reviews.user.lastName}`
                  : "Anonymous"}
              </td>
              <td>
                <div>
                  <button
                    className="btn btn-danger mx-3 btn-lg"
                    onClick={() => {
                      deleteReview(reviews._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
