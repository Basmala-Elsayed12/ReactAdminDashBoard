export const setAuthtoken = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
};

export const getAuthtoken = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role) {
    return { token, role };
  }

  return null; // Return null if either token or role is not found
};

// export const getAuthtoken = () => {
//   const token = localStorage.getItem("token");
//   return token ? JSON.parse(token) : null;
// };
export const removetoken = () => {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }
};
