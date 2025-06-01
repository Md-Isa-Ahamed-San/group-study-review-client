/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import Field from "../components/Field";
import FieldSet from "../components/FieldSet";

const LoginForm = ({ onToggle }) => {
  const { login, setUserData, fetchUserData, authError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(""); // For login-specific errors

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors }, // Renamed to avoid conflict with authError
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setLocalError("");

    try {
      const loginResponse = await login(data.email, data.password);

      if (loginResponse && loginResponse.user) {
        navigate("/");
      } else {
        setLocalError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login onSubmit Error:", error);
      setLocalError(
        error.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 rounded-lg shadow-lg p-10 w-full  md:w-96 max-w-md mx-auto my-10">
      <h2 className="text-center font-bold text-3xl mb-8 text-blue-700">
        LOGIN
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <Field label="Email" error={formErrors.email}>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full text-gray-700 bg-white border ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-3 mb-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
            />
          </Field>
          <Field label="Password" error={formErrors.password}>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className={`w-full text-gray-700 bg-white border ${
                formErrors.password ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-3 mb-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
            />
          </Field>
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-2.5 px-4 rounded-md transition-colors duration-300 mt-6 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-gray-600"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </FieldSet>
      </form>
      {(localError || authError) && (
        <p className="py-4 text-red-500 text-center">
          {localError || authError}
        </p>
      )}
      <p className="text-sm text-gray-600 mt-6 text-center">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
          onClick={onToggle}
        >
          Sign up!
        </button>
      </p>
      {/* Example of displaying a specific form error if needed, though Field component handles individual field errors */}
      {/* {formErrors?.root?.random?.message && <p className="py-4 text-red-500">{formErrors.root.random.message}</p>} */}
    </div>
  );
};

export default LoginForm;
