import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../../index.css";
import axios from "axios";
import { getAuthtoken } from "../../helper/Storage";

export default function ManageOrders() {
  const auth = getAuthtoken();
  const [order, setOrder] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setOrder({ ...order, loading: true });
    axios
      .get("https://kemet-gp2024.onrender.com/api/v1/order/getAllOrders", {
        headers: { token: auth.token },
      })
      .then((resp) => {
        setOrder({
          ...order,
          loading: false,
          results: resp.data.orders,
          err: null,
        });
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
        setOrder({ ...order, loading: false, err: "something went wrong" });
      });
  }, [order.reload]);

  const deleteOrder = (_id) => {
    axios
      .delete(
        `https://kemet-gp2024.onrender.com/api/v1/order/deleteOrder/${_id}`,
        {
          headers: { token: auth.token },
        }
      )
      .then((resp) => {
        setOrder({ ...order, reload: order.reload + 1 });
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
        setOrder({ ...order, err: "Failed to delete the order" });
      });
  };

  return (
    <div className="p-5">
      <div className="table-header d-flex justify-content-between mb-3">
        <h2 style={{ color: "#193175", fontWeight: "bold" }}>Manage Orders</h2>
      </div>
      {order.err && (
        <div className="alert alert-danger" role="alert">
          {order.err}
        </div>
      )}
      <Table striped bordered hover variant="light" className="p-3 text-center">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Trip Name</th>
            <th>Street</th>
            <th>City</th>
            <th>Phone</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Payment Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {order.results.map((orders) => (
            <React.Fragment key={orders._id}>
              {orders.orderItems.map((item, index) => (
                <tr key={item._id}>
                  {index === 0 && (
                    <React.Fragment>
                      <td rowSpan={orders.orderItems.length}>{orders._id}</td>
                      <td rowSpan={orders.orderItems.length}>
                        {orders.user || "N/A"}
                      </td>
                    </React.Fragment>
                  )}
                  <td>{item.trip?.title || "N/A"}</td>
                  {index === 0 && (
                    <React.Fragment>
                      <td rowSpan={orders.orderItems.length}>
                        {orders.shippingAddress?.street || "N/A"}
                      </td>
                      <td rowSpan={orders.orderItems.length}>
                        {orders.shippingAddress?.city || "N/A"}
                      </td>
                      <td rowSpan={orders.orderItems.length}>
                        {orders.shippingAddress?.phone || "N/A"}
                      </td>
                    </React.Fragment>
                  )}
                  <td>{item.quantity || "N/A"}</td>
                  <td>{item.price || "N/A"}</td>
                  {index === 0 && (
                    <React.Fragment>
                      <td rowSpan={orders.orderItems.length}>
                        {orders.totalOrderPrice || "N/A"}
                      </td>
                      <td rowSpan={orders.orderItems.length}>
                        {orders.paymentType || "N/A"}
                      </td>
                      <td rowSpan={orders.orderItems.length}>
                        <button
                          className="btn btn-danger mx-3 btn-lg"
                          onClick={() => {
                            deleteOrder(orders._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </React.Fragment>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
