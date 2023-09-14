import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SignupButton from "../Components/SignupButton";
import Login from "../Components/Login";
import { useUser } from "../context/Usercontext";
import Logout from "../Components/Logout"
export default function AppLayout() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="sm:h-24 bg-red-500 sm:flex sm:justify-between">
        <div
          className="text-slate-100 font-black tracking-wide text-4xl italic p-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Food Explorer
        </div>
        {isAuthenticated ? (
          <Logout />
        ) : (
          <div className="space-x-4 p-4 flex">
            <Login />
            <SignupButton />
          </div>
        )}
      </div>
      {<Outlet />}
    </React.Fragment>
  );
}
