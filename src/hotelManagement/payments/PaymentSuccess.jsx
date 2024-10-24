import  { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { useNavigate } from "react-router-dom";
import PaymentSuccessAnimation from "../../../public/animations/paymentSuccess.json";

const PaymentSuccess = () => {
  // Mock data
  const paymentData = {
    paymentType: "Net banking",
    bank: "HDFC",
    mobile: "8897131444",
    email: "sudheerreddy.ui@gmail.com",
    amountPaid: "500.00",
    transactionId: "125478965698",
  };
  const navigate = useNavigate();
  // Ref for the animation container
  const animationContainer = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: PaymentSuccessAnimation, // The Lottie JSON file path
    });

    return () => anim.destroy(); // Cleanup animation on component unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        {/* Lottie Success Animation */}
        <div className="flex justify-center mb-4">
          <div ref={animationContainer} className="h-50vh w-50vh"></div>
        </div>
        {/* Payment Details */}
        {/* <div className="grid grid-cols-2 gap-4 text-gray-600">
          <div>Payment type</div>
          <div>{paymentData.paymentType}</div>

          <div>Bank</div>
          <div>{paymentData.bank}</div>

          <div>Mobile</div>
          <div>{paymentData.mobile}</div>

          <div>Email</div>
          <div>{paymentData.email}</div>

          <div className="font-bold">Amount paid</div>
          <div className="font-bold">{paymentData.amountPaid}</div>

          <div>Transaction id</div>
          <div>{paymentData.transactionId}</div>
        </div> */}

        {/* Buttons */}
        {/* <div className="flex justify-center mt-8 gap-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            PRINT
          </button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
            CLOSE
          </button>
        </div> */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Back To Home
          </button>
          {/* <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
            CLOSE
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
