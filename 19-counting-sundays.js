
const isLeapYear = year => (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0));
const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let day = 0;
const offset = 1;

const monthStarts = [...Array(101)].map((_, y) => {
  const year = y + 1900;


  return monthLengths.map((monthLen, m) => {
    const monthDays = monthLen + 0 + (isLeapYear(year) && m === 1);
    // increment by the month offset
    day += monthDays;
    // rewind to get back to the first of the month
    return day - monthDays;
  })
    /* check to see if this day is divisible by 7 */
    .filter((day) => (day + offset) % 7 === 0)


})
  /* we've included 1900 to count properly, but we don't want it in our results */
  .slice(1)
  /* collapse all sundays into one list and count them */
  .reduce((allSundays, month) => {
    return [...allSundays, ...month]
  }, [])


console.log(monthStarts.length)


