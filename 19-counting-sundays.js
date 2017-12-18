/**
 * @function sundayMonthsInRange
 * @see https://projecteuler.net/problem=19
 * @author Jason Seminara <jseminara@gmail.com>
 * @param {number} start - the beginning of the date range
 * @param {number} end - the (inclusive) end of date range
 * @param {number} offset - where th first sunday is in relation
 * to the first day of the date range
 * @desc 1 Jan 1900 was a Monday.
 * How many Sundays fell on the first of the month
    during the twentieth century (1 Jan 1901 to 31 Dec 2000)?
 */
function sundayMonthsInRange(start, end, offset=1) {
  let day = 0;
  const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  /**
   * @function isLeapYear
   * @desc leap years are defined as divisible by 4, 400, but not 100
   */
  const isLeapYear = year =>
    (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0));


  return [...Array(end - start + 1)].map((_, y) =>
    monthLengths.map((days, m) => {
      const monthDays = days + 0 + (isLeapYear(start + y) && m === 1);
      // increment by the month offset
      day += monthDays;
      // rewind to get back to the first of the month
      return day - monthDays;
    })
      /* check to see if this day is divisible by 7 */
      .filter((day) => (day + offset) % 7 === 0)
  )
    /* we've included 1900 to count properly, but we don't want it in our results */
    .slice(1)

    /* collapse all sundays into one list and count them */
    .reduce((allSundays, month) => {
      return [...allSundays, ...month]
    }, [])
    .length();
}



