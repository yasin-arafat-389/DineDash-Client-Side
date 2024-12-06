import useAxios from "../../Hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import "./RestaurantPage.css";
import { AiFillFire } from "react-icons/ai";
import { useEffect, useState } from "react";
import NoFoodsFound from "../../../Utility/NoFoodsFound/NoFoodsFound";
import RestaurantPageSkeletonLoader from "../../../Utility/RestaurantPageSkeletonLoader/RestaurantPageSkeletonLoader";
import { useQuery } from "@tanstack/react-query";
import { BiSolidOffer } from "react-icons/bi";
import { Button } from "@material-tailwind/react";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const RestaurantPage = () => {
  let restaurantPath = useParams();
  let pathname = restaurantPath.name;
  let navigate = useNavigate();
  let axios = useAxios();
  let { user } = useAuth();

  // States
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState([]);
  const [followLoading, setFollowLoading] = useState(false);

  // Fetching food data filtered by restaurant name
  useEffect(() => {
    setLoading(true);
    axios.get(`/restaurant?name=${pathname}`).then((res) => {
      setFood(res.data);
      setLoading(false);
    });
  }, [axios, pathname]);

  let { data: myOffers = [], isLoading: isMyOffersLoading } = useQuery({
    queryKey: ["myOffers"],
    queryFn: async () => {
      let res = await axios.get(`/get-coupons?restaurant=${pathname}`).then();
      return res.data;
    },
  });

  let {
    data: followData,
    isLoading: isFollowDataLoading,
    refetch,
  } = useQuery({
    queryKey: ["followData"],
    queryFn: async () => {
      let res = await axios.get(`/follow/shop?restaurant=${pathname}`).then();
      return res.data;
    },
  });

  const handleFollowShop = () => {
    if (!user?.email) {
      toast.error("You must login first to follow this restaurant!!");
      return;
    }

    setFollowLoading(true);

    const payload = { email: user.email, restaurant: pathname };

    axios.post(`/follow/shop`, payload).then((res) => {
      toast.success(`${res.data.message}`, {
        duration: 3000,
        style: {
          border: "2px solid green",
          padding: "8px",
          color: "#713200",
        },
        iconTheme: {
          primary: "green",
          secondary: "#FFFAEE",
        },
      });

      setFollowLoading(false);
      refetch();
    });
  };

  const handleAddToRecent = (item) => {
    // Get the current list of recently viewed products from localStorage
    let recentProducts =
      JSON.parse(localStorage.getItem(`${user?.email}recentProducts`)) || [];

    // Check if the product is already in the list by comparing _id
    const productExists = recentProducts.some(
      (product) => product._id === item._id
    );

    if (!productExists) {
      // If the product doesn't exist in the list, add it to the beginning
      recentProducts.unshift(item);

      // Limit to the last 10 products
      if (recentProducts.length > 10) {
        recentProducts = recentProducts.slice(0, 10); // Keep only the latest 10 products
      }

      // Save the updated list to localStorage
      localStorage.setItem(
        `${user?.email}recentProducts`,
        JSON.stringify(recentProducts)
      );
    } else {
      // If product already exists, show a message (optional)
      console.log("Product is already in the recent list.");
    }
  };

  return (
    <div>
      {loading || isMyOffersLoading || isFollowDataLoading ? (
        <RestaurantPageSkeletonLoader pathname={pathname} />
      ) : (
        <>
          {/* Banner */}
          <div
            className="h-[100px] flex-col md:h-[200px] lg:h-[200px] flex justify-center items-center text-[30px] md:text-[50px] lg:text-[50px] restaurantTitle"
            style={{
              backgroundImage: `url("https://i.ibb.co/YNFfVNq/res-bg.png")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {pathname}
          </div>

          <div className="flex justify-center items-center gap-5 bg-[#eff6f3] pt-4">
            <Button
              loading={followLoading}
              disabled={followLoading}
              onClick={handleFollowShop}
              className="bg-blue-600 text-white text-lg capitalize py-2 px-6 rounded-full hover:bg-blue-700 transition-all"
            >
              {followData.some((entry) => entry.email === user?.email)
                ? "Unfollow"
                : "Follow"}
            </Button>

            <h3 className="text-[#333333] text-xl">
              Followers: {followData.length}
            </h3>
          </div>

          {/* Main */}
          <div className="bg-[#eff6f3]">
            <div className="w-[80%] mx-auto">
              {/* Title */}

              <div
                className={`secHeader py-10 flex items-center gap-3 text-red-500 ${
                  food.length <= 0 && "hidden"
                }`}
              >
                <AiFillFire className="text-[24px] " />
                <h3 className="text-[#333333] text-[20px] md:text-[24px] lg:text-[24px] font-bold">
                  Featured from {pathname}
                </h3>
              </div>

              {/* Cards */}
              {food.length === 0 ? (
                <NoFoodsFound restaurantName={pathname} />
              ) : (
                <>
                  <div className="resCards grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 pb-16">
                    {food.map((item, index) => (
                      <div key={index}>
                        <button
                          onClick={() => {
                            handleAddToRecent(item);
                            navigate(`/food-details/${item._id}`);
                          }}
                          className="bg-white flex gap-5 items-center w-full text-left border-2 border-gray-400 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all h-full"
                        >
                          <div className="foodContent w-2/3 flex flex-col gap-2">
                            <h1 className="FoodTitle elipseTitle text-[#333333] text-[18px] md:text-[22px] lg:text-[22px] font-bold">
                              {item?.name}
                            </h1>
                            <p className="elipseDesc text-[#767676] text-[12px] md:text-[15px] lg:text-[15px]">
                              {item?.description}
                            </p>
                            <p className="text-[#333333] text-[18px] md:text-[22px] lg:text-[22px] font-bold">
                              ৳ {item?.price}
                            </p>

                            <div>
                              {myOffers
                                .filter(
                                  (food) => food.selectedFood.name === item.name
                                )
                                .map((matchedFood, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-center items-center gap-2 mt-2 bg-[#219C90] text-white py-1 rounded-lg font-bold"
                                  >
                                    <BiSolidOffer fontSize={"22"} />
                                    <p>
                                      Get {matchedFood.discountAmount} taka
                                      discount.
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>

                          <div className="foodImage-rc w-1/3">
                            <img
                              src={item?.image}
                              className="rounded-xl h-[120px] w-full"
                            />
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantPage;
