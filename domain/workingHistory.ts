export type WorkingHistory = {
  date: {
    month: number;
    day: number;
  };
  minutes: number;
  name?: string;
};

export const calcTotal = (workingHistories: WorkingHistory[]): number => {
  const total = workingHistories.reduce((sum, history) => {
    return sum + history.minutes;
  }, 0);

  return total;
};

export const filterByMonth = (
  workingHistories: WorkingHistory[],
  month: number
) => {
  const filtered = workingHistories.filter((history) => {
    return history.date.month === month;
  });

  return filtered;
};
