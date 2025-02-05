import apiFetch from "@/lib/utils/apiFetch";

export const createGameService = async (name: string, image: File) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", image);

  const res = await apiFetch("/games", {
    method: "POST",
    body: formData,
  });

  return res;
};
