import NavBar from "../../Components/Navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import ScrollToTop from "../../../Utility/ScrollToTop/ScrollToTop";
import CartDrawer from "../../Components/CartDrawer/CartDrawer";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../../Redux/CartDrawerSlice/CartDrawerSlice";
import { useEffect } from "react";

const MyOrders = () => {
  let dispatch = useDispatch();

  const cartDrawerOpen = useSelector((state) => state.cartDrawer.open);
  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  useEffect(() => {
    if (cartDrawerOpen) {
      setTimeout(() => {
        const overlay = document.querySelector(".overlayOnDrawerOpen");
        if (overlay) {
          overlay.classList.add("show");
        }
      }, 5);
    }
  }, [cartDrawerOpen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ScrollToTop />
      <NavBar />
      <CartDrawer />
      {cartDrawerOpen && (
        <div className="overlayOnDrawerOpen" onClick={handleCloseDrawer} />
      )}

      <div className="bg-[#EFF0F4] pb-10">
        <h2 className="flex flex-row flex-nowrap items-center py-10">
          <span className="flex-grow block border-t border-black ml-[100px]"></span>
          <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
            Your Orders
          </span>
          <span className="flex-grow block border-t border-black mr-[100px]"></span>
        </h2>

        <Outlet />
      </div>

      <Footer />
    </motion.div>
  );
};

export default MyOrders;
