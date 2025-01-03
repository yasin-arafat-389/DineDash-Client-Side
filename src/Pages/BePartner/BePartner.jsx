import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BePartner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <section className="flex items-center bg-stone-100 xl:h-screen font-poppins dark:bg-gray-800 ">
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap ">
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <div className="relative lg:max-w-md">
                <img
                  src="./partnership-program-vendor.jpg"
                  alt="aboutimage"
                  className="relative  object-cover w-full rounded h-96"
                />

                <div className="absolute bottom-0 right-0 p-8 bg-white border-4 border-blue-500 rounded shadow dark:border-blue-400 lg:-mb-8 lg:-mr-11 sm:p-8 dark:text-gray-300 dark:bg-gray-800 ">
                  <p className="text-lg font-semibold md:w-75 text-teal-400 italic">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="absolute top-0 left-0 w-16 h-16 text-blue-700 dark:text-gray-300 opacity-10"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"></path>
                    </svg>{" "}
                    Transforming Fast Food Ventures <br /> with Innovation!
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full px-6 mb-10 lg:w-1/2 lg:mb-0 ">
              <div className="pl-4 mb-6 border-l-4 border-blue-500 ">
                <motion.p
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  exit={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, easings: ["easeInOut"] }}
                  className="text-sm text-gray-600 font-bold dark:text-gray-400"
                >
                  Elevate Your Fast Food Business with DineDash
                </motion.p>

                <motion.h1
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    easings: ["easeInOut"],
                    delay: 0.3,
                  }}
                  className="mt-2 text-2xl font-black text-gray-700 md:text-3xl dark:text-gray-300"
                >
                  Join DineDash as a Premier Fast Food Vendor 🍔
                </motion.h1>
              </div>

              <motion.p
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  easings: ["easeInOut"],
                  delay: 0.5,
                }}
                className="mb-6 text-base leading-7 text-gray-600 dark:text-gray-400"
              >
                Are you a dynamic fast-food chain ready to take your business to
                new heights? Look no further! DineDash is actively seeking
                passionate partners like you to join our ever-growing family of
                premier fast-food establishments. As a DineDash partner,{" "}
                {`you'll`} unlock a world of opportunities and elevate your
                brand to the next level.
              </motion.p>

              <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  easings: ["easeInOut"],
                  delay: 0.7,
                }}
              >
                <Link
                  target="_blank"
                  to="https://dine-dash-dashboard-side.web.app"
                >
                  {" "}
                  <Button className="capitalize text-md bg-blue-400" fullWidth>
                    Become A Vendor
                  </Button>
                </Link>
              </motion.div>

              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  easings: ["easeInOut"],
                }}
                className="mt-8 text-sm md:text-xl text-gray-600 dark:text-gray-400"
              >
                If you are already a vendor, login to your{" "}
                <Link
                  to="https://dine-dash-dashboard-side.web.app/login"
                  target="_blank"
                >
                  <span className="text-blue-600 hover:underline font-bold">
                    Dashboard
                  </span>
                </Link>
              </motion.h1>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BePartner;
