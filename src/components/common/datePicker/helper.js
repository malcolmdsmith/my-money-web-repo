import { zeroPad } from "../../../utility/formatting";

export function getMonthDays(monthDate) {
  //console.info(monthDate);
  const firstOfMonthDay = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth(),
    "01"
  ).getDay();
  const prevMonthDate = getNextMonth(monthDate, -1);
  const currentMonthDate = monthDate;
  const nextMonthDate = getNextMonth(monthDate, 1);
  //console.info(
  //  getDDMMYYYY(prevMonthDate),
  //  getDDMMYYYY(currentMonthDate),
  //  getDDMMYYYY(nextMonthDate)
  //);
  const numDaysInMonth = daysInMonth(
    monthDate.getMonth() + 1,
    monthDate.getFullYear()
  );

  const numDaysInPrevMonth = daysInMonth(
    monthDate.getMonth(),
    monthDate.getFullYear()
  );
  const firstDayPrevMonth = getFirstDayPrevMonth(
    numDaysInPrevMonth,
    firstOfMonthDay
  );

  //console.info(
  //  firstOfMonthDay,
  //  numDaysInMonth,
  //  numDaysInPrevMonth,
  // firstDayPrevMonth
  //);

  //return;

  const days = [];
  let i = 0;

  if (firstDayPrevMonth > 0) {
    for (let j = firstDayPrevMonth; j <= numDaysInPrevMonth; j++) {
      days[i] = {
        date: getMonthDate(
          j,
          prevMonthDate.getMonth() + 1,
          prevMonthDate.getFullYear()
        ),
        currentMonth: false,
        day: j,
        selected: false,
      };
      //console.info(days[i]);
      i++;
    }
  }
  for (let j = 1; j <= numDaysInMonth; j++) {
    if (monthDate.getDate() === j)
      days[i] = {
        date: getMonthDate(
          j,
          currentMonthDate.getMonth() + 1,
          currentMonthDate.getFullYear()
        ),
        currentMonth: true,
        day: j,
        selected: true,
      };
    else
      days[i] = {
        date: getMonthDate(
          j,
          currentMonthDate.getMonth() + 1,
          currentMonthDate.getFullYear()
        ),
        currentMonth: true,
        day: j,
        selected: false,
      };
    //console.info(days[i]);
    i++;
  }
  let j = 1;
  while (i <= 41) {
    days[i] = {
      date: getMonthDate(
        j,
        nextMonthDate.getMonth() + 1,
        nextMonthDate.getFullYear()
      ),
      currentMonth: false,
      day: j,
      selected: false,
    };
    //console.info(days[i]);
    i++;
    j++;
  }

  return days;
}

function daysInMonth(month, year) {
  const days = new Date(year, month, 0).getDate();
  //console.info("daysInMonth...", month, year, days);
  return days;
}

function getFirstDayPrevMonth(daysInPrevMonth, firstDayOfPickerMonth) {
  switch (firstDayOfPickerMonth) {
    case 0: //sunday
      return daysInPrevMonth - 5;
    case 1: //monday
      return 0;
    case 2: //tuesday
      return daysInPrevMonth - 0;
    case 3: //wednesday
      return daysInPrevMonth - 1;
    case 4: //thursday
      return daysInPrevMonth - 2;
    case 5: //friday
      return daysInPrevMonth - 3;
    case 6: //saturday
      return daysInPrevMonth - 4;
    default:
      return daysInPrevMonth;
  }
}

export function getMonthFullName(month) {
  switch (month.getMonth()) {
    case 0:
      return "January " + month.getFullYear();
    case 1:
      return "February " + month.getFullYear();
    case 2:
      return "March " + month.getFullYear();
    case 3:
      return "April " + month.getFullYear();
    case 4:
      return "May " + month.getFullYear();
    case 5:
      return "June " + month.getFullYear();
    case 6:
      return "July " + month.getFullYear();
    case 7:
      return "August " + month.getFullYear();
    case 8:
      return "September " + month.getFullYear();
    case 9:
      return "October " + month.getFullYear();
    case 10:
      return "November " + month.getFullYear();
    case 11:
      return "December " + month.getFullYear();
    default:
      return "Error!!";
  }
}

function getMonthDate(day, month, year) {
  return zeroPad(day, 2) + "-" + zeroPad(month, 2) + "-" + year;
}

function getNextMonth(date, increment) {
  let month = date.getMonth();
  month = month + increment;
  let year = date.getFullYear();
  if (month < 0) {
    month = 11;
    year = year - 1;
  } else if (month === 12) {
    month = 0;
    year = year + 1;
  }
  // console.info(
  //   "getNextMonth...",
  //   date.getMonth(),
  //   year,
  //   month,
  //   new Date(year, month, "01")
  // );
  return new Date(year, month, "01");
}
