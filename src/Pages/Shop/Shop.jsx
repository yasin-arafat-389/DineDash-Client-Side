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
    <div className="p-5">
      <h2 className="text-3xl font-bold text-center mb-10">All Vendors</h2>

      {isLoading ? (
        <div className="text-center text-lg font-medium text-gray-600">
          Loading vendors...
        </div>
      ) : data.length === 0 ? (
        <div className="text-center text-lg font-medium text-gray-600">
          No vendors available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {data.map((vendor) => (
            <div
              key={vendor._id}
              className="border border-gray-300 p-5 rounded-lg shadow-md bg-gray-200 hover:shadow-lg transition-all"
            >
              <img
                src={vendor.thumbnail || "https://via.placeholder.com/150"}
                alt={vendor.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 truncate">
                {vendor.name}
              </h3>

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
