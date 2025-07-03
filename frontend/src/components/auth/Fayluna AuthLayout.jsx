import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-md px-6 py-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-6">
          <img
            src="/assets/images/logo.png"
            alt="Fayluna Logo"
            className="h-12 w-auto"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
