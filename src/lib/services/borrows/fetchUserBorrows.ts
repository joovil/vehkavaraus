import apiFetch from "@/lib/utils/apiFetch";

export const fetchUserBorrows = async (id: string) => {
  const res = await apiFetch(`/users/borrows/${id}/borrows`);
  return res;
};
