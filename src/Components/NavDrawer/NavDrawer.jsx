import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { IoMdHome } from "react-icons/io";
import { GiHamburger } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeNavDrawer } from "../../Redux/NavDrawerSlice/NavDrawerSlice";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaCartShopping, FaChevronDown, FaChevronRight } from "react-icons/fa6";
import { useState } from "react";

const NavDrawer = () => {
  const open = useSelector((state) => state.navDrawer.open);
  let dispatch = useDispatch();

  const [openDropDown, setOpenDropDown] = useState(0);

  const handleOpen = (value) => {
    setOpenDropDown(openDropDown === value ? 0 : value);
  };

  return (
    <div>
      <Drawer
        overlay={false}
        placement="left"
        open={open}
        className="p-4 w-[250px] md:hidden lg:hidden overflow-auto"
      >
        <div>
          <img
            className="w-[80px] mx-auto"
            src="https://i.ibb.co/kBDBhVs/dinedash.png"
            alt=""
          />

          <div className="flex flex-col mt-8 gap-3">
            <NavLink
              onClick={() => dispatch(closeNavDrawer())}
              to={"/"}
              className="flex items-center gap-3 font-bold p-2 rounded-lg"
            >
              <IoMdHome size={25} />
              <span> Home</span>
            </NavLink>

            <NavLink
              onClick={() => dispatch(closeNavDrawer())}
              to={"/burger-builder"}
              className="flex items-center gap-3 font-bold p-2 rounded-lg"
            >
              <GiHamburger size={25} />
              <span>Burger Builder</span>
            </NavLink>

            <NavLink
              onClick={() => dispatch(closeNavDrawer())}
              to={"/browse-foods"}
              className="flex items-center gap-3 font-bold p-2 rounded-lg"
            >
              <IoFastFoodSharp size={25} />
              <span>Browse Foods</span>
            </NavLink>

            <NavLink
              onClick={() => dispatch(closeNavDrawer())}
              to={"/checkout"}
              className="flex items-center gap-3 font-bold p-2 rounded-lg"
            >
              <FaCartShopping size={25} />
              <span>Cart</span>
            </NavLink>

            <NavLink
              onClick={() => dispatch(closeNavDrawer())}
              to={"/comparison"}
              className="flex items-center gap-3 font-bold p-2 rounded-lg"
            >
              Comparison
            </NavLink>

            <NavLink
              onClick={() => dispatch(closeNavDrawer())}
              to={"/shop"}
              className="flex items-center gap-3 font-bold p-2 rounded-lg"
            >
              Shop
            </NavLink>

            <Accordion
              open={openDropDown === 1}
              icon={
                <FaChevronDown
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openDropDown === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={openDropDown === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border border-gray-600 p-3 rounded-lg"
                >
                  <Typography className="mr-auto font-bold">
                    About Us
                  </Typography>
                </AccordionHeader>
              </ListItem>

              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link
                    to={"/our-mission"}
                    onClick={() => dispatch(closeNavDrawer())}
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <FaChevronRight strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Our Mission and Vision
                    </ListItem>
                  </Link>
                </List>

                <List className="p-0">
                  <Link
                    to={"/contact-us"}
                    onClick={() => dispatch(closeNavDrawer())}
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <FaChevronRight strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Contact Us
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>

            <Accordion
              open={openDropDown === 1}
              icon={
                <FaChevronDown
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openDropDown === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={openDropDown === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border border-gray-600 p-3 rounded-lg"
                >
                  <Typography className="mr-auto font-bold">
                    Partnership Program
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link
                    to={"/be-a-partner"}
                    onClick={() => dispatch(closeNavDrawer())}
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <FaChevronRight strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Become A Vendor
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default NavDrawer;
