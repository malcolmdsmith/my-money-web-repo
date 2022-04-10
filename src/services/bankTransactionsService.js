import http from "./httpService";
import { apiUrl } from "../config.json";
import { getCurrentUser } from "./authService";
import { getMySQLDate } from "../utility/getMySQLDate";

const apiEndpoint = apiUrl + "/transactions";

function getUrl(uri) {
  return `${apiEndpoint}/${uri}`;
}

export function getTransactionsNotCategorized(id) {
  return http.get(getUrl(`notcategorized/user/${id}`));
}

export function getLastTransactionDate() {
  const user = getCurrentUser();
  return http.get(getUrl(`lastTransaction/user/${user.id}`));
}

export function searchTransactions(currentPage, pageSize, data, countOnly) {
  const user = getCurrentUser();
  const fromdate = data.dateFrom === "" ? "" : getMySQLDate(data.dateFrom, "-");
  const todate = data.dateTo === "" ? "" : getMySQLDate(data.dateTo, "-");
  let queryString = `?currentPage=${currentPage}&pageSize=${pageSize}&countOnly=${countOnly}&owner_id=${user.id}&dateFrom=${fromdate}&dateTo=${todate}`;
  queryString += `&category=${data.category}&amountFrom=${data.amountFrom}&amountTo=${data.amountTo}&keywords=${data.keywords}`;
  return http.get(getUrl(`search/user/all${queryString}`));
}

export function saveAllocatedTransactions(data) {
  data.forEach((element) => {
    saveTransaction(element);
  });
  console.info("SAVE DONE...");
}

export function saveTransactions(data) {
  data.forEach((element) => {
    if (element["Date"] !== undefined) {
      const transaction = getDBTransaction(element);
      saveTransaction(transaction);
    }
  });
  console.info("SAVE DONE...");
}

export function saveTransaction(transaction) {
  if (transaction.id) {
    const body = { ...transaction };
    delete body.id;

    return http.put(getUrl(transaction.id), body);
  }
  return http.post(apiEndpoint, transaction);
}

export function deleteTransaction(id) {
  return http.delete(getUrl(id));
}

function getDBTransaction(data) {
  let transaction = {};
  if (data.id) transaction.id = data.id;
  transaction.transDate = getMySQLDate(data.Date);
  transaction.narrative = data.Narrative;
  transaction.debitAmount =
    data["Debit Amount"] === "" ? 0 : parseFloat(data["Debit Amount"]);
  transaction.creditAmount =
    data["Credit Amount"] === "" ? 0 : parseFloat(data["Credit Amount"]);
  transaction.balance = parseFloat(data.Balance);
  transaction.categories = data.Categories;
  transaction.myBudgetCategory = "";
  if (!data.owner_id) {
    const user = getCurrentUser();
    transaction.owner_id = user.id;
  }
  return transaction;
}
