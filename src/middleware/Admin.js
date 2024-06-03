import React from "react";
import { getAuthtoken } from "../helper/Storage";
import { Outlet, Navigate } from "react-router-dom";

export default function Admin() {
  const auth = getAuthtoken();

  return (
    <>{auth && auth.role === "admin" ? <Outlet /> : <Navigate to={"/"} />}</>
  );
}
// deh 34an lw m4 3amel login my2dr4 yd5ol 3la 2y 7aga
