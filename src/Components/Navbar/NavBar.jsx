/* eslint-disable react/prop-types */
import React from "react";
import "./NavBar.css";
import {
  Menu,
  MenuList,
  Card,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import ProfileMenu from "./ProfileMenu";
import { HiOutlineShoppingBag } from "react-icons/hi2";

// Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { HiRocketLaunch } from "react-icons/hi2";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../Redux/CartDrawerSlice/CartDrawerSlice";
import { openNavDrawer } from "../../Redux/NavDrawerSlice/NavDrawerSlice";

function MyProfileMenu() {
  let { user } = useAuth();

  return (
    <div>
      {user ? (
        <ProfileMenu />
      ) : (
        <Link to="/sign-in">
          <button className="loginBTN">
            <BiLogInCircle className="text-[20px]" />
            Sign In
          </button>
        </Link>
      )}
    </div>
  );
}

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <HiRocketLaunch strokeWidth={1} className="h-28 w-28" />
          </Card>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}

function NavList({ closeCollapse }) {
  let { user } = useAuth();

  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleOpenDrawer = () => {
    if (!user) {
      navigate("/sign-in");
      toast.error(`You must login first!!`, {
        style: {
          border: "2px solid red",
          padding: "8px",
          color: "#713200",
        },
        iconTheme: {
          primary: "red",
          secondary: "#FFFAEE",
        },
      });
      return;
    }
    dispatch(toggleDrawer());
  };

  return (
    <>
      <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        <NavListMenu />

        {/* Main Menu */}
        <li>
          <NavLink
            onClick={closeCollapse}
            to="/"
            className={({ isActive }) =>
              isActive
                ? "active"
                : "hover:bg-gray-300 p-3 font-bold rounded-lg transition-all"
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={closeCollapse}
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "active"
                : "hover:bg-gray-300 p-3 font-bold rounded-lg transition-all"
            }
          >
            Shop
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={closeCollapse}
            to="/browse-foods"
            className={({ isActive }) =>
              isActive
                ? "active"
                : "hover:bg-gray-300 p-3 font-bold rounded-lg transition-all"
            }
          >
            Browse Food
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={closeCollapse}
            to="/comparison"
            className={({ isActive }) =>
              isActive
                ? "active"
                : "hover:bg-gray-300 p-3 font-bold rounded-lg transition-all"
            }
          >
            Comparison
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={closeCollapse}
            to="/be-a-partner"
            className={({ isActive }) =>
              isActive
                ? "active"
                : "hover:bg-gray-300 p-3 font-bold rounded-lg transition-all"
            }
          >
            Become A Vendor
          </NavLink>
        </li>

        <li>
          <button
            className="hover:bg-gray-300 px-3 py-2 rounded-lg transition-all"
            onClick={
              location.pathname === "/checkout" ? undefined : handleOpenDrawer
            }
          >
            <HiOutlineShoppingBag size={"30"} />
          </button>
        </li>
      </ul>
    </>
  );
}

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  let dispatch = useDispatch();

  const toggleIsNavOpen = () => {
    dispatch(openNavDrawer());
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <div className="mx-auto p-2 shadow-md sticky top-0 bg-[#F9FBE7] z-10">
      <div className="w-[95%] mx-auto flex items-center text-blue-gray-900 justify-between">
        <Link to={"/"}>
          <img
            className="w-[80px] md:w-[100px] lg:w-[100px]"
            src="./dinedash-logo.png"
            alt=""
          />
        </Link>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={() => {
            toggleIsNavOpen();
          }}
          className="ml-auto mr-2 lg:hidden outline-none"
        >
          <GiHamburgerMenu className="h-6 w-6 font-bold" />
        </IconButton>
        {/* <ProfileMenu /> */}
        <MyProfileMenu />
      </div>
      <Collapse open={isNavOpen}>
        <NavList closeCollapse={toggleIsNavOpen} />
      </Collapse>
    </div>
  );
}
