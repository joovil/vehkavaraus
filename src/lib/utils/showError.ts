export const showError = (
  setError: React.Dispatch<React.SetStateAction<string>>,
  errorMessage: string,
  callback?: () => void,
  timeDisplayed: number = 3000
) => {
  setError(errorMessage);
  setTimeout(() => {
    setError("");
    if (callback) {
      callback();
    }
  }, timeDisplayed);
};
