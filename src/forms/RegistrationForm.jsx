/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts";
import FieldSet from "../components/FieldSet";
import Field from "../components/Field";

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
      const userCredential = await signUp(data.email, data.password);
      const user = userCredential.user;

      await updateUsername(user, data.username);

      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, {
        username: data.username,
        email: data.email,
      });

      if (res.status !== 201) {
        setErrorMessage("Failed to register user in the database.");
        return;
      }

      navigate("/");
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
    <div className="bg-gray-100 text-gray-300 rounded-lg shadow-lg p-10 w-96 mx-auto">
      <h2 className="text-center font-bold text-2xl mb-8 text-blue-900">
        REGISTER
      </h2>
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
              className={`w-full text-gray-300 bg-blue-900 border-b ${
                errors.username ? "border-red-500" : "border-gray-600"
              } py-2 px-3 mb-6 outline-none focus:border-yellow-400 transition-colors`}
            />
          </Field>
          <Field label="Email" error={errors.email}>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter your email"
              className={`w-full text-gray-300 bg-blue-900 border-b ${
                errors.email ? "border-red-500" : "border-gray-600"
              } py-2 px-3 mb-6 outline-none focus:border-yellow-400 transition-colors`}
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
              className={`w-full text-gray-300 bg-blue-900 border-b ${
                errors.password ? "border-red-500" : "border-gray-600"
              } py-2 px-3 mb-6 outline-none focus:border-yellow-400 transition-colors`}
            />
          </Field>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button className="w-full bg-blue-900 hover:bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded transition-colors duration-300 mt-8">
            SIGN UP
          </button>
        </FieldSet>
      </form>
      <p className="text-sm text-gray-400 mt-6">
        Already have an account?{" "}
        <a
          href="#"
          className="text-yellow-400 hover:text-gray-300"
          onClick={onToggle}
        >
          Sign in!
        </a>
      </p>
    </div>
  );
};

export default RegistrationForm;
