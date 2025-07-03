import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";
import Button from "../common/Button";
import clsx from "clsx";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = "Email or username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await login(formData.emailOrUsername.trim(), formData.password);
      navigate("/");
    } catch (err) {
      setSubmitError(err.message || "Login failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Log In</h2>

      {submitError && (
        <div className="mb-4 text-red-600 text-sm text-center">{submitError}</div>
      )}

      <div className="mb-4">
        <label htmlFor="emailOrUsername" className="block text-gray-700 font-medium mb-1">
          Email or Username
        </label>
        <input
          type="text"
          id="emailOrUsername"
          name="emailOrUsername"
          value={formData.emailOrUsername}
          onChange={handleChange}
          className={clsx(
            "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400",
            errors.emailOrUsername ? "border-red-500" : "border-gray-300"
          )}
        />
        {errors.emailOrUsername && (
          <p className="mt-1 text-red-500 text-sm">{errors.emailOrUsername}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={clsx(
            "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400",
            errors.password ? "border-red-500" : "border-gray-300"
          )}
        />
        {errors.password && (
          <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <div className="flex justify-between items-center mb-6">
        <Link to="/forgot-password" className="text-sm text-purple-600 hover:underline">
          Forgot Password?
        </Link>
      </div>

      <div className="mb-4">
        {isSubmitting ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <Button type="submit" className="w-full">
            Log In
          </Button>
        )}
      </div>

      <p className="text-center text-gray-600 text-sm">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-purple-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
