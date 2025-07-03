import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";
import Button from "../common/Button";
import clsx from "clsx";

const ForgotPassword = () => {
  const { requestPasswordReset } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      return "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())
    ) {
      return "Invalid email address";
    }
    return "";
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrors("");
    setInfoMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setErrors(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await requestPasswordReset(email.trim());
      setInfoMessage(
        "If that email is registered, you’ll receive a reset link shortly."
      );
    } catch (err) {
      setErrors(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Forgot Password
      </h2>

      {errors && (
        <div className="mb-4 text-red-600 text-sm text-center">{errors}</div>
      )}
      {infoMessage && (
        <div className="mb-4 text-green-600 text-sm text-center">
          {infoMessage}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          className={clsx(
            "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400",
            errors ? "border-red-500" : "border-gray-300"
          )}
        />
      </div>

      <div className="mb-4">
        {isSubmitting ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        )}
      </div>
    </form>
  );
};

export default ForgotPassword;
