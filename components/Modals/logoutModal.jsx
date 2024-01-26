import { useAuth } from "../../context/AuthContext";

export const logoutModal = () => {
  const { toggleLogoutModal, logout } = useAuth();

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="p-8 bg-white rounded-lg">
        <h1 className="mb-4 text-xl">Are you sure you want to logout?</h1>
        <div className="flex justify-evenly">
          <button
            className="w-20 p-2 text-white bg-red-500 rounded"
            onClick={logout}
          >
            Yes
          </button>
          <button
            className="w-20 p-2 text-black bg-gray-300 rounded"
            onClick={toggleLogoutModal}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
