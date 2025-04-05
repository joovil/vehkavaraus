import apiFetch from "@/lib/utils/apiFetch";

export const verifyUserService = async (key: string) => {
  return await apiFetch(`/auth/verification/${key}`);
};
