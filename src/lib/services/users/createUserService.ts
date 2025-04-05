import apiFetch from "@/lib/utils/apiFetch";

export const createUserService = async (
  username: string,
  password: string,
  email: string,
  apartment: string,
) => {
  try {
    const res = await apiFetch("/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        email,
        apartment,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      throw new Error(errorData.error || "Failed to create user");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
