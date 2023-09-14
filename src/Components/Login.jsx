import { useState } from "react";
import Button from "./Button";
import Modal from "react-modal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useUser } from "../context/Usercontext";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    height: "75vh",
  },
};
export default function Login() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { loggedUser, isAuthenticated, username } = useUser();
  const { errors } = formState;
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  async function login(values) {
    try {
      const res = await axios.post(
        "https://food-explorer-back-end-jz2q.onrender.com/user/login",
        values
      );
      if (res.data.message === "Success") {
        toast.success("Successfully Logged in");
        setIsOpen(false);
        loggedUser(res.data.data.username);
      }
    } catch (error) {
      toast.error("Invalid Data");
    }
  }
  function onSubmit(data) {
    login(data);
  }
  function handleCheckbox(e) {
    setShowPassword(e.target.checked);
  }
  if (isAuthenticated)
    return (
      <h1 className="text-2xl text-slate-100 font-semibold">
        Welcome, {username}👋
      </h1>
    );
  return (
    <div>
      <Button onClick={openModal} type="primary">
        Login
      </Button>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <div className="">
            <h1 className="font-semibold text-2xl inline-block">Login</h1>
            <span
              className="float-right text-4xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <form className="my-10" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="email"
                className="border border-stone-400 px-1.5 py-2 w-full my-4 rounded-md"
                name="email"
                placeholder="Email"
                {...register("email", {
                  required: "This field is required",
                })}
              ></input>
              {errors?.email?.message && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
              <input
                type={showPassword ? "text" : "password"}
                className="border border-stone-400 px-1.5 py-2 w-full my-4 rounded-md"
                name="password"
                placeholder="Password"
                {...register("password", {
                  required: "This field is required",
                })}
              ></input>
              <input type="checkbox" onChange={handleCheckbox}></input>
              <span className="font-semibold text-sm px-1">Show password</span>
              {errors?.password?.message && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
              <button className="rounded-full px-3 py-2 bg-yellow-500 my-4 w-full">
                Login
              </button>
            </form>
          </div>
      </Modal>
    </div>
  );
}
