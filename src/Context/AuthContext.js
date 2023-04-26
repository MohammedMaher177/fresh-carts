import jwtDecode from "jwt-decode";
import { createContext, useState } from "react";

export let authContext = createContext();

export function AuthContextProvider(props) {
  const [userData, setuserData] = useState(null);
  function saveUserData() {
    if (localStorage.getItem("FreshCartToken")) {
      setuserData(jwtDecode(localStorage.getItem("FreshCartToken")));
    }
  }
  function logout() {
    localStorage.removeItem("FreshCartToken");
    setuserData(null);
  }
  return (
    <authContext.Provider value={{ userData, saveUserData, logout }}>
      {props.children}
    </authContext.Provider>
  );
}
