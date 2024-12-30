import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  let axios = useAxios();
  let navigate = useNavigate();

  let { data = [], isLoading } = useQuery({
    queryKey: ["allVendors"],
    queryFn: async () => {
      const res = await axios.get("/restaurants");
      return res.data;
    },
  });

  const handleChangeRoute = (path) => {
    navigate(`/restaurants/${path}`);
  };

  return (
    <div className="bg-[#eff6f3]">
      <div
        className="h-[100px] md:h-[200px] lg:h-[200px] flex justify-center items-center text-[30px] md:text-[50px] lg:text-[50px] restaurantTitle"
        style={{
          backgroundImage: `url("https://i.ibb.co/YNFfVNq/res-bg.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        All Vendors
      </div>

      {isLoading ? (
        <div className="text-center text-lg font-medium text-gray-600">
          Loading vendors...
        </div>
      ) : data.length === 0 ? (
        <div className="text-center text-lg font-medium text-gray-600">
          No vendors available.
        </div>
      ) : (
        <div className="w-[90%] mx-auto pb-20 pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {data.map((vendor) => (
            <div
              key={vendor._id}
              className="border-2 border-gray-300 p-5 rounded-lg shadow-md bg-white hover:shadow-lg transition-all"
            >
              <img
                src={vendor.thumbnail || "https://via.placeholder.com/150"}
                alt={vendor.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <div className="flex justify-between py-5">
                <h3 className="text-xl font-semibold text-gray-800 truncate">
                  {vendor.name}
                </h3>

                <h3 className="text-xl font-semibold text-gray-800 truncate">
                  Total Foods: {vendor.totalFoods}
                </h3>
              </div>

              <button
                onClick={() => handleChangeRoute(vendor.name)}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                View Foods
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
