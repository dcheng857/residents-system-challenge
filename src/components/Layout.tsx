import {
  ArrowRightOnRectangleIcon,
  CalendarDaysIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout, selectIsAuthenticated } from "../features/login/authSlice";

export function Layout() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen flex">
      <nav className="min-h-screen w-56 flex-none bg-gray-50 overflow-y-auto text-center bg-gray-900">
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">
              Sample Company
            </h1>
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={() => navigate("/")}
        >
          <span className="flex text-[15px] ml-4 text-gray-200 font-bold">
            <UserIcon className="mr-2 h-5 w-5 text-white-500" />
            Residents
          </span>
        </div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={() => navigate("/programs")}
        >
          <span className="flex text-[15px] ml-4 text-gray-200 font-bold">
            <CalendarDaysIcon className="mr-2 h-5 w-5 text-white-500" />
            Programs
          </span>
        </div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={() =>
            window.open(
              "https://github.com/dcheng857/simple-residents-system",
              "_blank"
            )
          }
        >
          <span className="flex text-[15px] ml-4 text-gray-200 font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5 text-white-500"
              viewBox="0 0 24 24"
            >
              <path d="M0 0v24h24v-24h-24zm14.534 19.59c-.406.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.311-1.588-.824-2.147.083-.202.357-1.016-.079-2.117 0 0-.671-.215-2.198.82-.639-.18-1.323-.267-2.003-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
            </svg>
            Github
          </span>
        </div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={handleLogout}
        >
          <span className="flex text-[15px] ml-4 text-gray-200 font-bold">
            <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5 text-white-500" />
            Logout
          </span>
        </div>
      </nav>
      <main className="flex-1 min-w-0 overflow-auto p-5">
        <Outlet />
      </main>
    </div>
  );
}
