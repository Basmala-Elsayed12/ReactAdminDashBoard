import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getAuthtoken } from "../../helper/Storage";
import axios from "axios";

export default function AddLegend() {
  const auth = getAuthtoken();
  const [Legend, setLegend] = useState({
    name: "",
    informationAbout: "",
    err: "",
    loading: false,
    success: null,
  });

  const imgCover = useRef(null);
  const images = useRef(null);

  const createLegend = (e) => {
    e.preventDefault();

    setLegend({ ...Legend, loading: true });

    const formData = new FormData();
    formData.append("name", Legend.name);
    formData.append("informationAbout", Legend.informationAbout);

    if (imgCover.current.files && imgCover.current.files[0]) {
      formData.append("imgCover", imgCover.current.files[0]);
    }

    if (images.current.files) {
      for (let i = 0; i < images.current.files.length; i++) {
        formData.append("images", images.current.files[i]);
      }
    }

    axios
      .post("https://kemet-gp2024.onrender.com/api/v1/legends", formData, {
        headers: { token: auth.token },
      })
      .then(() => {
        setLegend({
          ...Legend,
          name: "",
          informationAbout: "",
          err: "",
          loading: false,
          success: "Added successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        setLegend({
          ...Legend,
          loading: false,
          success: null,
          err: "something went wrong",
        });
      });
  };

  return (
    <div className="forms-container">
      <h1 className="text-design">Add New Legend+</h1>
      {Legend.err && (
        <div className="alert alert-danger" role="alert">
          {Legend.err}
        </div>
      )}
      {Legend.success && (
        <div className="alert alert-success" role="alert">
          {Legend.success}
        </div>
      )}
      <Form onSubmit={createLegend}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            value={Legend.name}
            onChange={(e) => setLegend({ ...Legend, name: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Information About"
            rows={5}
            value={Legend.informationAbout}
            onChange={(e) =>
              setLegend({ ...Legend, informationAbout: e.target.value })
            }
            required
          ></textarea>
        </Form.Group>

        <Form.Group className="mb-3">
          <input className="form-control" type="file" ref={imgCover} />
        </Form.Group>

        <Form.Group className="mb-3">
          <input className="form-control" type="file" multiple ref={images} />
        </Form.Group>

        <Button
          style={{ backgroundColor: "#193175" }}
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
        >
          Add New Legend +
        </Button>
      </Form>
    </div>
  );
}
