import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";
import Button from "../common/Button";
import clsx from "clsx";

const SignUpForm = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
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
      await signup(
        formData.username.trim(),
        formData.email.trim(),
        formData.password
      );
      navigate("/");
    } catch (err) {
      setSubmitError(err.message || "Sign up failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

      {submitError && (
        <div className="mb-4 text-red-600 text-sm text-center">
          {submitError}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={clsx(
            "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400",
            errors.username ? "border-red-500" : "border-gray-300"
          )}
        />
        {errors.username && (
          <p className="mt-1 text-red-500 text-sm">{errors.username}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={clsx(
            "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400",
            errors.email ? "border-red-500" : "border-gray-300"
          )}
        />
        {errors.email && (
          <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
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

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={clsx(
            "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400",
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          )}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-red-500 text-sm">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <div className="mb-4">
        {isSubmitting ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        )}
      </div>

      <p className="text-center text-gray-600 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-purple-600 hover:underline">
          Log In
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
