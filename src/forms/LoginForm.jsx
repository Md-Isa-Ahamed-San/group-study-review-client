/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Field from "../components/Field";
import FieldSet from "../components/FieldSet";
import "./form.css"; // For custom animation and layout styles
import { useContext } from "react";
import { AuthContext } from "../contexts";
import { useNavigate } from "react-router-dom";
const LoginForm = ({ onToggle }) => {
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // const user = {
    //   email: "abc@gmail.com",
    //   password: "123456789",
    // };
    // const found = data.email === user.email && data.password === user.password;
    // if (!found) {
    //   setError("root.random", {
    //     message: "User not found",
    //     type: "random",
    //   });
    // }
    console.log(data)
    const user = await login(data.email, data.password);
    console.log("🚀 ~ onSubmit ~ user:", user);
    if (user) {
      navigate("/");
    }
  };

  return (
    <div className="login-box bg-gradient-to-r from-[#242D39] via-[#10253C] to-[#000000] text-white rounded-lg shadow-lg p-10 w-96 mx-auto">
      <p className="text-center font-bold text-xl mb-8 bg-gradient-to-br from-gray-300 via-[#235081] to-[#3d5472] bg-clip-text text-transparent">
        LOGIN
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <Field label="Email" error={errors.email}>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              name="email"
              id="email"
              placeholder="E M A I L"
              className={`user-box w-full text-white bg-transparent border-b ${
                errors.email ? "border-red-500" : "border-white"
              } py-2 px-2 mb-6 outline-none focus:border-blue-900`}
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
              placeholder="P A S S W O R D"
              className={`user-box w-full text-white bg-transparent border-b ${
                errors.password ? "border-red-500" : "border-white"
              } py-2 px-2 mb-6 outline-none focus:border-blue-900`}
              required
            />
          </Field>
          <button className="animated-button mt-8">
            LOGIN
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </FieldSet>
      </form>
      <p className="text-sm text-gray-400 mt-6">
        Don&apos;t have an account?{" "}
        <a href="#" className="hover:text-gray-300" onClick={onToggle}>
          Sign up!
        </a>
      </p>
      <p className="py-4 text-red-500">{errors?.root?.random?.message}</p>
    </div>
  );
};

export default LoginForm;
