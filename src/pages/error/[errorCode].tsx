import { useRouter } from "next/router";
import React from "react";

const ErrorPage = () => {
  const router = useRouter();
  const { errorCode } = router.query;

  let errorMessage = "An unexpected error has occurred.";
  if (errorCode === "404") {
    errorMessage = "The page you are looking for could not be found.";
  } else if (errorCode === "500") {
    errorMessage = "An internal server error has occurred.";
  } else if (errorCode === "403") {
    errorMessage = "You do not have permission to access this page.";
  }
  return <div>[errorCode]</div>;
};

export default ErrorPage;
