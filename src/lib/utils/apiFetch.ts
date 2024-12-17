const apiFetch = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}`,
    options,
  );
  return response;
};

export default apiFetch;
