/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../components/Field";
import FieldSet from "../components/FieldSet";
import useAuth from "../hooks/useAuth";

const RegistrationForm = ({ onToggle }) => {
  const { signUp, updateUsername,fetchUserDataMutation,setUserData } = useAuth()
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userCredential = await signUp(data.email, data.password);
      const user = userCredential.user;

      await updateUsername(user, data.username);

      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, {
        username: data.username,
        email: data.email,
      });
      console.log("res after reg: ",res)
      if(res.data.email){
        const userData = await fetchUserDataMutation.mutateAsync(
          res.data.email
        );
        localStorage.setItem("userData", JSON.stringify(userData));
        setUserData(userData);
        navigate("/");

      }

      if (res.status !== 201) {
        setErrorMessage("Failed to register user in the database.");
        return;
      }

     
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
   <div className="bg-gray-100 text-gray-800 rounded-lg shadow-lg p-10 w-full md:w-96 max-w-md mx-auto my-10">
      <h2 className="text-center font-bold text-3xl mb-8 text-blue-700">REGISTER</h2>
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
              placeholder="Enter your username"
              className={`w-full text-gray-700 bg-white border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-3 mb-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter your email"
              className={`w-full text-gray-700 bg-white border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-3 mb-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
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
              placeholder="Enter your password"
              className={`w-full text-gray-700 bg-white border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-3 mb-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
            />
          </Field>

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full font-semibold py-2.5 px-4 rounded-md transition-colors duration-300 mt-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            SIGN UP
          </button>
        </FieldSet>
      </form>

      <p className="text-sm text-gray-600 mt-6 text-center">
        Already have an account?{" "}
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
          onClick={onToggle}
        >
          Sign in!
        </button>
      </p>
    </div>
 
  );
};

export default RegistrationForm;
