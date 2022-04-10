import http from "./httpService";

const localApi = "http://192.168.1.4:4000/api";
const remoteApi = "https://my-recipes-13442.nodechef.com/api";

export async function migrateBankTransactions() {
  const trans = await http.get(`${localApi}/transactions/user/2`);

  for (let i = 0; i < trans.length; i++) {
    const tran = trans[i];
    await http.post(`${remoteApi}/transactions`, tran);
  }

  window.alert("Done....Num records = " + trans.length);
}

export async function migrateBudgetTypes() {
  const trans = await http.get(`${localApi}/budgetTypes/user/2`);

  for (let i = 0; i < trans.length; i++) {
    const tran = trans[i];
    await http.post(`${remoteApi}/budgetTypes`, tran);
  }

  window.alert("Done....Num records = " + trans.length);
}

export async function migrateTransactionRules() {
  const trans = await http.get(`${localApi}/rules/user/2`);

  for (let i = 0; i < trans.length; i++) {
    const tran = trans[i];
    await http.post(`${remoteApi}/rules`, tran);
  }

  window.alert("Done....Num records = " + trans.length);
}
