// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import axios from "axios";
// import "../../index.css";
// import { setAuthtoken } from "../../helper/Storage";
// import { useNavigate } from "react-router-dom";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import img1 from "../../images/pharoh.jpeg";
// export default function Login() {
//   const navigate = useNavigate();
//   const [login, setLogin] = useState({
//     email: "",
//     password: "",
//     loading: false,
//     err: [],
//   });

//   const loginFun = (e) => {
//     e.preventDefault();
//     setLogin({ ...login, loading: true, err: [] });
//     axios
//       .post("https://kemet-gp2024.onrender.com/api/v1/auth/signin", {
//         email: login.email,
//         password: login.password,
//       })
//       .then((resp) => {
//         if (resp.data.role !== "admin") {
//           // Handle non-admin users
//           setLogin({ ...login, loading: false, err: ["User not authorized"] });
//         } else {
//           // User is admin
//           setAuthtoken(resp.data); // Assuming this saves the token appropriately
//           navigate("/manage-user");
//         }
//       })
//       .catch((err) => {
//         const errors =
//           err.response && err.response.data && err.response.data.errors
//             ? err.response.data.errors
//             : ["Something went wrong"];
//         setLogin({ ...login, loading: false, err: errors });
//       });
//   };

//   return (
//     <div className="login-container">
//       <div>
//         <h1
//           className="text-center "
//           style={{ color: "#193175", fontWeight: "bold" }}
//         >
//           WELCOME TO KEMET
//         </h1>
//         <img src="img1" alt="" />
//       </div>

//       {login.err.length > 0 &&
//         login.err.map((error, index) => (
//           <div key={index} className="alert alert-danger" role="alert">
//             {error}
//           </div>
//         ))}
//       <Form onSubmit={loginFun}>
//         <Form.Group className="mb-4">
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             required
//             value={login.email}
//             onChange={(e) => setLogin({ ...login, email: e.target.value })}
//           />
//         </Form.Group>

//         <Form.Group className="mb-4">
//           <Form.Control
//             type="password"
//             placeholder="Password"
//             required
//             value={login.password}
//             onChange={(e) => setLogin({ ...login, password: e.target.value })}
//           />
//         </Form.Group>

//         <Button
//           style={{ backgroundColor: "#193175" }}
//           className="btn btn w-100"
//           variant="primary"
//           type="submit"
//         >
//           Submit
//         </Button>
//       </Form>
//     </div>
//   );
// }

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../../index.css";
import { setAuthtoken } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import img1 from "../../images/pharoh.jpeg"; // Correctly import the image

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  const loginFun = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
    axios
      .post("https://kemet-gp2024.onrender.com/api/v1/auth/signin", {
        email: login.email,
        password: login.password,
      })
      .then((resp) => {
        if (resp.data.role !== "admin") {
          // Handle non-admin users
          setLogin({ ...login, loading: false, err: ["User not authorized"] });
        } else {
          // User is admin
          setAuthtoken(resp.data); // Assuming this saves the token appropriately
          navigate("/manage-user");
        }
      })
      .catch((err) => {
        const errors =
          err.response && err.response.data && err.response.data.errors
            ? err.response.data.errors
            : ["Something went wrong"];
        setLogin({ ...login, loading: false, err: errors });
      });
  };

  return (
    <div className="login-container">
      <div>
        <h1
          className="text-center"
          style={{ color: "#193175", fontWeight: "bold" }}
        >
          WELCOME TO KEMET
          <img
            src={img1}
            alt="Pharaoh"
            style={{ width: "90px", marginRight: "50px" }}
          />
        </h1>
      </div>

      {login.err.length > 0 &&
        login.err.map((error, index) => (
          <div key={index} className="alert alert-danger" role="alert">
            {error}
          </div>
        ))}
      <Form onSubmit={loginFun}>
        <Form.Group className="mb-4">
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
        </Form.Group>

        <Button className="btn  w-100" variant="primary" type="submit">
          {login.loading ? "Loading..." : "Submit"} {/* Loading state */}
        </Button>
      </Form>
    </div>
  );
}
