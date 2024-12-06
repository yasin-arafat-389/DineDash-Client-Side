import { useState } from "react";
import { Button, Card } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import RouteChangeLoader from "../../../Utility/Loaders/RouteChangeLoader/RouteChangeLoader";

const Comparison = () => {
  let axios = useAxios();
  const [comparisonItems, setComparisonItems] = useState([]);

  const handleAddToComparison = (product) => {
    if (comparisonItems.length >= 3) {
      toast.error("You can only compare up to three foods.");
      return;
    }

    if (
      comparisonItems.length > 0 &&
      comparisonItems[0].category !== product.category
    ) {
      toast.error("You can only compare foods from the same category.");
      return;
    }

    if (!comparisonItems.some((item) => item._id === product._id)) {
      setComparisonItems([...comparisonItems, product]);
      toast.success(`${product.name} added to comparison.`);
    } else {
      toast.error("This food is already in the comparison list.");
    }
  };

  const handleRemoveFromComparison = (productId) => {
    const updatedItems = comparisonItems.filter(
      (item) => item._id !== productId
    );
    setComparisonItems(updatedItems);
    toast.success("Food removed from comparison.");
  };

  // Function to determine the verdict based on prices
  const getVerdict = () => {
    if (comparisonItems.length < 2) return null;

    const sortedItems = [...comparisonItems].sort((a, b) => a.price - b.price);
    const cheapest = sortedItems[0];
    const mostExpensive = sortedItems[sortedItems.length - 1];

    return `The cheapest food is "${cheapest.name}" at ৳${cheapest.price}, and the most expensive is "${mostExpensive.name}" at ৳${mostExpensive.price}.`;
  };

  let { data = [], isLoading } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await axios.get("/foods");
      return res.data;
    },
  });

  if (isLoading) {
    return <RouteChangeLoader />;
  }

  return (
    <div className="flex flex-col md:flex-row p-5 gap-5">
      {/* Left Half - Product Cards */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-5">Available Foods</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-h-[500px] overflow-y-scroll">
          {data?.map((product) => (
            <Card key={product._id} className="p-4 shadow-md bg-gray-200">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>Price: ৳{product.price}</p>
              <p>Category: {product.category}</p>
              <Button
                size="sm"
                className="mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={() => handleAddToComparison(product)}
              >
                Add to Compare
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Half - Comparison Table */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-5">Food Comparison</h2>
        {comparisonItems.length > 0 ? (
          <div>
            <div className="overflow-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Price</th>
                    <th className="border border-gray-300 p-2">Category</th>
                    <th className="border border-gray-300 p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonItems.map((item) => (
                    <tr key={item._id}>
                      <td className="border border-gray-300 p-2">
                        {item.name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        ৳{item.price}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.category}
                      </td>

                      <td className="border border-gray-300 p-2">
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => handleRemoveFromComparison(item._id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Verdict Section */}
            {comparisonItems.length > 1 && (
              <div className="mt-5 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Verdict</h3>
                <p className="text-gray-700">{getVerdict()}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-lg font-medium text-gray-600">
            No food selected for comparison.
          </div>
        )}
      </div>
    </div>
  );
};

export default Comparison;
