//components/Modals/LogoutModal.jsx

import { useAuth } from "@/context/AuthContext";
import CancelButton from "../Buttons/CancelButton";
import SubmitButton from "../Buttons/SubmitButton";

const LogoutModal = () => {
  const { toggleLogoutModal, logout } = useAuth();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative w-full max-w-md mx-4 bg-white rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Confirm Logout
          </h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to log out? You&apos;ll need to log in again
            to access your account.
          </p>
          <div className="flex justify-end space-x-3">
            <CancelButton
              onClick={toggleLogoutModal}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-gray-100 rounded-md sm:w-auto hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </CancelButton>
            <SubmitButton
              onClick={logout}
              className="w-full px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-red-600 rounded-md sm:w-auto hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </SubmitButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
