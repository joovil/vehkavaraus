const apiFetch = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
    options
  );
  return response;
};

export default apiFetch;
