import apiFetch from "@/lib/utils/apiFetch";

export const verifyUserService = async (key: string) => {
  try {
    const res = await apiFetch(`/auth/verification/${key}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error) {
    console.error("Error verifying user", error);
    throw error;
  }
};
