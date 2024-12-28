import { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";

const Newsletter = () => {
  let axios = useAxios();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post("/subscribers", {
        email,
      });

      if (response.data.message === "success") {
        setEmail("");
        toast.success("Successfully subscribed!");
        setLoading(false);
      } else if (response.data.message === "already exists") {
        setEmail("");
        toast.error("You have already subscribed!!");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-[#f3f5ed]">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-3">
          <div className="bg-[#eff6f3] p-8 text-center sm:p-10 md:p-16 border-blue-700 border-2 rounded-lg">
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              Join the DineDash Community
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-[#647084] md:mb-10">
              Join our vibrant community and be the first to hear about
              exclusive deals, new restaurant partnerships, and exciting
              updates. Sign up for our newsletter today!
            </p>

            <form
              onSubmit={handleSubmit}
              className="relative mx-auto mb-4 flex w-full max-w-2xl flex-col items-start justify-center sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3 mr-6 block h-9 w-full bg- border-gray-500 rounded-lg border-2 px-6 py-7 text-sm text-[#333333] focus:border-[#3898ec]"
                placeholder="Enter your email"
                required
              />
              <button
                disabled={loading}
                type="submit"
                className="inline-block w-full cursor-pointer bg-[#276ef1] px-6 py-3 text-center font-semibold text-white transition [box-shadow:rgb(171,_196,_245)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px] sm:w-28"
              >
                {loading ? "Loading..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
