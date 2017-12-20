/**
 * @function range
 *
 */
function* range(start, end, inclusive=1) {
  let [s, e] = [start, end].map(x => Number.parseInt(x));
  while (s < (e + inclusive))
    yield s++;
}

/**
 * @function isLeapYear
 * @desc leap years are defined as divisible by 4, 400, but not 100
 */
function isLeapYear(year) {
  return (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0));
}


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
  const sundays = [];
  let day = 0;

  // loop over the years
  for (let year of range(start, end)) {
    /* loop over the months and find the start of the month */
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31].forEach((dayCount, m) => {

      // Sundays occur every 7 days after the first known occurance
      // We'll move the day over by 'offset', depending on what the given day was
      // e.g. 1900-01-01 was a Monday, so the offset is 1;
      if ((day + offset) % 7 === 0) {
        sundays.push(day);
      }

      // increment by the month offset
      day += dayCount + (isLeapYear(year) && m === 1);
    })
  }

  /* we've included 1900 to count properly, but we don't want it in our results */
  return sundays.filter(day => day > 364).length;
}


console.log(sundayMonthsInRange(1900, 2000));
