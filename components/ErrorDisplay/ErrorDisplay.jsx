import React from "react";
import { getErrorMessage } from "../../utils/errorHandling/errorMessages";
import { ErrorTypes } from "../../utils/errorHandling/errorTypes";

const ErrorDisplay = ({ error, onRetry }) => {
  const errorType = error?.type || ErrorTypes.UNEXPECTED_ERROR;
  const errorMessage = getErrorMessage(errorType, error?.message);

  return (
    <div
      className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
      role="alert"
    >
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline"> {errorMessage}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
