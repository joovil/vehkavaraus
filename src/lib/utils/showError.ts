export const showError = (
  setError: React.Dispatch<React.SetStateAction<string>>,
  errorMessage: string,
  timeDisplayed: number = 3000
) => {
  setError(errorMessage);
  setTimeout(() => {
    setError("");
  }, timeDisplayed);
};
