import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router-dom";

const TagCloud = () => {
  let axios = useAxios();

  // Fetching categories from the server
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("/all-category");
      return res.data;
    },
  });

  return (
    <div className="p-5 pb-10 bg-[#f3f5ed]">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Browse by Categories
      </h2>

      {isLoading ? (
        <div className="text-center text-lg font-medium text-gray-500">
          Loading categories...
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <Link
              to={`/browse-category/${category.name}`}
              key={index}
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-lg hover:bg-blue-600 transition duration-200 shadow-lg"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagCloud;
