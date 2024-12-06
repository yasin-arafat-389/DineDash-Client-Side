import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { Button, Progress, Rating } from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { increment } from "../../Redux/CartCountSlice/CartCountSlice";
import { getUpdatedRegularOrder } from "../../Redux/MyCartSlice/MyCartSlice";
import { openDrawer } from "../../Redux/CartDrawerSlice/CartDrawerSlice";
import useAuth from "../../Hooks/useAuth";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoWarning } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ReviewsSkeletonLoader from "./ReviewsSkeletonLoader";
import { BiSolidOffer } from "react-icons/bi";

const FoodDetails = () => {
  let axios = useAxios();
  let { user } = useAuth();
  let dispatch = useDispatch();
  let id = useParams();
  let foodId = id.id;
  let navigate = useNavigate();

  //   Fetching Food Details
  let {
    data: foodDetails = [],
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["singleFoodDetails", foodId],
    queryFn: async () => {
      let res = await axios.get(`/food/details?id=${foodId}`).then();
      return res.data;
    },
  });

  //   Fetching reviews
  let { data: reviews = [], isFetching: isReviewsLoading } = useQuery({
    queryKey: ["singleFoodReviews"],
    queryFn: async () => {
      let res = await axios.get(`/reviews/foods?id=${foodId}`).then();
      return res.data;
    },
  });

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  // Get the average rating
  const averageRating = calculateAverageRating(reviews);

  // Function to calculate the percentage of each rating
  const calculateRatingPercentages = (reviews) => {
    const totalReviews = reviews.length;

    // Initialize rating counts for each rating (1 to 5)
    const ratingCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    // Count the occurrences of each rating
    reviews.forEach((review) => {
      ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1;
    });

    // Calculate the percentage of each rating and format the result
    const ratingPercentages = [
      { one: ((ratingCounts[1] / totalReviews) * 100).toFixed(2) + "%" },
      { two: ((ratingCounts[2] / totalReviews) * 100).toFixed(2) + "%" },
      { three: ((ratingCounts[3] / totalReviews) * 100).toFixed(2) + "%" },
      { four: ((ratingCounts[4] / totalReviews) * 100).toFixed(2) + "%" },
      { five: ((ratingCounts[5] / totalReviews) * 100).toFixed(2) + "%" },
    ];

    return ratingPercentages;
  };

  // Get the rating percentages
  const ratingPercentages = calculateRatingPercentages(reviews);

  //   Handling Tabs
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  //   Handle Show Reviews
  const handleShowReviews = () => {
    setActiveTab("tab2");

    // Scroll to the element with ID 'abiss'
    const element = document.getElementById("food-reviews");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  //   Handling quantity
  const [quantity, setQuantity] = useState(1);
  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  let totalPrice = quantity * foodDetails?.price;

  //Handle show alert
  let handleShowAlert = () => {
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
  };

  const handleAddToCart = () => {
    const existingCart =
      JSON.parse(localStorage.getItem(`${user?.email}Cart`)) || [];

    const date = new Date();
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const year = date.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    function generateRandomString() {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";

      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      return result;
    }

    let saveToLocalStorage = {
      identifier: foodDetails._id,
      name: foodDetails?.name,
      image: foodDetails?.image,
      price: foodDetails?.price,
      status: "order received",
      date: formattedDate,
      quantity: quantity,
      totalPrice: totalPrice,
      restaurant: foodDetails?.restaurant,
      isAcceptedByRider: false,
      orderId: generateRandomString(),
      reviewed: false,
    };

    // Check if the cart already has items from a different vendor
    if (
      existingCart.length > 0 &&
      existingCart[0]?.restaurant !== foodDetails?.restaurant
    ) {
      // Show a warning with options
      const userDecision = window.confirm(
        `You already have products from ${existingCart[0]?.restaurant} in your cart. Do you want to replace them with products from ${foodDetails?.restaurant}?`
      );

      if (userDecision) {
        // Replace the cart with the new product
        localStorage.setItem(
          `${user?.email}Cart`,
          JSON.stringify([saveToLocalStorage])
        );
        dispatch(getUpdatedRegularOrder());
      } else {
        return;
      }
    } else {
      // Add the product to the cart
      const existingItemIndex = existingCart.findIndex(
        (item) => item.identifier === foodDetails?._id
      );

      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += quantity;
        existingCart[existingItemIndex].totalPrice +=
          saveToLocalStorage.totalPrice;
      } else {
        existingCart.push(saveToLocalStorage);
        dispatch(increment());
      }

      localStorage.setItem(`${user?.email}Cart`, JSON.stringify(existingCart));
      dispatch(getUpdatedRegularOrder());
    }

    dispatch(openDrawer());
    setQuantity(1);
  };

  let { data: myOffers = [], isLoading: isMyOffersLoading } = useQuery({
    queryKey: ["myOffersById"],
    queryFn: async () => {
      let res = await axios.get(`/get-coupons?foodId=${foodId}`).then();
      return res.data;
    },
  });

  let { data: relatedFoods = [], isFetching: isRelatedFoodsLoading } = useQuery(
    {
      queryKey: ["relatedFoods", foodDetails.category],
      queryFn: async () => {
        let res = await axios.get(
          `/foods/category?category=${foodDetails.category}`
        );
        return res.data;
      },
      enabled: !!foodDetails.category,
    }
  );

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

  if (isError) {
    return navigate("/browse-foods");
  }

  return (
    <div>
      <style>
        {`
        @keyframes pulse {
            0% {
            background-position: 100% 0;
            }
            100% {
            background-position: -100% 0;
            }
        }

        .animate-pulse {
            background-image: linear-gradient(to right, rgba(255,255,255,0) 0%, #ccc 50%, rgba(255,255,255,0) 100%);
            background-size: 200% 100%;
            animation: pulse 1.2s infinite;
        }
    `}
      </style>

      <div className="bg-gray-100">
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-10 md:py-24 lg:py-15 mx-auto">
            {/* Discount Banner */}
            {myOffers && (
              <div className="w-[65%] text-xl mx-auto mb-10 flex justify-center items-center gap-3 bg-[#219C90] text-white py-3 rounded-lg font-bold">
                <BiSolidOffer fontSize={"33"} />
                <p>
                  Use coupon code{" "}
                  <span className="bg-[#E0A75E] p-2 rounded-xl">
                    {myOffers.couponCode}
                  </span>{" "}
                  to get {myOffers.discountAmount} taka off.
                </p>
              </div>
            )}

            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              {isFetching || isMyOffersLoading ? (
                <div className="lg:w-1/2 w-full lg:h-[400px] h-64 rounded bg-gray-500 animate-pulse"></div>
              ) : (
                <img
                  className="lg:w-1/2 w-full lg:h-[400px] h-64 rounded"
                  src={foodDetails.image}
                />
              )}

              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-0 mt-6 lg:mt-0">
                {isFetching || isMyOffersLoading ? (
                  <div className="h-5 w-[150px] rounded-lg bg-gray-400 animate-pulse"></div>
                ) : (
                  <Link
                    to={`/restaurants/${foodDetails.restaurant}`}
                    className="text-lg title-font text-gray-700 tracking-widest hover:text-blue-500 hover:underline"
                  >
                    {foodDetails.restaurant}
                  </Link>
                )}

                {isFetching || isMyOffersLoading ? (
                  <div className="h-10 w-[300px] mt-3 rounded-lg bg-gray-400 animate-pulse"></div>
                ) : (
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 mt-3">
                    {foodDetails.name}
                  </h1>
                )}

                <div className="flex">
                  <span className="flex items-center">
                    {isReviewsLoading ? (
                      <div className="h-5 w-[150px] rounded-lg bg-gray-400 animate-pulse mt-2"></div>
                    ) : (
                      <span
                        onClick={handleShowReviews}
                        className="mt-2 text-blue-500 hover:underline cursor-pointer font-semibold"
                      >
                        See Reviews
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex mt-3">
                  {isFetching || isMyOffersLoading ? (
                    <div className="h-5 w-[150px] rounded-lg bg-gray-400 animate-pulse"></div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Category:</span>
                      <h2 className="bg-yellow-500 font-semibold rounded-lg text-gray-700 py-1 px-2">
                        {foodDetails.category}
                      </h2>
                    </div>
                  )}
                </div>

                <div className="flex mt-7">
                  {isFetching || isMyOffersLoading ? (
                    <span className="h-10 w-[150px] rounded-lg bg-gray-400 animate-pulse"></span>
                  ) : (
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ৳ {foodDetails.price}
                    </span>
                  )}
                </div>

                <div className="flex flex-row gap-32 w-full justify-center bg-gray-300 p-3 mt-10 rounded-lg">
                  <button onClick={handleDecreaseQuantity}>
                    <AiFillMinusCircle className="text-pink-500 text-[30px] cursor-pointer" />
                  </button>
                  <p className="text-[20px] font-bold">{quantity}</p>
                  <button onClick={handleIncreaseQuantity}>
                    <AiFillPlusCircle className="text-pink-500 text-[30px] cursor-pointer" />
                  </button>
                </div>

                {user ? (
                  <Button
                    id="food-reviews"
                    size="lg"
                    fullWidth
                    className="bg-blue-600 mt-5 capitalize flex justify-center items-center gap-3 text-lg"
                    onClick={handleAddToCart}
                  >
                    <HiOutlineShoppingBag size={"30"} />
                    Add To Cart
                  </Button>
                ) : (
                  <Link to="/sign-in" state={location?.pathname}>
                    <Button
                      id="food-reviews"
                      size="lg"
                      fullWidth
                      className="bg-blue-600 mt-5 capitalize flex justify-center items-center gap-3 text-lg"
                      onClick={handleShowAlert}
                    >
                      <HiOutlineShoppingBag size={"30"} />
                      Add To Cart
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="lg:w-4/5 mx-auto mt-10 md:mt-20 lg:mt-20">
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <button
                    className={`p-4 rounded ${
                      activeTab === "tab1"
                        ? "bg-indigo-500 text-white font-bold shadow-md"
                        : "bg-gray-400 text-[#000] font-bold"
                    } flex items-center justify-center`}
                    onClick={() => handleTabClick("tab1")}
                  >
                    Description
                  </button>
                  <button
                    className={`p-4 rounded ${
                      activeTab === "tab2"
                        ? "bg-indigo-500 text-white font-bold shadow-md"
                        : "bg-gray-400 text-[#000] font-bold"
                    } flex items-center justify-center`}
                    onClick={() => handleTabClick("tab2")}
                  >
                    {`Reviews (${reviews.length})`}
                  </button>
                </div>

                {activeTab === "tab1" && (
                  <div>
                    {isFetching || isMyOffersLoading ? (
                      <>
                        <div className="h-3 mt-7 w-full rounded-lg bg-gray-400 animate-pulse"></div>
                        <div className="h-3 mt-1 w-full rounded-lg bg-gray-400 animate-pulse"></div>
                        <div className="h-3 mt-1 w-full rounded-lg bg-gray-400 animate-pulse"></div>
                        <div className="h-3 mt-1 w-full rounded-lg bg-gray-400 animate-pulse"></div>
                      </>
                    ) : (
                      <div className="mt-7 text-gray-700 font-medium">
                        {foodDetails.description}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "tab2" && (
                  <div>
                    {isReviewsLoading ? (
                      <div>
                        <ReviewsSkeletonLoader />
                      </div>
                    ) : reviews.length === 0 ? (
                      <div>
                        <div className="w-full mt-7 py-10 rounded-lg bg-gray-300">
                          <div className="bg-gray-300 w-[100px] h-[100px] mx-auto flex justify-center items-center p-3 rounded-full shadow-lg shadow-blue-500">
                            <img
                              src="https://i.ibb.co/YPNn9WM/reviews.png"
                              className="w-[60px]"
                            />
                          </div>

                          <h1 className="text-center mt-8 text-2xl text-gray-800">
                            No reviews for this food yet!!
                          </h1>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-col gap-3 mt-7">
                          {/*  */}
                          <div className="flex">
                            {/*  */}
                            <div className="w-1/2 flex flex-col gap-3 items-center">
                              <h1 className="text-5xl font-bold">
                                {Math.ceil(averageRating)}
                              </h1>
                              <Rating
                                value={Math.ceil(averageRating)}
                                readonly
                              />
                              <h1 className="text-xl font-semibold">
                                Total <span>{reviews.length} ratings</span>
                              </h1>
                            </div>

                            <div className="w-1/2 flex flex-col gap-3">
                              {/* 5 stars */}
                              <div className="w-full flex gap-3 justify-between items-center">
                                <h1 className="font-semibold text-lg w-[90px]">
                                  5 stars
                                </h1>
                                <Progress
                                  value={parseInt(ratingPercentages[4].five)}
                                  color="amber"
                                  className="bg-gray-300"
                                />

                                {}
                                <h1>{ratingPercentages[4].five}</h1>
                              </div>

                              {/* 4 stars */}
                              <div className="w-full flex gap-3 justify-between items-center">
                                <h1 className="font-semibold text-lg w-[90px]">
                                  4 stars
                                </h1>
                                <Progress
                                  value={parseInt(ratingPercentages[3].four)}
                                  color="amber"
                                  className="bg-gray-300"
                                />

                                <h1>{ratingPercentages[3].four}</h1>
                              </div>

                              {/* 3 stars */}
                              <div className="w-full flex gap-3 justify-between items-center">
                                <h1 className="font-semibold text-lg w-[90px]">
                                  3 stars
                                </h1>
                                <Progress
                                  value={parseInt(ratingPercentages[2].three)}
                                  color="amber"
                                  className="bg-gray-300"
                                />

                                <h1>{ratingPercentages[2].three}</h1>
                              </div>

                              {/* 2 stars */}
                              <div className="w-full flex gap-3 justify-between items-center">
                                <h1 className="font-semibold text-lg w-[90px]">
                                  2 stars
                                </h1>
                                <Progress
                                  value={parseInt(ratingPercentages[1].two)}
                                  color="amber"
                                  className="bg-gray-300"
                                />

                                <h1>{ratingPercentages[1].two}</h1>
                              </div>

                              {/* 1 stars */}
                              <div className="w-full flex gap-3 justify-between items-center">
                                <h1 className="font-semibold text-lg w-[90px]">
                                  1 stars
                                </h1>
                                <Progress
                                  value={parseInt(ratingPercentages[0].one)}
                                  color="amber"
                                  className="bg-gray-300"
                                />

                                <h1>{ratingPercentages[0].one}</h1>
                              </div>
                            </div>
                          </div>

                          <div className="my-6">
                            {Math.ceil(averageRating) >= 3 ? (
                              <h1 className="flex justify-center items-center gap-3 w-[80%] mx-auto bg-green-600 py-3 rounded-xl text-white text-xl font-bold text-center">
                                <IoMdCheckmarkCircleOutline size={35} />
                                Users rating for this food is good enough.
                                Consider buying this food.
                              </h1>
                            ) : (
                              <h1 className="flex justify-center items-center gap-3 w-[80%] mx-auto bg-red-600 py-3 rounded-xl text-white text-xl font-bold text-center">
                                <IoWarning size={35} />
                                Users rating for this food is not good enough.
                              </h1>
                            )}
                          </div>

                          {reviews.map((item, index) => (
                            <>
                              <div
                                key={index}
                                className={`w-full flex flex-col gap-4 border-2 border-gray-600 bg-gray-200 text-gray-800 
                                p-4 rounded-lg`}
                              >
                                <div className="flex justify-between gap-3">
                                  <div className="flex items-center gap-4">
                                    <img
                                      src={item.profileImage}
                                      className="w-10 h-10 text-center object-cover rounded-full bg-white"
                                    />

                                    <span>{item.userName}</span>
                                  </div>

                                  <h1>{item.date}</h1>
                                </div>

                                <div>
                                  <Rating value={item.rating} readonly />
                                </div>

                                <div>{item.review}</div>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Related Foods Section */}
            <div className="mt-20">
              <h2 className="text-2xl text-center font-bold text-gray-800 mb-5">
                Related Foods
              </h2>
              {isRelatedFoodsLoading ? (
                <div className="flex justify-center items-center w-full h-64 bg-gray-200 rounded-lg">
                  <span className="text-lg font-semibold text-gray-500">
                    Loading related foods...
                  </span>
                </div>
              ) : relatedFoods.length === 0 ? (
                <div className="flex justify-center items-center w-full h-64 bg-gray-200 rounded-lg">
                  <span className="text-lg font-semibold text-gray-500">
                    No related foods found.
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedFoods.map((food) => (
                    <div
                      key={food._id}
                      className="border border-gray-300 p-5 rounded-lg shadow-lg hover:shadow-xl bg-white"
                    >
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <h3 className="text-xl font-semibold text-gray-800 mt-4 truncate">
                        {food.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 truncate">
                        {food.description}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-lg font-bold text-gray-800">
                          ৳ {food.price}
                        </span>
                        <Link
                          to={`/food-details/${food._id}`}
                          onClick={() => handleAddToRecent(food)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FoodDetails;
