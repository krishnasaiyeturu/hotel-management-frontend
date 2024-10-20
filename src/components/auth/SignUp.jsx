import { useRef, useState } from "react";
import { API } from "../../backend";
import axios from "axios";
import { useDispatch } from "react-redux";
import { customerSignUp } from "../../hotelManagement/redux/actions/customerActions";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { redirectToStripe } from "../../utils/helper";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const toastShownRef = useRef(false); // useRef to track if toast has been shown

  // Other state variables...

  useEffect(() => {
    if (
      location.state?.from.includes("/book/stays") &&
      !toastShownRef.current
    ) {
      console.log("Test");
      toast.success("Please Sign Up For Payment !");
      toastShownRef.current = true; // Mark the toast as shown
    }
  }, [location]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const newErrors = {
      username: formData.username ? "" : "Username is required",
      email: validateEmail(formData.email) ? "" : "Enter a valid email",
      password: validatePassword(formData.password)
        ? ""
        : "Password must be at least 6 characters with 1 capital letter, 1 number, and 1 special character",
    };

    setErrors(newErrors);

    const formIsValid =
      !newErrors.username && !newErrors.email && !newErrors.password;
    setIsFormValid(formIsValid);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
    if (!isFormValid) {
      setIsFormValid(true);
    }
  };

  const createCustomer = async () => {
    try {
      const response = await axios.post(`${API}auth/register`, {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log("Customer Sign Up", { response });
      const token = response.data.token;
      const decodedToken = jwtDecode(token);
      dispatch(customerSignUp(decodedToken.user));
      if (token) {
        localStorage.setItem("accessToken", token);
        toast.success("Sign-up successful!");
      }
      if (location.state?.from.includes("/book/stays")) {
        redirectToStripe(location?.state?.sessionId);
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error during sign-up!");
    } finally {
      // const previousPath = location.state?.from.includes("/book/stays");
      navigate(location.state?.from);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();

    if (isFormValid) {
      createCustomer();
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div className="h-[100vh] grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <img
          src="https://images.pexels.com/photos/7746950/pexels-photo-7746950.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Hotel"
          className="object-cover w-full h-[100vh]"
        />
      </div>

      <div className="bg-gray-100 flex flex-col justify-center px-10 py-6">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-left text-2xl font-bold text-navy-600">
            ASPEN GRAND HOTELS
          </h2>
          <h1 className="text-xl font-bold mt-6 text-navy-600">Sign Up</h1>
          <p className="text-gray-600 mb-6">Please fill your details below.</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label htmlFor="username" className="text-sm text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded mt-1"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded mt-1"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded mt-1"
              />
              <p
                className={`text-sm mt-1 ${
                  errors.password ? "text-red-500" : "text-gray-500"
                }`}
              >
                Password must be at least 6 characters, 1 capital letter, 1
                number, and 1 special character.
              </p>
            </div>

            {/* Sign Up Button */}
            <div>
              <button
                type="submit"
                className={`w-full py-3 text-white font-bold rounded transition duration-300 ${
                  isFormValid
                    ? "bg-[#1b4281] hover:bg-[#002662] cursor-pointer"
                    : "bg-[#94a8c8] cursor-not-allowed opacity-50"
                }`}
                disabled={!isFormValid}
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/signIn"
                className="text-[#1b4281] hover:text-[#002662] hover:underline"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
