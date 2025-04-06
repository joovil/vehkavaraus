import apiFetch from "@/lib/utils/apiFetch";
import { Game } from "@/types";

export const createGameService = async (
  name: string,
  image: File,
): Promise<Game> => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", image);

    const res = await apiFetch("/admin/games", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error("Error creating new game", errorData.error);
    }

    return res.json();
  } catch (error) {
    console.error("Error creating new game:", error);
    throw error;
  }
};
