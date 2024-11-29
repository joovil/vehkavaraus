import apiFetch from "@/lib/utils/apiFetch";

const updateApartmentService = (newApartment: string) => {
  const body = {
    apartment: newApartment,
  };

  const res = apiFetch("/users", {
    method: "PUT",
    body: JSON.stringify(body),
  });

  return res;
};

export default updateApartmentService;
