export const formatDate = (date: Date | null) => {
  if (!date) return;

  const day = date.getDate();
  const month = date.getMonth() + 1;

  return `${day}/${month}`;
};
