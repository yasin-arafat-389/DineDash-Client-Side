import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { Card, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const BrowseByCategory = () => {
  const { category } = useParams();
  const axios = useAxios();
  const navigate = useNavigate();

  // Fetch products based on the category
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["categoryProducts", category],
    queryFn: async () => {
      const res = await axios.get(`/foods/category?category=${category}`);
      return res.data;
    },
  });

  return (
    <div className="p-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        {isLoading ? "Loading..." : `Browse ${category}`}
      </h2>

      {isLoading ? (
        <div className="text-center text-lg font-medium text-gray-500">
          Fetching products...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-lg font-medium text-gray-500">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product._id}
              className="p-4 shadow-md hover:shadow-lg bg-gray-200"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                {product.name}
              </h3>
              <p className="text-gray-600 mt-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-lg font-bold text-gray-900 mt-3">
                ৳ {product.price}
              </p>
              <Button
                size="sm"
                className="mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate(`/food-details/${product._id}`)}
              >
                View Details
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseByCategory;
