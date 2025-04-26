import { toast } from "react-toastify";
import { UserIcon } from "../Icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Notifications from "../../../components/Notifications";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // logout handler
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/login");
  };

  return (
    <div className="hidden md:block">
      <div
        className="sticky top-16 z-10 flex-shrink-0 h-16 bg-white border-b flex"
        style={{ marginTop: "64px" }}
      >
        <div className="flex-1 flex justify-end px-4 md:px-0">
          <div className="absolute top-0 left-0 bottom-0 right-0 my-2 ml-6"></div>
          <div className="ml-4 flex mr-4 items-center md:ml-6 z-0">
            <Notifications />
            <div className="flex items-center mx-4">
              <UserIcon />
              <div className="flex mx-4 text-xl text-black">
                <h3>Welcome_ </h3>
                <h3>{user?.name}</h3>
                <h3>{user?.organisationName}</h3>
                <h3>{user?.hospitalName}</h3>
              </div>
              <span className="inline-block px-2 py-1 text-sm font-semibold text-black bg-green-400 rounded">
                {user?.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              <FiLogOut className="mr-2" /> LogOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
