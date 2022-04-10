import { currencyFormat } from "./currency";
import { formatDate } from "./formatting";

export function getCategoryTotals(data, includeRent) {
  const filtered = data.filter((f) =>
    f.myBudgetCategory !== "" && includeRent
      ? true
      : f.myBudgetCategory !== "Rent"
  );
  const sorted = filtered.sortBy("myBudgetCategory");
  //console.info(sorted.map((s) => ({ cat: s.myBudgetCategory, amount: s.debitAmount })) );
  let debits = [];
  let credits = [];
  let cntr = 0;
  let totalDebits = 0;
  let totalCredits = 0;
  let prevcategory = "";

  while (cntr < sorted.length) {
    prevcategory = sorted[cntr].myBudgetCategory;
    //console.info(prevcategory, sorted[cntr].myBudgetCategory, cntr);
    while (
      prevcategory === sorted[cntr].myBudgetCategory &&
      cntr < sorted.length
    ) {
      if (parseFloat(sorted[cntr].debitAmount) > 0)
        totalDebits = totalDebits + parseFloat(sorted[cntr].debitAmount);
      else totalCredits = totalCredits + parseFloat(sorted[cntr].creditAmount);
      prevcategory = sorted[cntr].myBudgetCategory;
      //console.info(cntr, prevcategory, sorted[cntr].debitAmount, total);
      cntr += 1;
      if (cntr === sorted.length) break;
    }
    if (totalDebits > 0) {
      debits.push({
        category: prevcategory,
        totalDebitFormatted: currencyFormat(totalDebits, false),
        totalDebits: parseInt(totalDebits),
      });
    }
    if (totalCredits > 0) {
      credits.push({
        category: prevcategory,
        totalCreditFormatted: currencyFormat(totalCredits, false),
        totalCredits: totalCredits,
      });
    }
    totalCredits = 0;
    totalDebits = 0;
  }

  const debitsSorted = debits.sortBy("totalDebits").reverse();
  //console.info(resultSorted);
  const totalExpenses = debitsSorted
    .map((num) => num.totalDebits)
    .reduce((a, b) => a + b, 0);
  const creditsSorted = credits.sortBy("totalCredits").reverse();
  const totalIncome = creditsSorted
    .map((num) => num.totalCredits)
    .reduce((a, b) => a + b, 0);
  const summary = {
    expenses: debitsSorted,
    income: creditsSorted,
    totalExpenses: currencyFormat(totalExpenses, false),
    totalIncome: currencyFormat(totalIncome, false),
    dateRange: getDateRange(filtered),
  };
  return summary;
  //  console.info(result);
}

// eslint-disable-next-line no-extend-native
Array.prototype.sortBy = function (p) {
  return this.slice(0).sort(function (a, b) {
    return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
  });
};

function getDateRange(list) {
  const dates = [];

  for (let trans of list) {
    dates.push({
      yyyymmdd: trans.transDate.slice(0, 10),
      ddmmyyyy: formatDate(trans.transDate),
    });
  }

  if (dates.length === 0) return "Error No date range!!";
  const sorted = dates.sortBy("yyyymmdd");

  const range = {
    begin: sorted[0].ddmmyyyy,
    end: sorted[sorted.length - 1].ddmmyyyy,
  };
  return range;
}
