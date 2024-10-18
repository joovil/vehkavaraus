import apiFetch from "@/lib/utils/apiFetch";

export const fetchAllBorrows = async () => {
  const res = await apiFetch("/borrows");
  return res;
};
