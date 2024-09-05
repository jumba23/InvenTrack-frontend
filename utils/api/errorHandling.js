export const handleApiError = (error, setErrorMsg) => {
  if (error.response && error.response.data) {
    setErrorMsg(error.response.data.error);
  } else {
    setErrorMsg("An unexpected error occurred.");
  }
};
