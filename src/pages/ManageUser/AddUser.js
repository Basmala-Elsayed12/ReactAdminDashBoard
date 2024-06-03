import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../index.css";
import { getAuthtoken } from "../../helper/Storage";
import axios from "axios";
import { useRef, useState } from "react";
export default function AddUser() {
  const auth = getAuthtoken();
  const [user, setUser] = useState({
    name: "",

    email: "",
    password: "",
    rePassword: "",
    role: "",
    err: "",
    loading: false,
    success: null,
  });

  const profileImg = useRef(null);

  const createUser = (e) => {
    e.preventDefault();

    setUser({ ...user, loading: true });

    const formData = new FormData(); //b5od instance mn class w 27ot fyh el data elly gyaly mn el broswer
    formData.append("name", user.name);

    formData.append("email", user.email);
    formData.append("role", user.role);
    formData.append("password", user.password);
    formData.append("rePassword", user.rePassword);

    if (profileImg.current.files) {
      formData.append("profileImg", profileImg.current.files[0]);
    }
    axios
      .post("https://kemet-gp2024.onrender.com/api/v1/users", formData, {
        headers: { token: auth.token },
      })
      .then(() => {
        setUser({
          ...user,
          name: "",
          email: "",
          password: "",
          rePassword: "",
          role: "",
          err: "",
          loading: false,
          success: "Added successfully",
        });
      })
      .catch(() => {
        setUser({
          ...user,
          loading: false,
          success: null,
          err: "Failed to add user. Please try again.",
        });
      });
  };
  return (
    <div className="forms-container">
      <h1 className="text-design">Add New User+</h1>
      {user.err && (
        <div className="alert alert-danger" role="alert">
          {user.err}
        </div>
      )}
      {user.success && (
        <div className="alert alert-success" role="alert">
          {user.success}
        </div>
      )}
      <Form onSubmit={createUser}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="RePassword"
            value={user.rePassword}
            onChange={(e) => setUser({ ...user, rePassword: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Date of Birth"
            value={user.DOB}
            onChange={(e) => setUser({ ...user, DOB: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="City"
            value={user.city}
            onChange={(e) => setUser({ ...user, city: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <input className="form-control" type="file" ref={profileImg}></input>
        </Form.Group>
        <Button
          style={{ backgroundColor: "#193175" }}
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={user.loading}
        >
          {user.loading ? "Adding..." : "Add New User+"}
        </Button>
      </Form>
    </div>
  );
}

// import React, { useRef, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import axios from "axios";
// import { getAuthtoken } from "../../helper/Storage";

// export default function AddUser() {
//   const auth = getAuthtoken();
//   const [user, setUser] = useState({
//     name: "",
//     description: "",
//     email: "",
//     password: "",
//     rePassword: "",
//     role: "",
//     err: "",
//     loading: false,
//     success: null,
//   });

//   const profileImg = useRef(null);

//   const createUser = (e) => {
//     e.preventDefault();
//     setUser((prevState) => ({
//       ...prevState,
//       loading: true,
//       err: "",
//       success: null,
//     }));

//     const formData = new FormData();
//     formData.append("name", user.name);
//     formData.append("description", user.description);
//     formData.append("email", user.email);
//     formData.append("role", user.role);
//     formData.append("password", user.password);
//     formData.append("rePassword", user.rePassword);

//     if (imgCover.current && imgCover.current.files[0]) {
//       formData.append("imgCover", imgCover.current.files[0]);
//     }

//     axios
//       .post("https://kemet-gp2024.onrender.com/api/v1/users", formData, {
//         headers: {
//           token: auth.token,
//         },
//       })
//       .then((response) => {
//         console.log(response);
//         setUser({
//           name: "",
//           description: "",
//           email: "",
//           password: "",
//           rePassword: "",
//           role: "",
//           err: "",
//           loading: false,
//           success: "User added successfully",
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         const errorMessage =
//           error.response && error.response.data && error.response.data.message
//             ? error.response.data.message
//             : "Failed to add user. Please try again.";
//         setUser((prevState) => ({
//           ...prevState,
//           loading: false,
//           success: null,
//           err: errorMessage,
//         }));
//       });
//   };

//   return (
//     <div className="add-form">
//       <h1 className="text-center">Add New User</h1>
//       {user.err && (
//         <div className="alert alert-danger" role="alert">
//           {user.err}
//         </div>
//       )}
//       {user.success && (
//         <div className="alert alert-success" role="alert">
//           {user.success}
//         </div>
//       )}
//       <Form onSubmit={createUser}>
//         <Form.Group className="mb-3">
//           <Form.Control
//             type="text"
//             placeholder="Name"
//             value={user.name}
//             onChange={(e) => setUser({ ...user, name: e.target.value })}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Control
//             type="text"
//             placeholder="Role"
//             value={user.role}
//             onChange={(e) => setUser({ ...user, role: e.target.value })}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Control
//             type="email"
//             placeholder="Email"
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Control
//             type="password"
//             placeholder="Password"
//             value={user.password}
//             onChange={(e) => setUser({ ...user, password: e.target.value })}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Control
//             type="password"
//             placeholder="Confirm Password"
//             value={user.rePassword}
//             onChange={(e) => setUser({ ...user, rePassword: e.target.value })}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <input className="form-control" type="file" ref={imgCover} />
//         </Form.Group>
//         <Button
//           className="btn btn-dark w-100"
//           variant="primary"
//           type="submit"
//           disabled={user.loading}
//         >
//           {user.loading ? "Adding..." : "Add New User+"}
//         </Button>
//       </Form>
//     </div>
//   );
// }
