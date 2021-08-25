import {
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  getDate,
  setDate,
} from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export const getCutDayRange = (date, cutDay = 15) => {
  const actualDay = getDate(date);

  const rangeDate = [];

  if (actualDay <= cutDay) {
    rangeDate[0] = startOfMonth(date);
    const finishCutDay = setDate(date, cutDay);
    rangeDate[1] = endOfDay(finishCutDay);
  } else {
    const afterCutDay = setDate(date, cutDay + 1);
    rangeDate[0] = startOfDay(afterCutDay);
    rangeDate[1] = endOfMonth(date);
  }
  return rangeDate;
};
