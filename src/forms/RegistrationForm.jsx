/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../components/Field";
import FieldSet from "../components/FieldSet";
import { AuthContext } from "../contexts";
import "./form.css";

const RegistrationForm = ({ onToggle }) => {
  const { signUp, updateUsername } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Sign up user with Firebase
      const userCredential = await signUp(data.email, data.password);
      const user = userCredential.user;

      // Update Firebase profile with username
      await updateUsername(user, data.username);

      // Add user entry to MongoDB
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, {
        username: data.username,
        email: data.email,
      });
      console.log(res);

      if (res.status !== 201) {
        setErrorMessage("Failed to register user in the database.");
        return;
      }

      // Successful registration
      navigate("/"); // Toggle to login or dashboard
    } catch (err) {
      console.error("Error during registration:", err);
      if (err.response?.data?.message) {
        setErrorMessage(`Database error: ${err.response.data.message}`);
      } else {
        setErrorMessage(err.message || "An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="login-box bg-gradient-to-r from-[#242D39] via-[#10253C] to-[#000000] text-white rounded-lg shadow-lg p-10 w-96 mx-auto">
      <p className="text-center font-bold text-xl mb-8 bg-gradient-to-br from-gray-300 via-[#235081] to-[#3d5472] bg-clip-text text-transparent">
        REGISTER
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <Field label="Username" error={errors.username}>
            <input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 6,
                  message: "Username must be at least 6 characters",
                },
              })}
              type="text"
              placeholder="U S E R N A M E"
              className={`user-box w-full text-white bg-transparent border-b ${
                errors.username ? "border-red-500" : "border-white"
              } py-2 px-2 mb-6 outline-none focus:border-blue-900`}
            />
          </Field>
          <Field label="Email" error={errors.email}>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="E M A I L"
              className={`user-box w-full text-white bg-transparent border-b ${
                errors.email ? "border-red-500" : "border-white"
              } py-2 px-2 mb-6 outline-none focus:border-blue-900`}
            />
          </Field>
          <Field label="Password" error={errors.password}>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              type="password"
              placeholder="P A S S W O R D"
              className={`user-box w-full text-white bg-transparent border-b ${
                errors.password ? "border-red-500" : "border-white"
              } py-2 px-2 mb-6 outline-none focus:border-blue-900`}
            />
          </Field>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button className="animated-button mt-8">
            REGISTER
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </FieldSet>
      </form>
      <p className="text-sm text-gray-400 mt-6">
        Already have an account?{" "}
        <a href="#" className="hover:text-gray-300" onClick={onToggle}>
          Sign in!
        </a>
      </p>
    </div>
  );
};

export default RegistrationForm;
