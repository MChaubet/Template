export const formatDateToddMMyyyy = (date: Date): string => {
  return date.toJSON().slice(0, 10).split('-').reverse().join('/');
};
