export const formatDate = (date: Date | undefined | null) => {
  if (!date) return;

  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;

  return `${day}/${month}`;
};
