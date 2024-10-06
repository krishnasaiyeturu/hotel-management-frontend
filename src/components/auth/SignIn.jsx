import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import PulseLoader from "react-spinners/PulseLoader";
import { API } from "../../backend";
import { adminLogIn } from "../../hotelManagement/redux/actions/adminActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Reset error messages
    setEmailError("");
    setPasswordError("");

    // Validate inputs
    let valid = true;
    if (!adminEmail) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!validateEmail(adminEmail)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!adminPassword) {
      setPasswordError("Password is required.");
      valid = false;
    }

    // If validations fail, stop execution
    if (!valid) {
      setIsLoading(false);
      return;
    }

    // Proceed with API call
    try {
      const response = await axios.post(`${API}auth/login`, {
        email: adminEmail,
        password: adminPassword,
      });
      const token = response.data.token;
      const decodedToken = jwtDecode(token);
      dispatch(adminLogIn(decodedToken.user));
      if (token) {
        localStorage.setItem("accessToken", token);
        toast.success("Successfully Logged in!");
      }
      setIsLoading(false);
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response.data.message || "Error while logging in !");
    }
  };

  return (
    <div className="h-[100vh] grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Form */}
      <div className="bg-gray-100 flex flex-col justify-center px-10 py-6">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <h2 className="text-left text-2xl font-bold text-navy-600">
            ASPEN GRAND HOTELS
          </h2>
          {/* Welcome Back */}
          <h1 className="text-xl font-bold mt-6 text-navy-600">Welcome Back</h1>
          <p className="text-gray-600 mb-6">Please enter your details below.</p>
          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="text-sm text-gray-700">
                Email
              </label>
              <input
                id="email"
                value={adminEmail}
                onChange={(e) => {
                  if (emailError) {
                    setEmailError("");
                  }
                  setAdminEmail(e.target.value);
                }}
                type="email"
                placeholder="email"
                className={`w-full p-3 border rounded mt-1 ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-gray-700">
                Password
              </label>
              <input
                id="password"
                value={adminPassword}
                onChange={(e) => {
                  if (passwordError) {
                    setPasswordError("");
                  }
                  setAdminPassword(e.target.value);
                }}
                type="password"
                placeholder="********"
                className={`w-full p-3 border rounded mt-1 ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>
            {/* Remember and Forgot password */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-navy-600"
                />
                <label htmlFor="remember" className="ml-2 text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="/" className="text-sm text-[#33568f] hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-[#1b4281] hover:bg-[#002662] text-white font-bold rounded transition duration-300"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? (
                  <PulseLoader size={8} color={"#fff"} />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
          {/* Sign up link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/signUp"
                className="text-[#1b4281] hover:text-[#002662] hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Hotel Image */}
      <div className="hidden lg:block relative">
        <img
          src="https://images.pexels.com/photos/3201761/pexels-photo-3201761.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Hotel"
          className="object-cover w-full h-[100vh]"
        />
      </div>
    </div>
  );
};

export default SignIn;
