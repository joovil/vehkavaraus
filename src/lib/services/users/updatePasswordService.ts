import apiFetch from "@/lib/utils/apiFetch";

const updatePasswordService = async (newPassword: string) => {
  try {
    const body = {
      password: newPassword,
    };

    const res = await apiFetch("/users", {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating apartment", error);
    throw error;
  }
};

export default updatePasswordService;
