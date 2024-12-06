import { useEffect, useState } from "react";
import { Button, Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const RecentlyViewed = () => {
  let { user } = useAuth();
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    // Get the list of recent products from localStorage
    const storedProducts =
      JSON.parse(localStorage.getItem(`${user?.email}recentProducts`)) || [];
    setRecentProducts(storedProducts);
  }, [user?.email]);

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold text-center mb-10">
        Recently Viewed Products
      </h2>

      {recentProducts.length === 0 ? (
        <div className="text-center text-lg font-medium text-gray-600">
          You have not viewed any products yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
          {recentProducts.map((product) => (
            <Card
              key={product._id}
              className="p-4 shadow-md bg-gray-100 hover:shadow-lg transition-all"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {product.name}
              </h3>
              <p className="text-gray-600 truncate">{product.description}</p>
              <p className="text-gray-900 font-bold mt-2">৳ {product.price}</p>
              <Link to={`/food-details/${product._id}`}>
                <Button
                  size="sm"
                  className="mt-4 bg-blue-600 hover:bg-blue-700 w-full text-white"
                >
                  View Details
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;
