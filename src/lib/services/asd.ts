import apiFetch from "../utils/apiFetch";

export const test = async () => {
  const res = await apiFetch("/hello", {
    headers: {
      authorization: "bearer asd",
    },
  });
  console.log(res);
};
