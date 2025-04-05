import apiFetch from "@/lib/utils/apiFetch";

export const verifyUserService = async (key: string) => {
  try {
    const res = await apiFetch(`/auth/verification/${key}`);
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
