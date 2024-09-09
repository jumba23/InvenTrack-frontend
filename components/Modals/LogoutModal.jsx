import React from "react";
import { useAuth } from "../../context/AuthContext";

export const LogoutModal = () => {
  const { toggleLogoutModal, logout } = useAuth();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 transition-all duration-300 ease-in-out transform scale-95 bg-white rounded-lg shadow-xl hover:scale-100">
        <div className="p-6">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Confirm Logout
          </h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to log out? You&apos;ll need to log in again
            to access your account.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={toggleLogoutModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
