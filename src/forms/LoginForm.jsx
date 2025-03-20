/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FieldSet from "../components/FieldSet";
import Field from "../components/Field";
import useAuth from "../hooks/useAuth";

const LoginForm = ({ onToggle }) => {
  const { login, setUserData, fetchUserDataMutation } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await login(data.email, data.password);
    console.log("🚀 ~ onSubmit ~ user:", res);

    if (res.user.email) {
      //here inside AuthProvider i am not return the useMutation thats why i
      //have to use fetchUserDataMutation like this
      try {
        const userData = await fetchUserDataMutation.mutateAsync(
          res.user.email
        );
        console.log(" onSubmit ~ userData:", userData)
        localStorage.setItem("userData", JSON.stringify(userData));
        setUserData(userData);
        navigate("/");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 text-gray-300 rounded-lg shadow-lg p-10 w-96 mx-auto">
      <h2 className="text-center font-bold text-2xl mb-8 text-blue-900">
        LOGIN
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <Field label="Email" error={errors.email}>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full text-white bg-blue-900 border-b ${
                errors.email ? "border-red-500" : "border-gray-600"
              } py-2 px-3 mb-6 outline-none focus:border-yellow-400 transition-colors`}
              required
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
              name="password"
              id="password"
              placeholder="Enter your password"
              className={`w-full text-white bg-blue-900 border-b ${
                errors.password ? "border-red-500" : "border-gray-600"
              } py-2 px-3 mb-6 outline-none focus:border-yellow-400 transition-colors`}
              required
            />
          </Field>
          <button className="w-full bg-blue-900 hover:bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded transition-colors duration-300 mt-8">
            LOGIN
          </button>
        </FieldSet>
      </form>
      <p className="text-sm text-gray-400 mt-6">
        Don't have an account?{" "}
        <a
          href="#"
          className="text-yellow-400 hover:text-gray-300"
          onClick={onToggle}
        >
          Sign up!
        </a>
      </p>
      <p className="py-4 text-red-500">{errors?.root?.random?.message}</p>
    </div>
  );
};

export default LoginForm;
