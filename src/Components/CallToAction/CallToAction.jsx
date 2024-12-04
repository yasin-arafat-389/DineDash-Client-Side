import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router-dom";

const CallToAction = () => {
  let axios = useAxios();

  // Fetching food data using TanStack Query
  const { data: foods = [], isLoading } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await axios.get("/foods");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-500"></div>
      </div>
    );
  }

  // Limit displayed foods to 4
  const displayedFoods = foods.slice(0, 4);

  return (
    <div className="p-5 lg:p-10 bg-[#f3f5ed]">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Browse Foods
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedFoods.map((food) => (
          <div
            key={food._id}
            className="border border-gray-300 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 truncate">
                {food.name}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {food.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-800">
                  ${food.price.toFixed(2)}
                </span>
                <Link
                  to={`/food-details/${food._id}`}
                  className="px-3 py-1 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link
          to={"/browse-foods"}
          className="px-6 py-2 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Browse All Foods
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
