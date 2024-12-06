import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let { logOut } = useAuth();
  let navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!currentPassword || !newPassword) {
      toast.error("Both fields are required.");
      setLoading(false);
      return;
    }

    try {
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      logOut()
        .then(() => {
          navigate("/sign-in");
          toast.success(`Password changed successfully!!`, {
            style: {
              border: "2px solid green",
              padding: "8px",
              color: "#713200",
            },
            iconTheme: {
              primary: "green",
              secondary: "#FFFAEE",
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });

      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      if (error.code === "auth/wrong-password") {
        toast.error("The current password is incorrect.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters.");
      } else {
        toast.error("Failed to update password. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-5">Change Password</h2>

      <form
        onSubmit={handleChangePassword}
        className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <Input
            type="password"
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Change Password"}
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
