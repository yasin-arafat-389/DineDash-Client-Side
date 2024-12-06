import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error("Email is required.");
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
      setEmail(""); // Clear the input field
    } catch (error) {
      console.error("Error sending reset email:", error);
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format.");
      } else {
        toast.error("Failed to send password reset email. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-5">Reset Password</h2>

      <form
        onSubmit={handleResetPassword}
        className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <Input
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
