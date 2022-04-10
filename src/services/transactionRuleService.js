import http from "./httpService";
import { apiUrl } from "../config.json";
import { getCurrentUser } from "./authService";

const apiEndpoint = apiUrl + "/rules";

function getUrl(uri) {
  return `${apiEndpoint}/${uri}`;
}

export function getRules(id) {
  return http.get(getUrl(`user/${id}`));
}

export function saveTransactionRule(data) {
  const rule = getDBTransactionRule(data);
  console.info(rule);
  if (rule.id) {
    const body = { ...rule };
    delete body.id;

    return http.put(getUrl(rule.id), body);
  }
  return http.post(apiEndpoint, rule);
}

export function deleteTransactionRule(id) {
  return http.delete(getUrl(id));
}

function getDBTransactionRule(data) {
  let rule = {};
  console.info(data);
  if (data.id) rule.id = data.id;
  rule.search_keywords = data.search_keywords;
  rule.category = data.category;
  rule.amount = data.amount;
  if (!data.owner_id) {
    const user = getCurrentUser();
    rule.owner_id = user.id;
  }
  return rule;
}
