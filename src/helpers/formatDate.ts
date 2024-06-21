export const formatDate = (dateString: string): Date | null => {
  const parts = dateString.split(".");
  if (parts.length !== 3) {
    return null;
  }
  const [day, month, year] = parts;
  return new Date(`${year}-${month}-${day}`);
};
