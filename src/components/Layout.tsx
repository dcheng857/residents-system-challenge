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
