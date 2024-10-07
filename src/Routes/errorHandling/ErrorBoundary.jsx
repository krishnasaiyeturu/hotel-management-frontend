/* eslint-disable react/prop-types */
import React from "react";
import FallbackComponent from "./FallbackComponent";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  // Error handling functions
  const staticGetDerivedStateFromError = (error) => {
    // console.log("ERROR MESSAGE",{error},error.message)
    setHasError(true);
    setErrorMessage(error.message);
  };

  const componentDidCatch = (error, errorInfo) => {
    console.error("Error captured in ErrorBoundary: ", error, errorInfo);
  };

  // Effect to handle error logging
  React.useEffect(() => {
    if (hasError) {
      componentDidCatch(new Error("Error in child component"), {
        componentStack: "",
      });
    }
  }, [hasError]);

  // Render fallback UI if an error occurs
  if (hasError) {
    return <FallbackComponent errorMessage={errorMessage} />;
  }

  // Wrapping children to catch errors
  return (
    <React.Fragment>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          onError: staticGetDerivedStateFromError,
        });
      })}
    </React.Fragment>
  );
};

export default ErrorBoundary;
