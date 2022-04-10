import http from "./httpService";
import { apiUrl } from "../config.json";
import { getCurrentUser } from "./authService";

const apiEndpoint = apiUrl + "/budgetTypes";

function getUrl(uri) {
  return `${apiEndpoint}/${uri}`;
}

export function getBudgetTypes(id) {
  return http.get(getUrl(`user/${id}`));
}

export function saveBudgetType(data) {
  const rule = getDBBudgetType(data);
  console.info(rule);
  if (rule.id) {
    const body = { ...rule };
    delete body.id;

    return http.put(getUrl(rule.id), body);
  }
  return http.post(apiEndpoint, rule);
}

export function deleteBudgetType(id) {
  return http.delete(getUrl(id));
}

function getDBBudgetType(data) {
  let type = {};
  console.info(data);
  type.parent_category = data.parent_category;
  type.category = data.category;
  if (!data.owner_id) {
    const user = getCurrentUser();
    type.owner_id = user.id;
  }
  return type;
}
