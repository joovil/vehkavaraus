import apiFetch from "@/lib/utils/apiFetch";

const updatePasswordService = (newPassword: string) => {
  const body = {
    password: newPassword,
  };

  const res = apiFetch("/users", {
    method: "PUT",
    body: JSON.stringify(body),
  });

  return res;
};

export default updatePasswordService;
