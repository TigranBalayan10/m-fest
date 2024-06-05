// dateUtils.ts

export const generateMonthOptions = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    value: `${i + 1}`,
    label: `${i + 1}`.padStart(2, "0"),
  }));
};

export const generateDayOptions = () => {
  return Array.from({ length: 31 }, (_, i) => ({
    value: `${i + 1}`,
    label: `${i + 1}`.padStart(2, "0"),
  }));
};

export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 100 }, (_, i) => {
    const year = currentYear - i;
    return {
      value: `${year}`,
      label: `${year}`,
    };
  });
};
