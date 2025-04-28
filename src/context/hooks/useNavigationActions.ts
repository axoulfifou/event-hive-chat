
import { useCallback } from 'react';
import { addMonths, subMonths, addWeeks, subWeeks } from 'date-fns';

export const useNavigationActions = (setCurrentDate: (date: Date) => void) => {
  const navigateMonth = useCallback((direction: 'next' | 'prev') => {
    setCurrentDate((prevDate: Date) => {
      return direction === 'next' ? addMonths(prevDate, 1) : subMonths(prevDate, 1);
    });
  }, [setCurrentDate]);

  const navigateWeek = useCallback((direction: 'next' | 'prev') => {
    setCurrentDate((prevDate: Date) => {
      return direction === 'next' ? addWeeks(prevDate, 1) : subWeeks(prevDate, 1);
    });
  }, [setCurrentDate]);

  return {
    navigateMonth,
    navigateWeek,
  };
};
