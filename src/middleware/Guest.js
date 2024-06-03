import React from "react";
import { getAuthtoken, removetoken } from "../helper/Storage";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

export default function Guest() {
  const auth = getAuthtoken();
  //   const navigate = useNavigate();

  // dah 34qan el user elly m4 3amel login myro74 fy el url yktb esm elsaf7a tetl3lo
  return <>{!auth ? <Outlet /> : <Navigate to={"/manage-user"} />}</>;
}
