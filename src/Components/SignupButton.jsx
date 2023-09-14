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
    width: '80vw',
    height: '75vh'
  },
};
export default function SignupButton() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showPassword,setShowPassword] = useState(false)
  const [username,setUsername] = useState("")
  const { register, handleSubmit, getValues, formState } = useForm();
  const { createdUser,signup } = useUser();
  const { errors } = formState;
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  async function sendData(values) {
    try {
      const res = await axios.post("https://food-explorer-back-end-jz2q.onrender.com/user/signup", values);
      if (res.data.status === "Success") {
        toast.success("Successfully registered Now Login your account!!");
        setIsOpen(false);
        createdUser()
      } else if (res.response.data.data.code === 11000)
        throw new Error("This email is already registered");
    } catch (error) {
      toast.error("This email is already registered");
    }
  }
  function onSubmit(data) {
    setUsername(data.username)
    sendData(data);
  }
  function handleCheckbox(e){
    setShowPassword(e.target.checked)
  }

  if(!signup) return null
  return (
    <div>
      <Button onClick={openModal} type="primary">Create an account</Button>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <h1 className="font-semibold text-2xl inline-block">Signup</h1>
          <span
            className="float-right text-4xl cursor-pointer"
            onClick={closeModal}
          >
            &times;
          </span>
          <form className="my-10" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="border border-stone-400 px-1.5 py-2 w-full my-4 rounded-md"
              name="username"
              placeholder="Full Name"
              {...register("username", {
                required: "This field is required",
                minLength: {
                  value: 3,
                  message: "Name should be atleast 3 characters",
                },
              })}
            ></input>
            {errors?.username?.message && (
              <p className="text-sm text-red-600">{errors.username.message}</p>
            )}
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
                minLength: {
                  value: 8,
                  message: "The password must be atleast 8 characters",
                },
              })}
            ></input>
            <input type="checkbox" onChange={handleCheckbox}></input>
            <span className="font-semibold text-sm px-1">Show password</span>
            {errors?.password?.message && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
            <input
              type='password'
              className="border border-stone-400 px-1.5 py-2 w-full my-4 rounded-md"
              name="confirmpassword"
              placeholder="Confirm Password"
              {...register("confirmpassword", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password ||
                  "Confirm password must be same as password",
              })}
            ></input>
            {errors?.confirmpassword?.message && (
              <p className="text-sm text-red-600">
                {errors.confirmpassword.message}
              </p>
            )}
            <button className="rounded-full px-3 py-2 bg-yellow-500 my-4 w-full">
              Create account
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
