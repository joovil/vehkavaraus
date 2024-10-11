import apiFetch from "@/lib/apiFetch";

export const fetchAllBorrows = async () => {
  const res = await apiFetch("/borrows");
  return res;
};
