/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";

const FallbackComponent = ({ errorMessage }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/")
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="mb-4">
        <img
          src="/path/to/your/image.png"
          alt="Error 404"
          className="w-1/2 h-auto"
        />
      </div>
      <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>
      {errorMessage && (
        <p className="mt-2 text-lg text-red-600">{errorMessage}</p>
      )}
      <p className="mt-2 text-lg text-gray-600">
        We couldn't find the page you were looking for.
      </p>
      <button
        onClick={handleGoHome}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Home
      </button>
    </div>
  );
};

export default FallbackComponent;
